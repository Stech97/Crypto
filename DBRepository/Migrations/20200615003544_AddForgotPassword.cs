using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddForgotPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ConfirmEmail");

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeConfirm",
                table: "ConfirmEmail",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "ForgotPassword",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: false),
                    TimeForgot = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Username = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForgotPassword", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ForgotPassword_UserInfo_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ForgotPassword_UserId",
                table: "ForgotPassword",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForgotPassword");

            migrationBuilder.DropColumn(
                name: "TimeConfirm",
                table: "ConfirmEmail");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ConfirmEmail",
                nullable: false,
                defaultValue: "");
        }
    }
}
