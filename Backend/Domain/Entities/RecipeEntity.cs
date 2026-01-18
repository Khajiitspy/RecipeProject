
using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblRecipes")]
public class RecipeEntity : BaseEntity<long>
{
    public string Name { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public bool IsPublished { get; set; } = false;

    [ForeignKey("Category")]
    public long CategoryId { get; set; }
    public CategoryEntity? Category { get; set; }
    [ForeignKey("User")]
    public long UserId { get; set; }
    public UserEntity? User { get; set; }
    public ICollection<RecipeIngredientEntity>? RecipeIngredients { get; set; }

}
