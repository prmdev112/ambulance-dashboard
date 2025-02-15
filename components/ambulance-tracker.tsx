"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Ambulance = {
  id: number
  plateNumber: string
  status: "active" | "maintenance" | "inactive"
  lastMaintenance: string
  equipment: string[]
}

export function AmbulanceTracker() {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchAmbulances()
  }, [])

  async function fetchAmbulances() {
    const { data, error } = await supabase.from("ambulances").select("*")

    if (error) {
      console.error("Error fetching ambulances:", error)
    } else {
      setAmbulances(data || [])
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ambulances.map((ambulance) => (
        <Card key={ambulance.id}>
          <CardHeader>
            <CardTitle>{ambulance.plateNumber}</CardTitle>
            <CardDescription>
              <Badge
                variant={
                  ambulance.status === "active"
                    ? "success"
                    : ambulance.status === "maintenance"
                      ? "warning"
                      : "destructive"
                }
              >
                {ambulance.status === "active" ? "Aktif" : ambulance.status === "maintenance" ? "Bakımda" : "İnaktif"}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Son Bakım: {new Date(ambulance.lastMaintenance).toLocaleDateString()}</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="equipment">
                <AccordionTrigger>Donanım Listesi</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4">
                    {ambulance.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

