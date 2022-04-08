using Microsoft.EntityFrameworkCore.Migrations;

namespace Rmm.Domain.DAL.Migrations
{
    public partial class DeviceLastAnswerTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ElapsedAnswerTime",
                table: "Devices",
                newName: "LastAnswerTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastAnswerTime",
                table: "Devices",
                newName: "ElapsedAnswerTime");
        }
    }
}
