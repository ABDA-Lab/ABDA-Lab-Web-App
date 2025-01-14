using System;
using System.Collections.Generic;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public partial class MyDbContext : IdentityDbContext<User, Role, Guid>
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity => entity.ToTable("identity_user"));
        modelBuilder.Entity<Role>(entity => entity.ToTable("identity_role"));
        modelBuilder.Entity<UserRole>(entity => entity.ToTable("identity_user_role"));
        modelBuilder.Entity<IdentityUserClaim<Guid>>(entity => entity.ToTable("identity_user_claim"));
        modelBuilder.Entity<IdentityUserLogin<Guid>>(entity => entity.ToTable("identity_user_login"));
        modelBuilder.Entity<IdentityRoleClaim<Guid>>(entity => entity.ToTable("identity_role_claim"));
        modelBuilder.Entity<IdentityUserToken<Guid>>(entity => entity.ToTable("identity_user_token"));
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
