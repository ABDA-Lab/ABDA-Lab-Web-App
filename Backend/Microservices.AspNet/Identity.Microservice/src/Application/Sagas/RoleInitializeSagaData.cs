using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;

namespace Application.Sagas
{
    public class RoleInitializeSagaData : SagaStateMachineInstance, ISagaVersion
    {
        public Guid CorrelationId { get; set; }
        public int Version { get; set; }
        public string CurrentState {get;set;} = null!;
        public bool UserRoleCreated {get;set;}
    }
}