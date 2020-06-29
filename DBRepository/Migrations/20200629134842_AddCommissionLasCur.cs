using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddCommissionLasCur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSuper",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "CurrentCommission",
                table: "Investment",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSuper",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "CurrentCommission",
                table: "Investment");
        }
    }
}
