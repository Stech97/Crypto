using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DBRepository.Migrations
{
    public partial class updRateBTC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RateUSD_BTC",
                table: "Balance",
                newName: "RateBTC_USD");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RateBTC_USD",
                table: "Balance",
                newName: "RateUSD_BTC");
        }
    }
}
