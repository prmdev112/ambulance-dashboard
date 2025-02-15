"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { createClient } from "@/utils/supabase/client"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

type Case = {
  id: number
  location: string
  patientName: string
  caseType: string
}

export function CaseHeatmap() {
  const [cases, setCases] = useState<Case[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    const { data, error } = await supabase.from("cases").select("id, location, patient_name, case_type")

    if (error) {
      console.error("Error fetching cases:", error)
    } else {
      setCases(data || [])
    }
  }

  if (typeof window === "undefined") {
    return null
  }

  return (
    <MapContainer center={[41.0082, 28.9784]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cases.map((case_) => {
        const [lat, lng] = case_.location.split(",").map(Number)
        return (
          <Marker key={case_.id} position={[lat, lng]}>
            <Popup>
              <div>
                <h3>{case_.patientName}</h3>
                <p>Vaka Tipi: {case_.caseType}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

