using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class addFogotPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsVerification",
                table: "UserInfo",
                newName: "IsVerified");

            migrationBuilder.AddColumn<bool>(
                name: "IsFogotPassword",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFogotPassword",
                table: "UserInfo");

            migrationBuilder.RenameColumn(
                name: "IsVerified",
                table: "UserInfo",
                newName: "IsVerification");
        }
    }
}
