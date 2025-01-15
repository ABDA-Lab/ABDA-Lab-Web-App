using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Logging;
using SharedLibrary.Contracts.UserRegisterFlow;

namespace Application.Sagas
{
    public class UserRegisterSaga : MassTransitStateMachine<UserRegisterSagaData>
    {
        public State UserCreating { get; set; } = null!;
        public State Completed { get; set; } = null!;
        public State Failed { get; set; } = null!;

        public Event<IdentityUserCreatedEvent> IdentityCreated { get; set; } = null!;
        public Event<UserCreatedEvent> UserCreated { get; set; } = null!;
        public Event<UserCreatedFailureEvent> UserCreatedFailed { get; set; } = null!;

        public UserRegisterSaga(ILogger<UserRegisterSaga> logger)
        {
            InstanceState(x => x.CurrentState);

            Event(() => IdentityCreated, e => e.CorrelateById(m => m.Message.CorrelationId));
            Event(() => UserCreated, e => e.CorrelateById(m => m.Message.CorrelationId));
            Event(() => UserCreatedFailed, e => e.CorrelateById(m => m.Message.CorrelationId));

            Initially(
                When(IdentityCreated)
                .TransitionTo(UserCreating)
                .Then(context =>
                {
                    context.Saga.CorrelationId = context.Message.CorrelationId;
                    context.Saga.UserId = context.Message.UserId;
                    context.Saga.IdentityCreated = true;
                })
            );

            During(UserCreating,
                When(UserCreated)
                    .Then(context =>
                    {
                        context.Saga.UserCreated = true;
                        logger.LogInformation($"User creation success with username: {context.Message.Username}");
                    })
                    .TransitionTo(Completed),

                When(UserCreatedFailed)
                    .Then(context =>
                    {
                        logger.LogInformation($"Guest creation failed: {context.Message.Reason}");
                    })
                    .TransitionTo(Failed)
            );

            SetCompletedWhenFinalized();
        }
    }
}