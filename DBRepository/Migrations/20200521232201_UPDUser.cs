using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class UPDUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "UserInfo");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "UserInfo",
                newName: "Zip");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "UserInfo",
                newName: "Adress");

            migrationBuilder.AddColumn<DateTime>(
                name: "BDay",
                table: "UserInfo",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BDay",
                table: "UserInfo");

            migrationBuilder.RenameColumn(
                name: "Zip",
                table: "UserInfo",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Adress",
                table: "UserInfo",
                newName: "Role");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);
        }
    }
}
