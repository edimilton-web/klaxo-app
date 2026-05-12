import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ exists: false })

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  })

  return NextResponse.json({ exists: !!user })
}
