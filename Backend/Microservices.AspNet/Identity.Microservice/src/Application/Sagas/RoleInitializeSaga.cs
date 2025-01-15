using MassTransit;
using Microsoft.Extensions.Logging;
using SharedLibrary.Contracts.RoleInitializeFlow;

namespace Application.Sagas
{
    public class RoleInitializeSaga : MassTransitStateMachine<RoleInitializeSagaData>
    {

        public State UserRoleCreating { get; set; } = null!;
        public State Completed { get; set; } = null!;
        public State Failed { get; set; } = null!;

        public Event<IdentityRoleCreatedEvent> IdentityRoleCreated { get; set; } = null!;
        public Event<UserRoleCreatedEvent> UserRoleCreated { get; set; } = null!;
        public Event<UserRoleCreatedFailureEvent> UserRoleCreatedFailure { get; set; } = null!;

        public RoleInitializeSaga(ILogger<RoleInitializeSaga> logger)
        {
            InstanceState(x => x.CurrentState);
            Event(() => IdentityRoleCreated, e => e.CorrelateById(m => m.Message.CorrelationId));
            Event(() => UserRoleCreated, e => e.CorrelateById(m => m.Message.CorrelationId));

            Initially(
                When(IdentityRoleCreated)
                .TransitionTo(UserRoleCreating)
                .Then(context =>
                {
                    context.Saga.CorrelationId = context.Message.CorrelationId;
                })
            );

            During(UserRoleCreating,
                When(UserRoleCreated)
                    .Then(context =>
                    {
                        context.Saga.UserRoleCreated = true;
                        logger.LogInformation($"Role creation success with role name: {context.Message.Name}");
                    })
                    .TransitionTo(Completed),

                When(UserRoleCreatedFailure)
                    .Then(context =>
                    {
                        logger.LogInformation($"Guest creation failed: {context.Message.Reason}");
                    })
                    .TransitionTo(Failed)
            );
        }
        
    }
}