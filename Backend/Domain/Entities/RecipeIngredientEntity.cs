
using Domain.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblRecipeIngredients")]
public class RecipeIngredientEntity : BaseEntity<long>
{
    public decimal Amount { get; set; }
    [ForeignKey("Recipe")]
    public long RecipeId { get; set; }
    [ForeignKey("Ingredient")]
    public long IngredientId { get; set; }
    [ForeignKey("IngredientUnit")]
    public long IngredientUnitId { get; set; }
    public virtual RecipeEntity? Recipe { get; set; }
    public virtual IngredientEntity? Ingredient { get; set; }
    public virtual IngredientUnitEntity? Unit { get; set; }

}
