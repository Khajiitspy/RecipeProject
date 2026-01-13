
using Microsoft.AspNetCore.Http;

namespace Core.Model.Recipe;

public class RecipeCreateModel
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Intstruction { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
    public List<RecipeIngredientCreateModel>? RecipeIngredients { get; set; }
}
