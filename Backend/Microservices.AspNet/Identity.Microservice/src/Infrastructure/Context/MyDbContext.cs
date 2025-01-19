using System;
using System.Collections.Generic;
using Application.Configs;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public partial class MyDbContext : IdentityDbContext<User, Role, Guid, IdentityUserClaim<Guid>, UserRole, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
{
    private readonly EnvironmentConfig _config;

    public MyDbContext(DbContextOptions<MyDbContext> options, EnvironmentConfig config)
        : base(options)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = $"Host={_config.DatabaseHost};Port={_config.DatabasePort};Database={_config.DatabaseName};Username={_config.DatabaseUser};Password={_config.DatabasePassword}";
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity => entity.ToTable("identity_user"));
        modelBuilder.Entity<Role>(entity => entity.ToTable("identity_role"));
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("identity_user_role");
            entity.Property(e => e.AssignedAt)
              .HasDefaultValueSql("NOW()");
        });
        modelBuilder.Entity<IdentityUserClaim<Guid>>(entity => entity.ToTable("identity_user_claim"));
        modelBuilder.Entity<IdentityUserLogin<Guid>>(entity => entity.ToTable("identity_user_login"));
        modelBuilder.Entity<IdentityRoleClaim<Guid>>(entity => entity.ToTable("identity_role_claim"));
        modelBuilder.Entity<IdentityUserToken<Guid>>(entity => entity.ToTable("identity_user_token"));
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
