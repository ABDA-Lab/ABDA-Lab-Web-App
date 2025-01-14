using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AutoMigration_20250114093714 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Job");

            migrationBuilder.DropTable(
                name: "user_roles");

            migrationBuilder.DropPrimaryKey(
                name: "users_pkey",
                table: "users");

            migrationBuilder.DropIndex(
                name: "users_email_key",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "roles_pkey",
                table: "roles");

            migrationBuilder.DropIndex(
                name: "roles_role_name_key",
                table: "roles");

            migrationBuilder.DropColumn(
                name: "name",
                table: "users");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "roles");

            migrationBuilder.DropColumn(
                name: "role_name",
                table: "roles");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "user");

            migrationBuilder.RenameTable(
                name: "roles",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "user",
                newName: "createdat");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "user",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "role_id",
                table: "role",
                newName: "roleid");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:PostgresExtension:pgcrypto", ",,");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "avatar",
                table: "user",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "birthday",
                table: "user",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "country",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "user",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fullname",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nickname",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "password",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "phone",
                table: "user",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "profilemd",
                table: "user",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "user",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "user",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "roleid",
                table: "role",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldDefaultValueSql: "gen_random_uuid()");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "role",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "user_pkey",
                table: "user",
                column: "userid");

            migrationBuilder.AddPrimaryKey(
                name: "role_pkey",
                table: "role",
                column: "roleid");

            migrationBuilder.CreateTable(
                name: "user_role",
                columns: table => new
                {
                    userid = table.Column<Guid>(type: "uuid", nullable: false),
                    roleid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_role_pkey", x => new { x.userid, x.roleid });
                    table.ForeignKey(
                        name: "user_role_roleid_fkey",
                        column: x => x.roleid,
                        principalTable: "role",
                        principalColumn: "roleid");
                    table.ForeignKey(
                        name: "user_role_userid_fkey",
                        column: x => x.userid,
                        principalTable: "user",
                        principalColumn: "userid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_role_roleid",
                table: "user_role",
                column: "roleid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_role");

            migrationBuilder.DropPrimaryKey(
                name: "user_pkey",
                table: "user");

            migrationBuilder.DropPrimaryKey(
                name: "role_pkey",
                table: "role");

            migrationBuilder.DropColumn(
                name: "avatar",
                table: "user");

            migrationBuilder.DropColumn(
                name: "birthday",
                table: "user");

            migrationBuilder.DropColumn(
                name: "country",
                table: "user");

            migrationBuilder.DropColumn(
                name: "description",
                table: "user");

            migrationBuilder.DropColumn(
                name: "fullname",
                table: "user");

            migrationBuilder.DropColumn(
                name: "nickname",
                table: "user");

            migrationBuilder.DropColumn(
                name: "password",
                table: "user");

            migrationBuilder.DropColumn(
                name: "phone",
                table: "user");

            migrationBuilder.DropColumn(
                name: "profilemd",
                table: "user");

            migrationBuilder.DropColumn(
                name: "status",
                table: "user");

            migrationBuilder.DropColumn(
                name: "username",
                table: "user");

            migrationBuilder.DropColumn(
                name: "name",
                table: "role");

            migrationBuilder.RenameTable(
                name: "user",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "role",
                newName: "roles");

            migrationBuilder.RenameColumn(
                name: "createdat",
                table: "users",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "users",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "roleid",
                table: "roles",
                newName: "role_id");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:pgcrypto", ",,");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "role_id",
                table: "roles",
                type: "uuid",
                nullable: false,
                defaultValueSql: "gen_random_uuid()",
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "roles",
                type: "timestamp without time zone",
                nullable: true,
                defaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AddColumn<string>(
                name: "role_name",
                table: "roles",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "users_pkey",
                table: "users",
                column: "user_id");

            migrationBuilder.AddPrimaryKey(
                name: "roles_pkey",
                table: "roles",
                column: "role_id");

            migrationBuilder.CreateTable(
                name: "Job",
                columns: table => new
                {
                    JobId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Job_pkey", x => x.JobId);
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    role_id = table.Column<Guid>(type: "uuid", nullable: false),
                    assigned_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_roles_pkey", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "user_roles_role_id_fkey",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "role_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "user_roles_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "users_email_key",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "roles_role_name_key",
                table: "roles",
                column: "role_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_roles_role_id",
                table: "user_roles",
                column: "role_id");
        }
    }
}
