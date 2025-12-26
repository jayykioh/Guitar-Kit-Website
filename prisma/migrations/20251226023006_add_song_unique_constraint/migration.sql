/*
  Warnings:

  - A unique constraint covering the columns `[userId,title,artist]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_userId_title_artist_key" ON "Song"("userId", "title", "artist");
