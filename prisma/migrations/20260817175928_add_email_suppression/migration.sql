-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailSuppressReason" TEXT,
ADD COLUMN     "emailSuppressedAt" TIMESTAMP(3);

