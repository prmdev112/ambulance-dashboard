import { InvoiceGenerator } from "@/components/invoice-generator"

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fatura Oluşturma</h1>
      <InvoiceGenerator />
    </div>
  )
}

