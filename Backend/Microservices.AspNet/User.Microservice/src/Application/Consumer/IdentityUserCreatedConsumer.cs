using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Abstractions.UnitOfWork;
using Application.Common.ResponseModel;
using Application.Features.Users.Commands;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories;
using MassTransit;
using MediatR;
using SharedLibrary.Contracts.UserRegisterFlow;

namespace Application.Consumer
{
    public class IdentityUserCreatedConsumer : IConsumer<IdentityUserCreatedEvent>
    {
        private readonly IMediator _mediator;

        public IdentityUserCreatedConsumer(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task Consume(ConsumeContext<IdentityUserCreatedEvent> context)
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