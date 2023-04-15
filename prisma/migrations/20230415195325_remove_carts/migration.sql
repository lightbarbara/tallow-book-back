/*
  Warnings:

  - You are about to drop the `booksCarts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booksCarts" DROP CONSTRAINT "booksCarts_bookId_fkey";

-- DropForeignKey
ALTER TABLE "booksCarts" DROP CONSTRAINT "booksCarts_cartId_fkey";

-- DropForeignKey
ALTER TABLE "booksCarts" DROP CONSTRAINT "booksCarts_userId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropTable
DROP TABLE "booksCarts";

-- DropTable
DROP TABLE "carts";

-- CreateTable
CREATE TABLE "booksCart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "booksCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booksCart" ADD CONSTRAINT "booksCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booksCart" ADD CONSTRAINT "booksCart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
