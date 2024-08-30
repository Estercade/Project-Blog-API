/*
  Warnings:

  - You are about to drop the column `lastEdited` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `posted` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `lastEdited` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "lastEdited",
DROP COLUMN "posted",
ADD COLUMN     "lastEditedAt" TIMESTAMP(3),
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "lastEdited",
ADD COLUMN     "lastEditedAt" TIMESTAMP(3);
