using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AutoMigration_20250117211908 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");

            migrationBuilder.CreateTable(
                name: "resource",
                columns: table => new
                {
                    resourceid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "uuid_generate_v4()"),
                    cloudusername = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    owner = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    cloudpassword = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    bucketlink = table.Column<string>(type: "text", nullable: true),
                    ispublic = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    createddate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updateddate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    isimportance = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    isdeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("resource_pkey", x => x.resourceid);
                });

            migrationBuilder.CreateTable(
                name: "shareduser_resource",
                columns: table => new
                {
                    resourceid = table.Column<Guid>(type: "uuid", nullable: false),
                    shareduserid = table.Column<Guid>(type: "uuid", nullable: false),
                    accesslevel = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("shareduser_resource_pkey", x => new { x.resourceid, x.shareduserid });
                    table.ForeignKey(
                        name: "fk_resource",
                        column: x => x.resourceid,
                        principalTable: "resource",
                        principalColumn: "resourceid",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "shareduser_resource");

            migrationBuilder.DropTable(
                name: "resource");
        }
    }
}
