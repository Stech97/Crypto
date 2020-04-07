using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class unionUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UI_TO_UR");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "UserInfo",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "UserInfo");

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserRoleID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    IsAdmin = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.UserRoleID);
                });

            migrationBuilder.CreateTable(
                name: "UI_TO_UR",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    UserRoleID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UI_TO_UR", x => new { x.UserId, x.UserRoleID });
                    table.ForeignKey(
                        name: "FK_UI_TO_UR_UserInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfo",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UI_TO_UR_UserRole_UserRoleID",
                        column: x => x.UserRoleID,
                        principalTable: "UserRole",
                        principalColumn: "UserRoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UI_TO_UR_UserRoleID",
                table: "UI_TO_UR",
                column: "UserRoleID");
        }
    }
}
