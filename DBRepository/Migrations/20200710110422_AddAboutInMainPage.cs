using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddAboutInMainPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Link1",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Link2",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Link3",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name1",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name2",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name3",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture1",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Picture1Name",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture2",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Picture2Name",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture3",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Picture3Name",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title1",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title2",
                table: "MainPage",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title3",
                table: "MainPage",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Link1",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Link2",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Link3",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Name1",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Name2",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Name3",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture1",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture1Name",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture2",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture2Name",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture3",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Picture3Name",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Title1",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Title2",
                table: "MainPage");

            migrationBuilder.DropColumn(
                name: "Title3",
                table: "MainPage");
        }
    }
}
