import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  alertDaysBefore: z.number().int().min(1).max(30).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true, email: true, alertDaysBefore: true, plan: true } })
  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })

  const body = await req.json()
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })

  const { name, email, alertDaysBefore, currentPassword, newPassword } = parsed.data

  if (alertDaysBefore !== undefined) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } })
    if (user?.plan !== "PRO") {
      return NextResponse.json({ error: "Pro feature only", code: "PRO_REQUIRED" }, { status: 403 })
    }
  }

  const updateData: Record<string, unknown> = {}
  if (name) updateData.name = name
  if (email) updateData.email = email
  if (alertDaysBefore) updateData.alertDaysBefore = alertDaysBefore

  if (newPassword && currentPassword) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { password: true } })
    if (!user?.password) return NextResponse.json({ error: "OAuth account — no password set", code: "NO_PASSWORD" }, { status: 400 })
    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return NextResponse.json({ error: "Current password is incorrect", code: "WRONG_PASSWORD" }, { status: 400 })
    updateData.password = await bcrypt.hash(newPassword, 12)
  }

  await prisma.user.update({ where: { id: session.user.id }, data: updateData })
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 })
  await prisma.user.delete({ where: { id: session.user.id } })
  return NextResponse.json({ ok: true })
}
