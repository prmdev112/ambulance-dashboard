import { Suspense } from "react"
import { CaseForm } from "@/components/case-form"
import { CaseTable } from "@/components/case-table"

export default function CasesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vaka Yönetimi</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Yeni Vaka Ekle</h2>
          <CaseForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Vaka Listesi</h2>
          <Suspense fallback={<div>Vakalar yükleniyor...</div>}>
            <CaseTable />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

