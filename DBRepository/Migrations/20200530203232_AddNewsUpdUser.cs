using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddNewsUpdUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "Profit",
                table: "Investment");

            migrationBuilder.RenameColumn(
                name: "InvestmentID",
                table: "Investment",
                newName: "Id");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerification",
                table: "UserInfo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Investment",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Body = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Header = table.Column<string>(nullable: false),
                    LastChangeDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Investment_UserId",
                table: "Investment",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Investment_UserInfo_UserId",
                table: "Investment",
                column: "UserId",
                principalTable: "UserInfo",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Investment_UserInfo_UserId",
                table: "Investment");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropIndex(
                name: "IX_Investment_UserId",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "IsVerification",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Investment");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Investment",
                newName: "InvestmentID");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Investment",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Investment",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Investment",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Profit",
                table: "Investment",
                nullable: true);
        }
    }
}
