import { Suspense } from "react"
import { OrganizationCalendar } from "@/components/organization-calendar"

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organizasyon Takibi</h1>
      <Suspense fallback={<div>Takvim yükleniyor...</div>}>
        <OrganizationCalendar />
      </Suspense>
    </div>
  )
}

