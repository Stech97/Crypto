using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddDicardKYC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ErrorDiscard",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDiscard",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ErrorDiscard",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "IsDiscard",
                table: "UserInfo");
        }
    }
}
