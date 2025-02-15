import { createClient } from "@/utils/supabase/server"

async function getRecentNotifications() {
  const supabase = createClient()

  // TODO: Fetch real notifications from Supabase
  // This is a placeholder implementation
  return [
    { id: 1, message: "New emergency case reported", time: "5 minutes ago" },
    { id: 2, message: "Ambulance #3 maintenance completed", time: "1 hour ago" },
    { id: 3, message: "Monthly report generated", time: "3 hours ago" },
    { id: 4, message: "New organization added", time: "1 day ago" },
    { id: 5, message: "System update scheduled", time: "2 days ago" },
  ]
}

export async function RecentNotifications() {
  const notifications = await getRecentNotifications()

  return (
    <ul className="space-y-4">
      {notifications.map((notification) => (
        <li key={notification.id} className="flex justify-between items-center">
          <span>{notification.message}</span>
          <span className="text-sm text-muted-foreground">{notification.time}</span>
        </li>
      ))}
    </ul>
  )
}

