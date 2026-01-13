
using Domain.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("IngredientUnits")]
public class IngredientUnitEntity : BaseEntity<long>
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;

}
