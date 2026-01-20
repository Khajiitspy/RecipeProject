using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Builders;
using Core.Constants;
using Core.Interfaces;
using Core.Model.Recipe;
using Core.Model.Recipe.Unit;
using Core.Model.Search;
using Core.Model.Search.Requests;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Core.Services;

public class RecipeService(
    AppDbContext context,
    IImageService imageService,
    IMapper mapper,
    IAuthService authService,
    ICacheService cache) : IRecipeService
{
    public async Task<RecipeItemModel> CreateAsync(RecipeCreateModel model)
    {
        var entity = mapper.Map<RecipeEntity>(model);
        try
        {
            if (model.Image != null)
            {
                entity.Image = await imageService.SaveImageAsync(model.Image);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("-------------- Create recipe image upload error: " + ex.Message);
        }

        var userId = await authService.GetUserId();
        entity.UserId = userId;

        context.Recipes.Add(entity);

        if (!string.IsNullOrEmpty(model.IngredientsJson))
        {
            var recipeIngredients = JsonSerializer.Deserialize<List<RecipeIngredientCreateModel>>(model.IngredientsJson);
            if (recipeIngredients != null)
            {
                foreach (var ingId in recipeIngredients)
                {
                    var ingr = new RecipeIngredientEntity
                    {
                        Recipe = entity,
                        IngredientId = ingId.IngredientId,
                        IngredientUnitId = ingId.IngredientUnitId,
                        Amount = ingId.Amount
                    };
                    context.RecipeIngredients.Add(ingr);
                }
            }
        }

        await context.SaveChangesAsync();

        cache.Remove($"{CacheKeys.RecipeItemCacheKeyPrefix}{userId}");

        return await context.Recipes
            .Where(x => x.Id == entity!.Id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task<List<RecipeItemModel>> ListAsync()
    {
        var userId = await authService.GetUserId();

        var key = $"{CacheKeys.RecipeItemCacheKeyPrefix}{userId}";

        return await cache.GetOrCreateAsync(
            key,
            async () => await context.Recipes
                .Where(x => !x.IsDeleted && x.IsPublished)
                .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
                .ToListAsync(),
            TimeSpan.FromMinutes(CacheKeys.ListCacheTtlMinutes)
        );
    }
    public async Task<PagedResult<RecipeItemModel>> ListAsync(RecipeSearchRequest request)
    {
        var isAdmin = await authService.IsAdminAsync();

        if (!isAdmin)
        {
            request.IsDeleted = false;

            request.IsPublished = true;
        }

        var query = context.Recipes.AsQueryable();

        var result = await new RecipeBuilder(query)
            .Include(r => r.Category!, r => r.User!)
            .TakeDeleted(request.IsDeleted)
            .TakePublished(request.IsPublished)
            .ApplyRequest(request)
            .OrderBy(r => r.Id, descending: true)
            .BuildAsync();

        var items = mapper.Map<List<RecipeItemModel>>(result.Items);

        return new PagedResult<RecipeItemModel>
        {
            Items = items,
            TotalItems = result.TotalItems,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();

        cache.Remove($"{CacheKeys.RecipeItemCacheKeyPrefix}{id}");
        if (entity.UserId != null)
        {
            cache.Remove($"{CacheKeys.RecipeItemCacheKeyPrefix}{entity.UserId}");
        }
    }

    public async Task<RecipeItemModel> UpdateAsync(RecipeUpdateModel model)
    {
        var entity = await context.Recipes.FirstOrDefaultAsync(x => x.Id == model.Id);

        var userId = entity?.UserId;

        mapper.Map(model, entity);

        if (model.Image != null)
        {
            if (!string.IsNullOrEmpty(entity!.Image))
            {
                await imageService.DeleteImageAsync(entity.Image);
            }

            try
            {
                entity.Image = await imageService.SaveImageAsync(model.Image);
            }
            catch (Exception ex)
            {
                Console.WriteLine("----------------- Update recipe image upload error: " + ex.Message);
            }
        }

        if (!string.IsNullOrWhiteSpace(model.IngredientsJson))
        {
            var oldIngredients = await context.RecipeIngredients.Where(x => x.RecipeId == entity!.Id).ToListAsync();
            context.RecipeIngredients.RemoveRange(oldIngredients);

            var recipeIngredients = JsonSerializer.Deserialize<List<RecipeIngredientCreateModel>>(model.IngredientsJson);

            if (recipeIngredients != null)
            {
                foreach (var ingId in recipeIngredients)
                {
                    var ingr = new RecipeIngredientEntity
                    {
                        Recipe = entity,
                        IngredientId = ingId.IngredientId,
                        IngredientUnitId = ingId.IngredientUnitId,
                        Amount = ingId.Amount
                    };
                    context.RecipeIngredients.Add(ingr);
                }
            }
        }

        await context.SaveChangesAsync();

        cache.Remove($"{CacheKeys.RecipeItemCacheKeyPrefix}{model.Id}");
        if (userId != null)
        {
            cache.Remove($"{CacheKeys.RecipeListCacheKey}{userId}"); 
        }

        return await context.Recipes
            .Where(x => x.Id == entity!.Id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task<RecipeItemModel?> GetByIdAsync(long id)
    {
        var key = $"{CacheKeys.RecipeItemCacheKeyPrefix}{id}";

        return await cache.GetOrCreateAsync(
            key,
            async () => await context.Recipes
                .Where(x => x.Id == id)
                .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(),
            TimeSpan.FromMinutes(CacheKeys.ItemCacheTtlMinutes)
        );
    }

    public async Task<List<UnitItemModel>> GetUnitsAsync()
    {
        return await cache.GetOrCreateAsync(
            CacheKeys.UnitsCacheKey,
            async () => await context.IngredientUnits
                .Where(x => !x.IsDeleted)
                .ProjectTo<UnitItemModel>(mapper.ConfigurationProvider)
                .ToListAsync(),
            TimeSpan.FromMinutes(CacheKeys.ListCacheTtlMinutes)
        );
    }

    public async Task<List<RecipeItemModel>> ListByUserAsync()
    {
        long userId = await authService.GetUserId();

        return await context.Recipes
            .Where(x => !x.IsDeleted && x.UserId == userId)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task PublishRecipe(long id)
    {
        long userId = await authService.GetUserId();

        var recipe = await context.Recipes.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
        if (recipe == null)
            return;

        recipe.IsPublished = true;

        await context.SaveChangesAsync();
    }
}
