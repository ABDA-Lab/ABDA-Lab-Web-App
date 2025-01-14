using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.Users.Queries
{
    public sealed record GetUserResponse(
        string Username
    );
}