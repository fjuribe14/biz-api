/*
  Warnings:

  - You are about to drop the column `cantidad` on the `OrdenItem` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `OrdenItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productId_fkey";

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrdenItem" DROP COLUMN "cantidad",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
