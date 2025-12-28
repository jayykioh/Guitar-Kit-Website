/*
  Warnings:

  - You are about to drop the column `focus` on the `PracticeSession` table. All the data in the column will be lost.
  - You are about to drop the column `lastPracticed` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `focusType` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.
  - Made the column `artist` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- DropIndex
DROP INDEX "Song_userId_idx";

-- DropIndex
DROP INDEX "Song_userId_lastPracticed_idx";

-- DropIndex
DROP INDEX "Song_userId_title_artist_key";

-- AlterTable
ALTER TABLE "PracticeSession" DROP COLUMN "focus",
ADD COLUMN     "focusType" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "songId" TEXT;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "lastPracticed",
DROP COLUMN "notes",
DROP COLUMN "progress",
DROP COLUMN "userId",
ALTER COLUMN "artist" SET NOT NULL;

-- CreateTable
CREATE TABLE "SavedSong" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackingTrack" (
    "id" TEXT NOT NULL,
    "songId" TEXT,
    "name" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BackingTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedSong_userId_idx" ON "SavedSong"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedSong_userId_songId_key" ON "SavedSong"("userId", "songId");

-- CreateIndex
CREATE INDEX "BackingTrack_songId_idx" ON "BackingTrack"("songId");

-- CreateIndex
CREATE INDEX "Song_title_artist_idx" ON "Song"("title", "artist");

-- AddForeignKey
ALTER TABLE "PracticeSession" ADD CONSTRAINT "PracticeSession_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSong" ADD CONSTRAINT "SavedSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSong" ADD CONSTRAINT "SavedSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackingTrack" ADD CONSTRAINT "BackingTrack_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
