using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class ShareduserResource
{
    public Guid Resourceid { get; set; }

    public Guid Shareduserid { get; set; }

    public string? Accesslevel { get; set; }

    public virtual Resource Resource { get; set; } = null!;
}
