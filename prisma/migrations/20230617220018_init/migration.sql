-- CreateTable
CREATE TABLE "USERS" (
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

-- CreateTable
CREATE TABLE "SESSIONS" (
    "sessioncookie" TEXT NOT NULL PRIMARY KEY
);
