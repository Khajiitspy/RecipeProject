
using Core.Model.Recipe.Ingredient;
using Domain.Data;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Ingredient;

public class IngredientCreateValidator : AbstractValidator<IngredientCreateModel>
{
    public IngredientCreateValidator(AppDbContext context)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Назва обов'язкова")
            .Must(name => !String.IsNullOrEmpty(name))
            .WithMessage("Назва не може бути null або empty")
            .DependentRules(() =>
            {
                RuleFor(x => x.Name)
                    .MustAsync(async (name, cancellation) =>
                    !await context.Ingredients.AnyAsync(c => c.Name.ToLower() == name.ToLower().Trim(), cancellation))
                .WithMessage("Інгредієнт з такою назвою вже існує");
            })
            .MaximumLength(250)
            .WithMessage("Назва має бути не довшою, ніж 250 символів");

        RuleFor(x => x.ImageFile)
            .NotEmpty()
            .WithMessage("Image file обов'язковий");
    }
}
