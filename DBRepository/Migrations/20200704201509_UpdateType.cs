using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class UpdateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalanceHistory_TypeInvestment_TypeInvestmentId",
                table: "BalanceHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentId",
                table: "Investment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TypeInvestment",
                table: "TypeInvestment");

            migrationBuilder.DropIndex(
                name: "IX_Investment_TypeInvestmentId",
                table: "Investment");

            migrationBuilder.DropIndex(
                name: "IX_BalanceHistory_TypeInvestmentId",
                table: "BalanceHistory");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TypeInvestment");

            migrationBuilder.DropColumn(
                name: "TypeInvestmentId",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeInvestmentId",
                table: "BalanceHistory");

            migrationBuilder.AddColumn<int>(
                name: "TypeInvest",
                table: "Investment",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeInvestmentType",
                table: "Investment",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeHistory",
                table: "BalanceHistory",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TypeInvestment",
                table: "TypeInvestment",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Investment_TypeInvestmentType",
                table: "Investment",
                column: "TypeInvestmentType");

            migrationBuilder.AddForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentType",
                table: "Investment",
                column: "TypeInvestmentType",
                principalTable: "TypeInvestment",
                principalColumn: "Type",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentType",
                table: "Investment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TypeInvestment",
                table: "TypeInvestment");

            migrationBuilder.DropIndex(
                name: "IX_Investment_TypeInvestmentType",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeInvest",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeInvestmentType",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeHistory",
                table: "BalanceHistory");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TypeInvestment",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "TypeInvestmentId",
                table: "Investment",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeInvestmentId",
                table: "BalanceHistory",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TypeInvestment",
                table: "TypeInvestment",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Investment_TypeInvestmentId",
                table: "Investment",
                column: "TypeInvestmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BalanceHistory_TypeInvestmentId",
                table: "BalanceHistory",
                column: "TypeInvestmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_BalanceHistory_TypeInvestment_TypeInvestmentId",
                table: "BalanceHistory",
                column: "TypeInvestmentId",
                principalTable: "TypeInvestment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentId",
                table: "Investment",
                column: "TypeInvestmentId",
                principalTable: "TypeInvestment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
