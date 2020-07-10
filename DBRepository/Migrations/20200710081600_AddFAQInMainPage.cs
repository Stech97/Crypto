using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddFAQInMainPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Question1Header",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Question1Text",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Question2Header",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Question2Text",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Question3Header",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Question3Text",
                table: "MainPage",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Question1Header",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Question1Text",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Question2Header",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Question2Text",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Question3Header",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Question3Text",
                table: "MainPage");
        }
    }
}
