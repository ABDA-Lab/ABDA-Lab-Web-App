using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;

namespace Application.Sagas
{
    public class UserRegisterSagaData : SagaStateMachineInstance, ISagaVersion
    {
        public Guid CorrelationId { get; set; }
        public Guid UserId {get; set;}
        public string CurrentState {get;set;} = null!;
        public bool IdentityCreated;
        public bool UserCreated;
        public int Version { get; set; }
    }
}