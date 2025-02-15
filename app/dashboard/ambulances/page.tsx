import { Suspense } from "react"
import { AmbulanceTracker } from "@/components/ambulance-tracker"

export default function AmbulancesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ambulans Takibi</h1>
      <Suspense fallback={<div>Ambulanslar yükleniyor...</div>}>
        <AmbulanceTracker />
      </Suspense>
    </div>
  )
}

