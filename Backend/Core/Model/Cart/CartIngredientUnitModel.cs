

namespace Core.Model.Cart;

public class CartIngredientUnitModel
{
    public long UnitId { get; set; }
    public string UnitName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
