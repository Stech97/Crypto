using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class UpdateTypeInvest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentType",
                table: "Investment");

            migrationBuilder.DropIndex(
                name: "IX_Investment_TypeInvestmentType",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeInvestmentType",
                table: "Investment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeInvestmentType",
                table: "Investment",
                nullable: true);

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
    }
}
