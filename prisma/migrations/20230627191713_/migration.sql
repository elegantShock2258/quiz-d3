/*
  Warnings:

  - You are about to drop the column `UserHandle` on the `USERS` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_USERS" (
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Following" TEXT NOT NULL,
    "Followers" TEXT NOT NULL,
    "QuizMade" TEXT NOT NULL,
    "QuizAttempted" TEXT NOT NULL,
    "Score" INTEGER NOT NULL,
    "ProfilePic" TEXT NOT NULL,
    "Bio" TEXT NOT NULL,
    "Username" TEXT NOT NULL PRIMARY KEY,
    "Password" TEXT NOT NULL
);
INSERT INTO "new_USERS" ("Bio", "FirstName", "Followers", "Following", "LastName", "Password", "ProfilePic", "QuizAttempted", "QuizMade", "Score", "Username") SELECT "Bio", "FirstName", "Followers", "Following", "LastName", "Password", "ProfilePic", "QuizAttempted", "QuizMade", "Score", "Username" FROM "USERS";
DROP TABLE "USERS";
ALTER TABLE "new_USERS" RENAME TO "USERS";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
