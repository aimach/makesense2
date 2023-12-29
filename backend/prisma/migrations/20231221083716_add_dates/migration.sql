/*
  Warnings:

  - Added the required column `finalDecision` to the `Decision` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstDeadline` to the `Decision` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Decision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "firstContent" TEXT NOT NULL,
    "secondContent" TEXT NOT NULL,
    "utility" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "pros" TEXT NOT NULL,
    "cons" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstDeadline" DATETIME NOT NULL,
    "firstDecision" DATETIME,
    "secondDeadline" DATETIME,
    "finalDecision" DATETIME NOT NULL,
    "statusId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Decision_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Decision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Decision" ("cons", "context", "createdAt", "firstContent", "id", "pros", "secondContent", "statusId", "title", "updatedAt", "userId", "utility") SELECT "cons", "context", "createdAt", "firstContent", "id", "pros", "secondContent", "statusId", "title", "updatedAt", "userId", "utility" FROM "Decision";
DROP TABLE "Decision";
ALTER TABLE "new_Decision" RENAME TO "Decision";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
