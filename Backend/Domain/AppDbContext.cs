using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Domain.Data
{
    public class AppDbContext : IdentityDbContext<UserEntity, RoleEntity, long,
        IdentityUserClaim<long>, UserRoleEntity, UserLoginEntity,
        IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<CategoryEntity> Categories { get; set; }
        //public DbSet<IngredientEntity> Ingredients { get; set; }
        //public DbSet<ProductSizeEntity> ProductSizes { get; set; }
        //public DbSet<ProductEntity> Products { get; set; }
        //public DbSet<ProductIngredientEntity> ProductIngredients { get; set; }
        //public DbSet<ProductImageEntity> ProductImages { get; set; }
        //public DbSet<CartEntity> Carts { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();

                ur.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });

            builder.Entity<UserLoginEntity>(b =>
            {
                b.HasOne(l => l.User)
                    .WithMany(u => u.UserLogins)
                    .HasForeignKey(l => l.UserId)
                    .IsRequired();
            });

            //builder.Entity<ProductIngredientEntity>()
            //    .HasKey(pi => new { pi.ProductId, pi.IngredientId });

            //builder.Entity<CartEntity>()
            //    .HasKey(pi => new { pi.ProductId, pi.UserId });
        }
    }
}
