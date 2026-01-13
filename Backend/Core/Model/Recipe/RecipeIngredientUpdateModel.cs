
namespace Core.Model.Recipe;

public class RecipeIngredientUpdateModel
{
    public long Id { get; set; }
    public decimal? Amount { get; set; }
    public long? IngredientId { get; set; }
    public long? IngredientUnitId { get; set; }
}
