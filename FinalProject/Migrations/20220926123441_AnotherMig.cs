using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject.Migrations
{
    public partial class AnotherMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Carts_MedicineId",
                table: "Carts",
                column: "MedicineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carts_Medicines_MedicineId",
                table: "Carts",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carts_Medicines_MedicineId",
                table: "Carts");

            migrationBuilder.DropIndex(
                name: "IX_Carts_MedicineId",
                table: "Carts");
        }
    }
}
