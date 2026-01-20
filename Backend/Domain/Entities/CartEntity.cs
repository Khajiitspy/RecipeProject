using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

[Table("tblCarts")]
public class CartEntity : BaseEntity<long>
{
    public long UserId { get; set; }
    public UserEntity User { get; set; }
    public ICollection<CartRecipeEntity>? Recipes { get; set; }
}
