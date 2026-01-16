
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Bogus.DataSets;
using Core.Interfaces;
using Core.Model.Recipe;
using Core.Model.Recipe.Unit;
using Domain.Data;
using Domain.Data.Entities;
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
    private const string ListCacheKey = "recipes_all";
    // private const string ItemCacheKeyPrefix = "recipe_"; 
    private const int ListCacheTtlMinutes = 10;
    // private const int ItemCacheTtlMinutes = 5;

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
            Console.WriteLine($"-------------- Create recipe image upload error: {ex.Message}");
        }

        entity.UserId = await authService.GetUserId();
        context.Recipes.Add(entity);

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

        await context.SaveChangesAsync();

        cache.Remove(ListCacheKey);

        var ret = mapper.Map<RecipeItemModel>(entity);
        return ret;
    }

    public async Task<List<RecipeItemModel>> ListAsync()
    {
        return await cache.GetOrCreateAsync(
            ListCacheKey,
            async () => await context.Recipes
                .Where(x => !x.IsDeleted)
                .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
                .ToListAsync(),
            TimeSpan.FromMinutes(ListCacheTtlMinutes)
        );
    }

    public async Task<List<UnitItemModel>> GetUnitsAsync()
    {
        return await context.IngredientUnits.Where(x => !x.IsDeleted).ProjectTo<UnitItemModel>(mapper.ConfigurationProvider).ToListAsync();
    }
}
