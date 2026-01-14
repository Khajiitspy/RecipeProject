using Microsoft.AspNetCore.Http;
namespace Core.Model.Recipe.Ingredient;

public class IngredientUpdateModel
{
    public long Id { get; set; }
    public string? Name { get; set; } 
    public IFormFile? ImageFile { get; set; }
}
