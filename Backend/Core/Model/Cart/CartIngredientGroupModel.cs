
namespace Core.Model.Cart;

public class CartIngredientGroupModel
{
    public long IngredientId { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public List<CartIngredientUnitModel>? Units { get; set; }
}
