"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"

const caseSchema = z.object({
  patientName: z.string().min(2, "Hasta adı en az 2 karakter olmalıdır"),
  patientTc: z.string().length(11, "TC Kimlik No 11 haneli olmalıdır"),
  caseType: z.enum(["emergency", "transfer"]),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  location: z.string().min(5, "Konum en az 5 karakter olmalıdır"),
  ambulanceId: z.number().min(1, "Lütfen bir ambulans seçin"),
})

export function CaseForm() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(caseSchema),
  })

  const { data: ambulances, isLoading: isLoadingAmbulances } = useQuery({
    queryKey: ["ambulances"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ambulances").select("id, plate_number").eq("status", "active")
      if (error) throw error
      return data
    },
  })

  const onSubmit = async (data: z.infer<typeof caseSchema>) => {
    setLoading(true)
    // Ambulans mevcudiyetini kontrol et
    const { data: ambulanceCheck, error: ambulanceError } = await supabase
      .from("ambulances")
      .select("id")
      .eq("id", data.ambulanceId)
      .eq("status", "active")
      .single()

    if (ambulanceError || !ambulanceCheck) {
      toast({
        title: "Hata",
        description: "Seçilen ambulans mevcut değil veya aktif durumda değil.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const { error } = await supabase.from("cases").insert([data])

    if (error) {
      toast({
        title: "Hata",
        description: "Vaka eklenirken bir hata oluştu.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Başarılı",
        description: "Vaka başarıyla eklendi.",
      })
      reset()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="patientName">Hasta Adı</Label>
        <Input id="patientName" {...register("patientName")} />
        {errors.patientName && <p className="text-red-500">{errors.patientName.message}</p>}
      </div>
      <div>
        <Label htmlFor="patientTc">TC Kimlik No</Label>
        <Input id="patientTc" {...register("patientTc")} />
        {errors.patientTc && <p className="text-red-500">{errors.patientTc.message}</p>}
      </div>
      <div>
        <Label htmlFor="caseType">Vaka Tipi</Label>
        <Select onValueChange={(value) => register("caseType").onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Vaka tipi seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="emergency">Acil</SelectItem>
            <SelectItem value="transfer">Nakil</SelectItem>
          </SelectContent>
        </Select>
        {errors.caseType && <p className="text-red-500">{errors.caseType.message}</p>}
      </div>
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="location">Konum</Label>
        <Input id="location" {...register("location")} />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>
      <div>
        <Label htmlFor="ambulanceId">Ambulans</Label>
        <Select
          onValueChange={(value) => register("ambulanceId").onChange({ target: { value: Number.parseInt(value) } })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ambulans seçin" />
          </SelectTrigger>
          <SelectContent>
            {isLoadingAmbulances ? (
              <SelectItem value="0">Yükleniyor...</SelectItem>
            ) : ambulances?.length ? (
              ambulances.map((ambulance) => (
                <SelectItem key={ambulance.id} value={ambulance.id.toString()}>
                  {ambulance.plate_number}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="0">Uygun ambulans yok</SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.ambulanceId && <p className="text-red-500">{errors.ambulanceId.message}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Ekleniyor..." : "Vaka Ekle"}
      </Button>
    </form>
  )
}

