using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Resource
{
    public Guid Resourceid { get; set; }

    public string? Cloudusername { get; set; }

    public string? Owner { get; set; }

    public string? Cloudpassword { get; set; }

    public string? Bucketlink { get; set; }

    public bool Ispublic { get; set; }

    public DateTime Createddate { get; set; }

    public DateTime? Updateddate { get; set; }

    public bool Isimportance { get; set; }

    public bool Isdeleted { get; set; }

    public virtual ICollection<ShareduserResource> ShareduserResources { get; set; } = new List<ShareduserResource>();
}
