using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Domain.Data.Entities.Identity;
using Core.Model.Account;

namespace Core.Validators.Account
{
    public class RegisterValidator : AbstractValidator<RegisterModel>
    {
        public RegisterValidator(UserManager<UserEntity> userManager)
        {
            RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email is required")
                    .EmailAddress().WithMessage("Incorrect format of email")
                    .DependentRules(() =>
                    {
                        RuleFor(x => x.Email)
                            .MustAsync(async (email, cancellation) =>
                            {
                                var user = await userManager.FindByEmailAsync(email);
                                return user == null;
                            }).WithMessage("User with this email already exists");
                    });


            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Пароль є обов'язковим")
                    .MinimumLength(6).WithMessage("Пароль повинен містити щонайменше 6 символів")
                    .Matches("[A-Z]").WithMessage("Пароль повинен містити хоча б одну латинську велику літеру")
                    .Matches("[a-z]").WithMessage("Пароль повинен містити хоча б одну латинську малу літеру")
                    .Matches("[0-9]").WithMessage("Пароль повинен містити хоча б одну цифру")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Пароль повинен містити хоча б один спеціальний символ");
            RuleFor(x => x.ImageFile)
                    .NotEmpty()
                    .WithMessage("Image file is required");
            RuleFor(x => x.FirstName)
                    .NotEmpty().WithMessage("First name is required")
                    .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters");
            RuleFor(x => x.LastName)
                    .NotEmpty().WithMessage("Last name is required")
                    .MaximumLength(50).WithMessage("Last name cannot be longer than 50 characters");

        }
    }
}
