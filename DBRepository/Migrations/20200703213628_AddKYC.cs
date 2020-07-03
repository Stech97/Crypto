using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddKYC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PassportPicture",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassportPictureName",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ProofPicture",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProofPictureName",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "SelfiPicture",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelfiPictureName",
                table: "UserInfo",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassportPicture",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "PassportPictureName",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "ProofPicture",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "ProofPictureName",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "SelfiPicture",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "SelfiPictureName",
                table: "UserInfo");
        }
    }
}
