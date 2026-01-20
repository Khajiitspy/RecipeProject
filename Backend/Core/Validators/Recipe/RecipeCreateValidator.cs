
using Core.Model.Recipe;
using Domain.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Recipe;

public class RecipeCreateValidator : AbstractValidator<RecipeCreateModel>
{
    public RecipeCreateValidator(AppDbContext context)
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
                .WithMessage("Рецепт з такою назвою вже існує");
            })
            .MaximumLength(300)
            .WithMessage("Назва має бути не довшою, ніж 300 символів");

        RuleFor(x => x.Image)
            .NotEmpty()
            .WithMessage("Image file обов'язковий");

        RuleFor(x => x.Slug)
            .NotEmpty()
            .WithMessage("Слаг обов'язковий")
            .Must(slug => !string.IsNullOrEmpty(slug))
            .WithMessage("Слаг не може бути empty або null")
            .DependentRules(() =>
            {
                RuleFor(x => x.Slug)
                    .MustAsync(async (slug, cancellation) =>
                    !await context.Recipes.AnyAsync(c => c.Slug.ToLower() == slug.ToLower().Trim(), cancellation))
                .WithMessage("Рецепт з таким слагом вже існує");
            })
            .MaximumLength(350)
            .WithMessage("Слаг має бути не довшим, ніж 350 символів");

        RuleFor(x => x.Instruction)
            .NotEmpty()
            .WithMessage("Кроки приготування обов'язкові")
            .MinimumLength(50)
            .WithMessage("Інструкція не може бути коротшою за 50 символів");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("Оберіть обов'язково категорію")
            .Must(cat => cat > 0)
            .WithMessage("Такої категорії не існує");

        RuleFor(x => x.IngredientsJson)
           .Cascade(CascadeMode.Stop)
           .NotEmpty()
           .WithMessage("Інгредієнти обов'язкові")
           .MustAsync(async (json, ct) =>
               await RecipeIngredientsValidateHelper.ValidateIngredientsAsync(json!, context, ct))
           .WithMessage("Всі або окремий інгредієнт заповнений неправильно");
    }
}
