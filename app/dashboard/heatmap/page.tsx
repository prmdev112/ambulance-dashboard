import dynamic from "next/dynamic"

const CaseHeatmap = dynamic(() => import("@/components/case-heatmap").then((mod) => mod.CaseHeatmap), { ssr: false })

export default function HeatmapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vaka Yoğunluk Haritası</h1>
      <CaseHeatmap />
    </div>
  )
}

