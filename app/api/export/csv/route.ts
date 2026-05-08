import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } })
  if (user?.plan !== "PRO") {
    return NextResponse.json({ error: "Pro feature only", code: "PRO_REQUIRED" }, { status: 403 })
  }

  const subscriptions = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  })

  const headers = ["name", "amount", "currency", "amountEUR", "billingCycle", "category", "nextBillingDate", "status"]
  const rows = subscriptions.map((s) => [
    `"${s.name.replace(/"/g, '""')}"`,
    s.amount.toString(),
    s.currency,
    s.amountEur?.toString() ?? "",
    s.billingCycle,
    s.category ?? "",
    s.nextBillingDate.toISOString().split("T")[0],
    s.status,
  ])

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="klaxo-subscriptions-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  })
}
