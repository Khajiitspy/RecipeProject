using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class Fix_ids_problem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblRecipeIngredients",
                table: "tblRecipeIngredients");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "tblRecipeIngredients",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblRecipeIngredients",
                table: "tblRecipeIngredients",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblRecipeIngredients_RecipeId_IngredientId",
                table: "tblRecipeIngredients",
                columns: new[] { "RecipeId", "IngredientId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblRecipeIngredients",
                table: "tblRecipeIngredients");

            migrationBuilder.DropIndex(
                name: "IX_tblRecipeIngredients_RecipeId_IngredientId",
                table: "tblRecipeIngredients");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "tblRecipeIngredients",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblRecipeIngredients",
                table: "tblRecipeIngredients",
                columns: new[] { "RecipeId", "IngredientId" });
        }
    }
}
