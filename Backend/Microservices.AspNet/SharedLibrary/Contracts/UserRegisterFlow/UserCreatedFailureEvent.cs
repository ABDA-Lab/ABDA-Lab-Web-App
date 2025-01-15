using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharedLibrary.Contracts.UserRegisterFlow
{
    public class UserCreatedFailureEvent
    {
        public Guid CorrelationId {get; set;}

        public string Reason {get; set;} = null!;
    }
}