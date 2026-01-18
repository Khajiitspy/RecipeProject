
using Core.Model.Recipe.Category;

namespace Core.Model.Recipe;

public class RecipeItemModel
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public bool IsPublished { get; set; } = false;
    public CategoryItemModel? Category { get; set; } 
    public List<RecipeIngredientItemModel>? Ingredients { get; set; }
}
