import { PrismaClient } from "@prisma/client"
import { advanceUntilFuture } from "../lib/billing"

const prisma = new PrismaClient()
const APPLY = process.argv.includes("--apply")

async function main() {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const overdue = await prisma.subscription.findMany({
    where: { status: "ACTIVE", nextBillingDate: { lt: today } },
    orderBy: { nextBillingDate: "asc" },
    include: { user: { select: { email: true } } },
  })

  if (overdue.length === 0) {
    console.log("Nenhuma subscrição ativa com data no passado. Nada a fazer.")
    return
  }

  const rows = overdue.map((sub) => {
    const { date, cycles } = advanceUntilFuture(sub.nextBillingDate, sub.billingCycle, today)
    return {
      subscription: sub.name,
      user: sub.user.email,
      billingCycle: sub.billingCycle,
      currentDate: sub.nextBillingDate.toISOString().slice(0, 10),
      newDate: date.toISOString().slice(0, 10),
      cyclesAdvanced: cycles,
      id: sub.id,
    }
  })

  console.table(
    rows.map(({ subscription, user, billingCycle, currentDate, newDate, cyclesAdvanced }) => ({
      subscription,
      user,
      billingCycle,
      currentDate,
      newDate,
      cyclesAdvanced,
    }))
  )

  if (!APPLY) {
    console.log(`\nPREVIEW ONLY — ${rows.length} subscrição(ões) seriam atualizadas. Nenhuma escrita feita.`)
    console.log("Corre com --apply para executar.")
    return
  }

  console.log(`\nA aplicar ${rows.length} atualizações...`)
  for (const row of rows) {
    await prisma.subscription.update({
      where: { id: row.id },
      data: { nextBillingDate: new Date(row.newDate), paymentReminderSent: false },
    })
    console.log(`✓ ${row.subscription} (${row.user}): ${row.currentDate} -> ${row.newDate}`)
  }
  console.log("Concluído.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
