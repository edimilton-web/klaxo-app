-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN "lastPaidAt" TIMESTAMP(3),
ADD COLUMN "paymentReminderSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "snoozedUntil" TIMESTAMP(3);
