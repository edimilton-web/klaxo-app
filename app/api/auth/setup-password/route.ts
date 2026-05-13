import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(100),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 })
  }

  const { token, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { setupToken: token } })

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token", code: "INVALID_TOKEN" }, { status: 400 })
  }

  if (user.setupTokenExpiry && user.setupTokenExpiry < new Date()) {
    return NextResponse.json({ error: "Token expired", code: "TOKEN_EXPIRED" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      emailVerified: new Date(),
      setupToken: null,
      setupTokenExpiry: null,
    },
  })

  return NextResponse.json({ ok: true, email: user.email })
}
