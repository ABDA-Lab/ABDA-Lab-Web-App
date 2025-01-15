using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Users.Commands;
using MassTransit;
using MediatR;
using SharedLibrary.Contracts.RoleInitializeFlow;
using SharedLibrary.Contracts.UserRegisterFlow;

namespace Application.Consumer
{
    public class IdentityRoleCreatedConsumer : IConsumer<IdentityRoleCreatedEvent>
    {
        private readonly IMediator _mediator;

        public IdentityRoleCreatedConsumer(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task Consume(ConsumeContext<IdentityRoleCreatedEvent> context)
        {
            var command = new CreateRoleCommand(context.Message.RoleId, context.Message.Name);
            var result = await _mediator.Send(command, context.CancellationToken);
            if (result.IsSuccess)
            {
                await context.Publish(new UserRoleCreatedEvent
                {
                    CorrelationId = context.Message.CorrelationId,
                    Name = context.Message.Name
                });
            }
            else
            {
                await context.Publish(new UserRoleCreatedFailureEvent
                {
                    CorrelationId = context.Message.CorrelationId,
                    Reason = result.Error.Description
                });
            }
        }
    }
}