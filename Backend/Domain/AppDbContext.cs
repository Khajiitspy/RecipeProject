using Domain.Data.Entities;
using Domain.Data.Entities.Identity;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
        public DbSet<IngredientEntity> Ingredients { get; set; }
        public DbSet<RecipeEntity> Recipes { get; set; }
        public DbSet<RecipeIngredientEntity> RecipeIngredients { get; set; }
        public DbSet<IngredientUnitEntity> IngredientUnits { get; set; }
        public DbSet<CartEntity> Carts { get; set; }
        public DbSet<CartRecipeEntity> CartRecipes { get; set; }
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

            builder.Entity<RecipeIngredientEntity>()
                .HasKey(x => x.Id);

            builder.Entity<RecipeIngredientEntity>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeId);

            builder.Entity<RecipeIngredientEntity>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientId);

            builder.Entity<RecipeIngredientEntity>()
                .HasOne(ri => ri.Unit)
                .WithMany()
                .HasForeignKey(ri => ri.IngredientUnitId);

            builder.Entity<RecipeEntity>(entity =>
            {
                entity.HasOne(r => r.User)
                    .WithMany(u => u.Recipes)
                    .HasForeignKey(r => r.UserId);
            });
            builder.Entity<RecipeIngredientEntity>()
               .HasIndex(x => new { x.RecipeId, x.IngredientId })
               .IsUnique();
            builder.Entity<CartRecipeEntity>(entity =>
            {
                entity.HasOne(cr => cr.Cart)
                    .WithMany(c => c.Recipes)
                    .HasForeignKey(cr => cr.CartId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(cr => cr.Recipe)
                    .WithMany()
                    .HasForeignKey(cr => cr.RecipeId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(cr => new { cr.CartId, cr.RecipeId })
                    .IsUnique();
            });
            builder.Entity<CartEntity>()
               .HasOne(c => c.User)
               .WithOne(u => u.Cart)
               .HasForeignKey<CartEntity>(c => c.UserId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
