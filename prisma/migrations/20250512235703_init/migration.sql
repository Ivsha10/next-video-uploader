-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Archive_uuid_key" ON "Archive"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Archive_name_key" ON "Archive"("name");
