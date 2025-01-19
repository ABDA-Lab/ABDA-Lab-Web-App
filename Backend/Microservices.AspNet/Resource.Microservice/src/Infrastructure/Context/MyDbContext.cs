using System;
using System.Collections.Generic;
using Application.Configs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context;

public partial class MyDbContext : DbContext
{
    private readonly EnvironmentConfig _config;

    public MyDbContext(DbContextOptions<MyDbContext> options, EnvironmentConfig config)
        : base(options)
    {
        _config = config;
    }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<ShareduserResource> ShareduserResources { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = $"Host={_config.DatabaseHost};Port={_config.DatabasePort};Database={_config.DatabaseName};Username={_config.DatabaseUser};Password={_config.DatabasePassword}";
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.HasKey(e => e.Resourceid).HasName("resource_pkey");

            entity.ToTable("resource");

            entity.Property(e => e.Resourceid)
                .HasDefaultValueSql("uuid_generate_v4()")
                .HasColumnName("resourceid");
            entity.Property(e => e.Bucketlink).HasColumnName("bucketlink");
            entity.Property(e => e.Cloudpassword)
                .HasMaxLength(255)
                .HasColumnName("cloudpassword");
            entity.Property(e => e.Cloudusername)
                .HasMaxLength(255)
                .HasColumnName("cloudusername");
            entity.Property(e => e.Createddate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("createddate");
            entity.Property(e => e.Isdeleted)
                .HasDefaultValue(false)
                .HasColumnName("isdeleted");
            entity.Property(e => e.Isimportance)
                .HasDefaultValue(false)
                .HasColumnName("isimportance");
            entity.Property(e => e.Ispublic)
                .HasDefaultValue(false)
                .HasColumnName("ispublic");
            entity.Property(e => e.Owner)
                .HasMaxLength(255)
                .HasColumnName("owner");
            entity.Property(e => e.Updateddate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updateddate");
        });

        modelBuilder.Entity<ShareduserResource>(entity =>
        {
            entity.HasKey(e => new { e.Resourceid, e.Shareduserid }).HasName("shareduser_resource_pkey");

            entity.ToTable("shareduser_resource");

            entity.Property(e => e.Resourceid).HasColumnName("resourceid");
            entity.Property(e => e.Shareduserid).HasColumnName("shareduserid");
            entity.Property(e => e.Accesslevel)
                .HasMaxLength(50)
                .HasColumnName("accesslevel");

            entity.HasOne(d => d.Resource).WithMany(p => p.ShareduserResources)
                .HasForeignKey(d => d.Resourceid)
                .HasConstraintName("fk_resource");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
