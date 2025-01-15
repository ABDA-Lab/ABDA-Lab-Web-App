using Application.Features.Users.Commands;
using MassTransit;
using MediatR;
using SharedLibrary.Contracts.UserRegisterFlow;

namespace Application.Consumer
{
    public class IdentityCreatedConsumer : IConsumer<IdentityCreatedEvent>
    {
        private readonly IMediator _mediator;

        public IdentityCreatedConsumer(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task Consume(ConsumeContext<IdentityCreatedEvent> context)
        {
            var command = new CreateUserCommand(context.Message.UserId, context.Message.RoleId, context.Message.Username);
            var result = await _mediator.Send(command, context.CancellationToken);
            if (result.IsSuccess)
            {
                await context.Publish(new UserCreatedEvent
                {
                    CorrelationId = context.Message.CorrelationId,
                    Username = context.Message.Username
                });
            }
            else
            {
                await context.Publish(new UserCreatedFailureEvent
                {
                    CorrelationId = context.Message.CorrelationId,
                    Reason = result.Error.Description
                });
            }

        }
    }
}