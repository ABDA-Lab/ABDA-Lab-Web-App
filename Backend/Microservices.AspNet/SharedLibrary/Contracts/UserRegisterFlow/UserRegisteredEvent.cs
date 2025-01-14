using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Contracts.UserRegisterFlow
{
    public class IdentityCreatedEvent
    {
        public Guid CorrelationId {get; set;}
        public Guid UserId { get; set; }
        public string Username { get; set; } = null!;
    }
}