using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class updCurrentSessionToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoutTime",
                table: "CurrentSession");

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "CurrentSession",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "CurrentSession");

            migrationBuilder.AddColumn<DateTime>(
                name: "LogoutTime",
                table: "CurrentSession",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
