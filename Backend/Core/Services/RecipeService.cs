
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

public class RecipeService(AppDbContext context, IImageService imageService,
    IMapper mapper, IAuthService authService) : IRecipeService
{
    public async Task<RecipeItemModel> CreateAsync(RecipeCreateModel model)
    {
        var entity = mapper.Map<RecipeEntity>(model);
        try
        {
            entity.Image = await imageService.SaveImageAsync(model.Image!);
        }
        catch(Exception ex)
        {
            Console.WriteLine("-------------- Create recipe image upload error", ex.Message);
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
        return await context.Recipes
            .Where(x => x.Id == entity!.Id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task<List<RecipeItemModel>> ListAsync()
    {
        var userId = await authService.GetUserId();
        return await context.Recipes.Where(x => !x.IsDeleted && x.UserId == userId).ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider).ToListAsync();

    }

    public async Task DeleteAsync(long id)
    {
        var entity = await context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
        entity!.IsDeleted = true;
        await context.SaveChangesAsync();
    }
    public async Task<RecipeItemModel> UpdateAsync(RecipeUpdateModel model)
    {
        var entity = await context.Recipes.Where(x => x.Id == model.Id).FirstOrDefaultAsync();

        var item = await context.Recipes.Where(x => x.Id == model.Id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        mapper.Map(model, entity);

        if(model.Image != null)
        {
            await imageService.DeleteImageAsync(entity!.Image);
            try
            {
                entity.Image = await imageService.SaveImageAsync(model.Image);
            }
            catch(Exception ex)
            {
                Console.WriteLine("----------------- Update recipe image updoad error", ex.Message);
            }
        }

        await context.SaveChangesAsync();

        if(!String.IsNullOrEmpty(model.IngredientsJson) && !String.IsNullOrWhiteSpace(model.IngredientsJson)){
            var oldIngredients = await context.RecipeIngredients.Where(x => x.RecipeId == entity!.Id).ToListAsync();
            context.RecipeIngredients.RemoveRange(oldIngredients);

            var recipeIngredients = JsonSerializer.Deserialize<List<RecipeIngredientCreateModel>>(model.IngredientsJson);

            if (recipeIngredients != null)
            {
                foreach (var ingId in recipeIngredients!)
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
        }

        return await context.Recipes
            .Where(x => x.Id == entity!.Id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstAsync();
    }

    public async Task<RecipeItemModel> GetByIdAsync(long id)
    {
        return await context.Recipes
            .Where(x => x.Id == id)
            .ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<List<UnitItemModel>> GetUnitsAsync()
    {
        return await context.IngredientUnits.Where(x => !x.IsDeleted).ProjectTo<UnitItemModel>(mapper.ConfigurationProvider).ToListAsync();
    }
}
