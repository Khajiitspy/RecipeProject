
using AutoMapper;
using Core.Interfaces;
using Core.Model.Cart;
using Domain.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CartService(IMapper mapper, IAuthService authService,
    AppDbContext context) : ICartService
{
    public async Task<CartItemModel> CreateAsync(CartCreateModel model)
    {
        var userId = await authService.GetUserId();
        var entity = await context.Carts.Include(c => c.Recipes)
            .FirstOrDefaultAsync(c => c.UserId == userId);
        if (entity == null)
        {
            entity = new CartEntity()
            {
                UserId = userId
            };
            await context.Carts.AddAsync(entity);
            await context.SaveChangesAsync();
        }
        else
            entity.Recipes?.Clear();

        foreach (var recipe in model.Recipes!)
        {
            entity.Recipes.Add(new CartRecipeEntity
            {
                RecipeId = recipe.RecipeId,
                Portion = recipe.Portion
            });
        }
        await context.SaveChangesAsync();
        return await GetCartAsync();
    }

    public async Task<CartItemModel> GetCartAsync()
    {
        var userId = await authService.GetUserId();
        var cart = await context.Carts.Where(c => c.UserId == userId)
            .Select(c => new CartItemModel
            {
                Id = c.Id,
                Recipes = c.Recipes!.Select(cr => new CartRecipeModel
                {
                    RecipeId = cr.RecipeId,
                    RecipeName = cr.Recipe!.Name,
                    Portion = cr.Portion
                }).ToList(),

                Ingredients = c.Recipes!
                .SelectMany(cr => cr.Recipe!.RecipeIngredients!.Select(ri => new
                {
                    ri.IngredientId,
                    ri.Ingredient!.Name,
                    UnitName = ri.Unit!.Name,
                    UnitSlug = ri.Unit!.Slug,
                    UnitId = ri.Unit!.Id,
                    Amount = ri.Amount * cr.Portion
                }))
                .GroupBy(x => new { x.IngredientId, x.Name })
                .Select(g => new CartIngredientGroupModel
                {
                    IngredientId = g.Key.IngredientId,
                    IngredientName = g.Key.Name,

                    Units = g
                    .GroupBy(x => new { x.UnitId, x.UnitName, x.UnitSlug })
                    .Select(i => new CartIngredientUnitModel
                    {
                        UnitId = i.Key.UnitId,
                        UnitName = i.Key.UnitName,
                        UnitSlug = i.Key.UnitSlug,
                        Amount = i.Sum(a => a.Amount),
                    }).ToList()
                })
                .ToList()


            }).FirstOrDefaultAsync();
        if(cart?.Ingredients != null)
        {
            await CombineUnits(cart.Ingredients);
        }
        return cart ?? new CartItemModel();
    }

    private async Task CombineUnits(List<CartIngredientGroupModel> ingredients)
    {
        var kgUnit = await context.IngredientUnits
        .Where(x => x.Slug == "kg")
        .Select(x => new { x.Id, x.Name, x.Slug })
        .FirstAsync();

        var lUnit = await context.IngredientUnits
            .Where(x => x.Slug == "l")
            .Select(x => new { x.Id, x.Name, x.Slug })
            .FirstAsync();

        foreach (var ing in ingredients)
        {
            var result = new List<CartIngredientUnitModel>();

            var weightSum = ing.Units!
                .Where(u => u.UnitSlug is "mg" or "g" or "kg")
                .Sum(u => u.UnitSlug switch
                {
                    "mg" => u.Amount / 1_000_000m,
                    "g" => u.Amount / 1_000m,
                    "kg" => u.Amount,
                    _ => 0
                });

            if (weightSum > 0)
            {
                result.Add(new CartIngredientUnitModel
                {
                    UnitId = kgUnit.Id,
                    UnitName = kgUnit.Name,
                    UnitSlug = kgUnit.Slug,
                    Amount = Math.Round(weightSum, 2)
                });
            }

            var volumeSum = ing.Units
                .Where(u => u.UnitSlug is "ml" or "l")
                .Sum(u => u.UnitSlug switch
                {
                    "ml" => u.Amount / 1_000m,
                    "l" => u.Amount,
                    _ => 0
                });

            if (volumeSum > 0)
            {
                result.Add(new CartIngredientUnitModel
                {
                    UnitId = lUnit.Id,
                    UnitName = lUnit.Name,
                    UnitSlug = lUnit.Slug,
                    Amount = Math.Round(volumeSum, 2)
                });
            }

            result.AddRange(
                ing.Units
                    .Where(u => u.UnitSlug is not ("mg" or "g" or "kg" or "ml" or "l"))
            );

            ing.Units = result;
        }
    }
}
