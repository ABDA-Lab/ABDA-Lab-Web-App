using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Contracts.RoleInitializeFlow
{
    public class IdentityRoleCreatedEvent
    {
        public Guid CorrelationId {get; set;} 
        public Guid RoleId {get; set;}
        public string Name {get;set;} = null!;
    }
}