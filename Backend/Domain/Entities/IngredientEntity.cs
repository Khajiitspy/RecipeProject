
using Domain.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblIngredients")]
public class IngredientEntity : BaseEntity<long>
{
    public string Name { get; set; } = String.Empty;
    public string Image { get; set; } = String.Empty;
    public bool IsApproved { get; set; } = false;
    public ICollection<RecipeIngredientEntity>? RecipeIngredients { get; set; }

}
