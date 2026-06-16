"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Settings {
  contrast: boolean
  textSize: number
  subtitles: boolean
  darkMode: boolean
  colorFilter: "none" | "grayscale" | "invert"
  narrator: boolean
}

interface UserProfile {
  name: string
  email: string
  location: string
  handle: string
  xp: number
  level: number
  showLevelUp: boolean
  completedWins: number[]
}

interface SettingsContextValue {
  settings: Settings
  user: UserProfile
  toggle: (key: "contrast" | "subtitles" | "darkMode" | "narrator") => void
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  updateUser: (profile: Partial<UserProfile>) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    contrast: false,
    textSize: 1,
    subtitles: false,
    darkMode: false,
    colorFilter: "none",
    narrator: false,
  })

  const [user, setUser] = useState<UserProfile>({
    name: "Alex Harrison",
    email: "alex.h@ejemplo.com",
    location: "Madrid, España",
    handle: "@alex_h",
    xp: 750,
    level: 10,
    showLevelUp: false,
    completedWins: [2], // El logro de inicio de sesión ya está completado
  })

  const toggle = (key: "contrast" | "subtitles" | "darkMode" | "narrator") => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateUser = (profile: Partial<UserProfile>) => {
    setUser(prev => {
      const nextUser = { ...prev, ...profile }
      // Lógica de subida de nivel
      if (nextUser.xp >= 1000) {
        nextUser.xp = nextUser.xp - 1000
        nextUser.level = nextUser.level + 1
        nextUser.showLevelUp = true
      }
      return nextUser
    })
  }

  return (
    <SettingsContext.Provider value={{ settings, user, toggle, updateSetting, updateUser }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}
