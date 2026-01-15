

using System.Text.Json.Serialization;

namespace Core.Model.Recipe;

public class RecipeIngredientCreateModel
{
    [JsonPropertyName("ingredientId")]
    public long IngredientId { get; set; }
    [JsonPropertyName("amount")]
    public decimal Amount { get; set; }
    [JsonPropertyName("ingredientUnitId")]
    public long IngredientUnitId { get; set; }
}
