-- CreateEnum
CREATE TYPE "result" AS ENUM ('Accepted', 'Failed', 'TLE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contests" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sampleTest" JSONB NOT NULL,
    "hiddenTest" JSONB NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "memoryLimit" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "testCases_P" INTEGER NOT NULL,
    "executionTime" INTEGER NOT NULL,
    "memoryUsed" INTEGER NOT NULL,
    "status" "result" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Contests_id_key" ON "Contests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_id_key" ON "Submissions"("id");

-- AddForeignKey
ALTER TABLE "Contests" ADD CONSTRAINT "Contests_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
