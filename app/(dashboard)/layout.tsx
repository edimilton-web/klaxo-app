import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Toaster } from "sonner"
import { OneSignalInit } from "@/components/onesignal-init"
import { SplashScreen } from "@/components/splash-screen"
import WelcomeSplash from "@/components/welcome-splash"
import { countRenewalsInCurrentMonth } from "@/lib/billing"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const upcoming = await countRenewalsInCurrentMonth(session.user.id)
  const subtitle =
    upcoming > 0 ? `${upcoming} renewal${upcoming === 1 ? "" : "s"} coming up this month` : undefined

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <WelcomeSplash name={session.user.name} subtitle={subtitle} />
      <SplashScreen />
      <Sidebar user={session.user} />
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
          {children}
        </div>
      </main>
      <Toaster richColors position="top-right" />
      <OneSignalInit />
    </div>
  )
}
