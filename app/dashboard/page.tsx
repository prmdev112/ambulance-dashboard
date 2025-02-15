import { Suspense } from "react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatisticCards } from "@/components/statistic-cards"
import { WeeklyCaseChart } from "@/components/weekly-case-chart"
import { RecentNotifications } from "@/components/recent-notifications"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Dashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <Suspense fallback={<div>Loading statistics...</div>}>
        <StatisticCards />
      </Suspense>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Case Distribution</CardTitle>
            <CardDescription>Number of cases per day for the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading chart...</div>}>
              <WeeklyCaseChart />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates on cases and organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading notifications...</div>}>
              <RecentNotifications />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

