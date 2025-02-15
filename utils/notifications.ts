import { createClient } from "@/utils/supabase/server"

export async function checkMaintenanceNotifications() {
  const supabase = createClient()

  const { data: ambulances, error } = await supabase
    .from("ambulances")
    .select("id, plate_number, last_maintenance")
    .lt("last_maintenance", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // 30 gün öncesi

  if (error) {
    console.error("Error fetching ambulances:", error)
    return
  }

  for (const ambulance of ambulances) {
    await supabase.from("notifications").insert({
      type: "maintenance",
      message: `${ambulance.plate_number} plakalı ambulans için bakım zamanı geldi.`,
      ambulance_id: ambulance.id,
    })
  }
}

