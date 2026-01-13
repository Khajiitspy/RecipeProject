
using Microsoft.AspNetCore.Http;

namespace Core.Model.Recipe.Ingredient;

public class IngredientCreateModel
{
    public string Name { get; set; } = string.Empty;
    public IFormFile? ImageFile { get; set; }
}
