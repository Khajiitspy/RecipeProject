
namespace Core.Model.Cart;

public class CartItemModel
{
    public long Id { get; set; }
    public List<CartRecipeModel>? Recipes { get; set; }
    public List<CartIngredientGroupModel>? Ingredients { get; set; }
}
