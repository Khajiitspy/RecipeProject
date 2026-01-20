using Core.Model.Recipe;
using Domain.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Recipe;

public class RecipeUpdateValidator : AbstractValidator<RecipeUpdateModel>
{
    public RecipeUpdateValidator(AppDbContext context)
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id обов'язкове")
            .Must(id => id > 0)
            .WithMessage("Id не може бути від'ємним або 0");

        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Назва обов'язкова")
            .Must(name => !String.IsNullOrEmpty(name))
            .WithMessage("Назва не може бути null або empty")
            .DependentRules(() =>
            {
                RuleFor(x => x.Name)
                    .MustAsync(async (model, name, cancellation) =>
                    !await context.Ingredients.AnyAsync(c => c.Name.ToLower() == name.ToLower().Trim() && c.Id != model.Id, cancellation))
                .WithMessage("Рецепт з такою назвою вже існує");
            })
            .MaximumLength(300)
            .WithMessage("Назва має бути не довшою, ніж 300 символів");

        RuleFor(x => x.Slug)
            .NotEmpty()
            .WithMessage("Слаг обов'язковий")
            .Must(slug => !string.IsNullOrEmpty(slug))
            .WithMessage("Слаг не може бути empty або null")
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
