
using Core.Model.Recipe.Ingredient;
using Core.Model.Recipe.Unit;

namespace Core.Model.Recipe;

public class RecipeIngredientItemModel
{
    public long Id { get; set; }
    public IngredientItemModel? Ingredient { get; set; }
    public UnitItemModel? Unit { get; set; }
    public decimal Amount { get; set; }
}
