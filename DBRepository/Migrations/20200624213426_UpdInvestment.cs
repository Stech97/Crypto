using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class UpdInvestment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsReInvest",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFullInvest",
                table: "Investment",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "Profit",
                table: "Investment",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsReInvest",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "IsFullInvest",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "Profit",
                table: "Investment");
        }
    }
}
