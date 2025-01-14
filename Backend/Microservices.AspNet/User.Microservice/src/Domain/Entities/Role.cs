using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Role
{
    public Guid Roleid { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
