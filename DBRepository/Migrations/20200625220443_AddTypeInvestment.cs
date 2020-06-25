using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class AddTypeInvestment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Investment");

            migrationBuilder.AddColumn<int>(
                name: "TypeInvestmentId",
                table: "Investment",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TypeInvestment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Persent = table.Column<double>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeInvestment", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Investment_TypeInvestmentId",
                table: "Investment",
                column: "TypeInvestmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentId",
                table: "Investment",
                column: "TypeInvestmentId",
                principalTable: "TypeInvestment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Investment_TypeInvestment_TypeInvestmentId",
                table: "Investment");

            migrationBuilder.DropTable(
                name: "TypeInvestment");

            migrationBuilder.DropIndex(
                name: "IX_Investment_TypeInvestmentId",
                table: "Investment");

            migrationBuilder.DropColumn(
                name: "TypeInvestmentId",
                table: "Investment");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Investment",
                nullable: true);
        }
    }
}
