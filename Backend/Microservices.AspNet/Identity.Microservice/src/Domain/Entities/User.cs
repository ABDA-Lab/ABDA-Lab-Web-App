using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser<Guid>
{
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}