"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Ambulance, Calendar, FileText, Home, Map, Settings } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Ambulance, label: "Cases", href: "/dashboard/cases" },
  { icon: Calendar, label: "Organizations", href: "/dashboard/organizations" },
  { icon: Map, label: "Ambulance Tracker", href: "/dashboard/ambulances" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-semibold">Ambulance Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg ${
                  pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

