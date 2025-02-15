"use client"

import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { createClient } from "@/utils/supabase/client"
import { toast } from "@/components/ui/use-toast"

type Organization = {
  id: number
  title: string
  start: string
  end: string
}

export function OrganizationCalendar() {
  const [events, setEvents] = useState<Organization[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchOrganizations()
  }, [])

  async function fetchOrganizations() {
    const { data, error } = await supabase.from("organizations").select("*")

    if (error) {
      console.error("Error fetching organizations:", error)
    } else {
      setEvents(data || [])
    }
  }

  const handleEventAdd = async (selectInfo: any) => {
    const title = prompt("Organizasyon başlığını girin:")
    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      }

      const { error } = await supabase.from("organizations").insert([newEvent])

      if (error) {
        toast({
          title: "Hata",
          description: "Organizasyon eklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } else {
        setEvents([...events, { ...newEvent, id: Date.now() }])
        toast({
          title: "Başarılı",
          description: "Organizasyon başarıyla eklendi.",
        })
      }
    }
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={events}
      select={handleEventAdd}
      eventContent={renderEventContent}
      locale="tr"
    />
  )
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

