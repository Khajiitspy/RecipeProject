
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Model.Recipe;
using Domain.Data;
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
        if(recipeIngredients != null)
        {
            foreach(var ingId in recipeIngredients)
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
        var ret = mapper.Map<RecipeItemModel>(entity);
        return ret;
    }

    public async Task<List<RecipeItemModel>> ListAsync()
    {
        return await context.Recipes.Where(x => !x.IsDeleted).ProjectTo<RecipeItemModel>(mapper.ConfigurationProvider).ToListAsync();

    }
}
