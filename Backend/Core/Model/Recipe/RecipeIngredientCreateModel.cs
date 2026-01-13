

namespace Core.Model.Recipe;

public class RecipeIngredientCreateModel
{
    public long IngredientId { get; set; }
    public decimal Amount { get; set; }
    public long IngredientUnitId { get; set; }
}
