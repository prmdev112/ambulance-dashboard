"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Case = {
  id: number
  patientName: string
  patientTc: string
  caseType: "emergency" | "transfer"
  description: string
  location: string
  createdAt: string
}

export function CaseTable() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchCases()
  }, [])

  async function fetchCases() {
    setLoading(true)
    const { data, error } = await supabase.from("cases").select("*").order("createdAt", { ascending: false })

    if (error) {
      console.error("Error fetching cases:", error)
    } else {
      setCases(data || [])
    }
    setLoading(false)
  }

  const filteredCases = cases.filter(
    (case_) =>
      case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.patientTc.includes(searchTerm) ||
      case_.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <Input
        type="text"
        placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hasta Adı</TableHead>
            <TableHead>TC Kimlik No</TableHead>
            <TableHead>Vaka Tipi</TableHead>
            <TableHead>Konum</TableHead>
            <TableHead>Tarih</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Yükleniyor...
              </TableCell>
            </TableRow>
          ) : filteredCases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Vaka bulunamadı
              </TableCell>
            </TableRow>
          ) : (
            filteredCases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>{case_.patientName}</TableCell>
                <TableCell>{case_.patientTc}</TableCell>
                <TableCell>
                  <Badge variant={case_.caseType === "emergency" ? "destructive" : "secondary"}>
                    {case_.caseType === "emergency" ? "Acil" : "Nakil"}
                  </Badge>
                </TableCell>
                <TableCell>{case_.location}</TableCell>
                <TableCell>{new Date(case_.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

