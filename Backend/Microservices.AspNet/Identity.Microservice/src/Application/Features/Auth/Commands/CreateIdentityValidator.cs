
using FluentValidation;
namespace Application.Features.Auth.Commands
{
    public class CreateIdentityValidator : AbstractValidator<CreateIdentityCommand>
    {
        public CreateIdentityValidator()
        {
            RuleFor(x => x.Username).NotEmpty().MaximumLength(70);
            RuleFor(x => x.Password).NotEmpty().MaximumLength(70);
        }
    }
}