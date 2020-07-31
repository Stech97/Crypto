using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class UpdCurSes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IP",
                table: "CurrentSession");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "CurrentSession");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IP",
                table: "CurrentSession",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "CurrentSession",
                nullable: false,
                defaultValue: "");
        }
    }
}
