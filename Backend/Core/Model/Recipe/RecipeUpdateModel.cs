

using Microsoft.AspNetCore.Http;

namespace Core.Model.Recipe;

public class RecipeUpdateModel
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Instruction { get; set; }
    public string? Slug { get; set; }
    public IFormFile? Image { get; set; }
    public long? CategoryId { get; set; }
    public List<RecipeIngredientUpdateModel>? Ingredients { get; set; }
}
