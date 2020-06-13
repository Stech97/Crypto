using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class addChildren : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentRef",
                table: "UserInfo");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserInfo_UserId",
                table: "UserInfo",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInfo_UserInfo_UserId",
                table: "UserInfo",
                column: "UserId",
                principalTable: "UserInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInfo_UserInfo_UserId",
                table: "UserInfo");

            migrationBuilder.DropIndex(
                name: "IX_UserInfo_UserId",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserInfo");

            migrationBuilder.AddColumn<string>(
                name: "ParentRef",
                table: "UserInfo",
                nullable: true);
        }
    }
}
