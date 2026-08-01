import { cache } from "react"
import { prisma } from "@/lib/prisma"

export const getUserPlan = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { plan: true } })
  return user?.plan ?? "FREE"
})
