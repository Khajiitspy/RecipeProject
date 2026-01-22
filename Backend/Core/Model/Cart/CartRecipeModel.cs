
namespace Core.Model.Cart;

public class CartRecipeModel
{
    public long RecipeId { get; set; }
    public string RecipeName { get; set; } = string.Empty;
    public string RecipeImage { get; set; } = string.Empty;
    public int Portion { get; set; }
}
