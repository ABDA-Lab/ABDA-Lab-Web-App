using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public partial class UserRole : IdentityUserRole<Guid>
{
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
}
