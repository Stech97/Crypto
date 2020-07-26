using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class DelIdMainPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MainPage",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "MainPage");

            migrationBuilder.AlterColumn<string>(
                name: "Component",
                table: "MainPage",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_MainPage",
                table: "MainPage",
                column: "Component");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MainPage",
                table: "MainPage");

            migrationBuilder.AlterColumn<string>(
                name: "Component",
                table: "MainPage",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MainPage",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MainPage",
                table: "MainPage",
                column: "Id");
        }
    }
}
