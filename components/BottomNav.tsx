"use client"

import { Home, Zap, Trophy, User } from "lucide-react"

type Tab = "home" | "action" | "challenges" | "profile"

const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home className="w-5 h-5" />, label: "Inicio" },
  { id: "action", icon: <Zap className="w-5 h-5" />, label: "Acción" },
  { id: "challenges", icon: <Trophy className="w-5 h-5" />, label: "Retos" },
  { id: "profile", icon: <User className="w-5 h-5" />, label: "Perfil" },
]

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="flex-shrink-0 bg-card border-t border-border px-2 py-2 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              tabIndex={0}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`Navegar a ${tab.label}`}
            >
              <div className={`relative ${isActive ? "scale-110" : ""} transition-transform`}>
                {tab.icon}
                {tab.id === "challenges" && isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span className={`text-[11px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
