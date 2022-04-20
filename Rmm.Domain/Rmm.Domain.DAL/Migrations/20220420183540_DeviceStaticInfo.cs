using Microsoft.EntityFrameworkCore.Migrations;

namespace Rmm.Domain.DAL.Migrations
{
    public partial class DeviceStaticInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastAnswerTime",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "RunTimeS",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Devices");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "LastAnswerTime",
                table: "Devices",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "RunTimeS",
                table: "Devices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Devices",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
