"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/utils/supabase/client"
import { QRCodeSVG } from "qrcode.react"

const invoiceSchema = z.object({
  caseId: z.number().min(1, "Vaka ID gereklidir"),
  amount: z.number().min(0, "Tutar 0'dan büyük olmalıdır"),
})

export function InvoiceGenerator() {
  const [loading, setLoading] = useState(false)
  const [qrData, setQrData] = useState<string | null>(null)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
  })

  const onSubmit = async (data: z.infer<typeof invoiceSchema>) => {
    setLoading(true)
    const { error, data: invoice } = await supabase.from("invoices").insert([data]).select().single()

    if (error) {
      toast({
        title: "Hata",
        description: "Fatura oluşturulurken bir hata oluştu.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Başarılı",
        description: "Fatura başarıyla oluşturuldu.",
      })
      setQrData(JSON.stringify(invoice))
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="caseId">Vaka ID</Label>
          <Input id="caseId" type="number" {...register("caseId", { valueAsNumber: true })} />
          {errors.caseId && <p className="text-red-500">{errors.caseId.message}</p>}
        </div>
        <div>
          <Label htmlFor="amount">Tutar</Label>
          <Input id="amount" type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Oluşturuluyor..." : "Fatura Oluştur"}
        </Button>
      </form>
      {qrData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Fatura QR Kodu</h3>
          <QRCodeSVG value={qrData} size={256} />
        </div>
      )}
    </div>
  )
}

