// Preenche/atualiza logoUrl em subscrições sem logo ou com URL Clearbit.
// Executar: npx tsx scripts/backfill-logos.ts
import { PrismaClient } from "@prisma/client"
import { getLogoUrlForService } from "../lib/service-logos"

const prisma = new PrismaClient()

async function main() {
  const subs = await prisma.subscription.findMany({
    where: {
      OR: [
        { logoUrl: null },
        { logoUrl: { startsWith: "https://logo.clearbit.com/" } },
      ],
    },
    select: { id: true, name: true, logoUrl: true },
  })

  console.log(`Found ${subs.length} subscription(s) to update.`)

  let updated = 0
  for (const sub of subs) {
    const logoUrl = getLogoUrlForService(sub.name)
    if (logoUrl) {
      await prisma.subscription.update({ where: { id: sub.id }, data: { logoUrl } })
      console.log(`  ✓ ${sub.name} → ${logoUrl}`)
      updated++
    } else {
      console.log(`  – ${sub.name} (no match)`)
    }
  }

  console.log(`Done. Updated ${updated}/${subs.length}.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
