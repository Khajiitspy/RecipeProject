using Core.Model.Recipe;
using Domain.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Recipe;

public class RecipeIngredientValidator : AbstractValidator<RecipeIngredientCreateModel>
{
    public RecipeIngredientValidator(AppDbContext context)
    {
        RuleFor(x => x.IngredientId)
            .GreaterThan(0)
            .MustAsync(async (id, ct) => await context.Ingredients.AnyAsync(i => i.Id == id, ct))
            .WithMessage("Інгредієнт не існує");

        RuleFor(x => x.IngredientUnitId)
            .GreaterThan(0)
            .MustAsync(async (id, ct) => await context.IngredientUnits.AnyAsync(i => i.Id == id, ct))
            .WithMessage("Такої мірки не існує");

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage("Кількість інгредієнт має бути більшою 0");
    }
}
