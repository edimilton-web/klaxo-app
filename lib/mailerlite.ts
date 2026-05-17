export async function addSubscriberToMailerLite({
  email,
  name,
}: {
  email: string
  name: string
}): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY
  const groupId = process.env.MAILERLITE_GROUP_ID

  if (!apiKey || !groupId) {
    console.warn("[MailerLite] MAILERLITE_API_KEY or MAILERLITE_GROUP_ID not set — skipping")
    return
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      fields: { name },
      groups: [groupId],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "(no body)")
    throw new Error(`MailerLite API responded ${res.status}: ${body}`)
  }
}
