
using Core.Model.Recipe;
using Domain.Data;
using System.Text.Json;

namespace Core.Validators.Recipe;

public static class RecipeIngredientsValidateHelper
{
    public static async Task<bool> ValidateIngredientsAsync(string json, AppDbContext context, CancellationToken ct)
    {
        var ingredients = JsonSerializer.Deserialize<List<RecipeIngredientCreateModel>>(json);
        if (ingredients == null)
            return false;
        var validator = new RecipeIngredientValidator(context);
        foreach (var ingr in ingredients)
        {
            var res = await validator.ValidateAsync(ingr, ct);
            if (!res.IsValid)
                return false;
        }
        return true;
    }
}
