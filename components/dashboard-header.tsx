import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <ModeToggle />
    </div>
  )
}

