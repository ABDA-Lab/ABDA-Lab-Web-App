using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.Users.Queries
{
    public sealed record GetMeResponse
    {
        public Guid Userid { get; set; }

        public string Username { get; set; } = null!;

        public string? Fullname { get; set; }

        public string? Nickname { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? Country { get; set; }

        public string? Description { get; set; }

        public string? Profilemd { get; set; }

        public string? Avatar { get; set; }

        public string? Status { get; set; }

        public DateTime? Createdat { get; set; }
    }
}