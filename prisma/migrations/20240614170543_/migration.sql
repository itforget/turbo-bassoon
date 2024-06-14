/*
  Warnings:

  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - Added the required column `location` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "address",
ADD COLUMN     "location" TEXT NOT NULL;
