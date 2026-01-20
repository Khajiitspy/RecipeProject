
using Domain.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblCartRecipes")]
public class CartRecipeEntity : BaseEntity<long>
{
    public long CartId { get; set; }
    public CartEntity? Cart { get; set; }
    public long RecipeId { get; set; }
    public RecipeEntity? Recipe { get; set; }
    public int Portion { get; set; } = 1;
}
