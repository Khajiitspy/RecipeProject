using Core.Model.Recipe.Category;
using Domain.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Category;

public class CategoryCreateValidator : AbstractValidator<CategoryCreateModel>
{
    public CategoryCreateValidator(AppDbContext db)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Назва обов'язкова")
            .Must(name => !string.IsNullOrEmpty(name))
            .WithMessage("Назва не може бути empty або null")
            .DependentRules(() =>
            {
                RuleFor(x => x.Name)
                    .MustAsync(async (name, cancellation) =>
                    !await db.Categories.AnyAsync(c => c.Name.ToLower() == name.ToLower().Trim(), cancellation))
                .WithMessage("Категорія з такою назвою вже існує");
            })
            .MaximumLength(250)
            .WithMessage("Назва має бути не довшою, ніж 250 символів");
        RuleFor(x => x.Slug)
            .NotEmpty()
            .WithMessage("Слаг обов'язковий")
            .Must(slug => !string.IsNullOrEmpty(slug))
            .WithMessage("Назва не може бути empty або null")
            .DependentRules(() =>
            {
                RuleFor(x => x.Slug)
                    .MustAsync(async (slug, cancellation) =>
                    !await db.Categories.AnyAsync(c => c.Slug.ToLower() == slug.ToLower().Trim(), cancellation))
                .WithMessage("Категорія з таким слагом вже існує");
            })
            .MaximumLength(250)
            .WithMessage("Слаг має бути не довшим, ніж 250 символів");


        RuleFor(x => x.ImageFile)
            .NotEmpty()
            .WithMessage("Image file обов'язковий");
    }
}
