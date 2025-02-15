import { NextResponse } from "next/server"
import { checkMaintenanceNotifications } from "@/utils/notifications"

export const dynamic = "force-dynamic"

export async function GET() {
  await checkMaintenanceNotifications()
  return NextResponse.json({ message: "Maintenance check completed" })
}

