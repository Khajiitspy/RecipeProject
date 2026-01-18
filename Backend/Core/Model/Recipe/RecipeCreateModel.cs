
using Microsoft.AspNetCore.Http;

namespace Core.Model.Recipe;

public class RecipeCreateModel
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
    public bool IsPublished { get; set; } = false;
    public long CategoryId { get; set; }
    public string IngredientsJson { get; set; } = string.Empty;
    //public List<RecipeIngredientCreateModel>? RecipeIngredients { get; set; }
}
