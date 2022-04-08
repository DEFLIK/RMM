using Microsoft.EntityFrameworkCore.Migrations;

namespace Rmm.Domain.DAL.Migrations
{
    public partial class LastAnswerTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "LastAnswerTime",
                table: "Devices",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastAnswerTime",
                table: "Devices");
        }
    }
}
