using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class updConfirmEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GuidEmail",
                table: "ConfirmEmail");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ConfirmEmail",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ConfirmEmail");

            migrationBuilder.AddColumn<Guid>(
                name: "GuidEmail",
                table: "ConfirmEmail",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
