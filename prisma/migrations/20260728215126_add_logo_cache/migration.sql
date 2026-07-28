-- CreateTable
CREATE TABLE "LogoCache" (
    "domain" TEXT NOT NULL,
    "imageData" BYTEA NOT NULL,
    "contentType" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogoCache_pkey" PRIMARY KEY ("domain")
);
