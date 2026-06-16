"use client"

import { useState, useEffect } from "react"
import { Zap, Trophy } from "lucide-react"
import HomeScreen from "@/components/screens/HomeScreen"
import ActionScreen from "@/components/screens/ActionScreen"
import ChallengesScreen from "@/components/screens/ChallengesScreen"
import ProfileScreen from "@/components/screens/ProfileScreen"
import BottomNav from "@/components/BottomNav"
import NotificationsPanel from "@/components/NotificationsPanel"
import { SettingsProvider, useSettings } from "@/context/SettingsContext"

type Tab = "home" | "action" | "challenges" | "profile"

function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState(false)
  const [loading, setLoading] = useState(true)
  const { settings, user, updateUser } = useSettings()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab
    if (["home", "action", "challenges", "profile"].includes(hash)) {
      setActiveTab(hash)
    }
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      window.history.replaceState(null, '', `#${activeTab}`)
    }
  }, [activeTab, loading])

  useEffect(() => {
    if (!settings.narrator) {
      window.speechSynthesis.cancel()
      return
    }
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let textToRead = target.getAttribute("aria-label")
      if (!textToRead) {
        const elementWithText = target.closest('[aria-label], button, a, h1, h2, h3, p, span, div.bg-card')
        if (elementWithText) {
           textToRead = elementWithText.getAttribute("aria-label") || (elementWithText as HTMLElement).innerText
        }
      }
      if (textToRead && textToRead.trim().length > 0) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(textToRead.trim().substring(0, 150))
        window.speechSynthesis.speak(utterance)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [settings.narrator])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleOpenNotifications = () => {
    setShowNotifications(true)
    setHasUnread(false)
  }

  const commonProps = {
    onOpenNotifications: handleOpenNotifications,
    hasUnread,
    showToast,
    onNavigate: (tab: Tab) => setActiveTab(tab),
    onPlayVideo: () => setPlayingVideo(true),
  }

  if (loading) {
    return (
      <main className="h-screen overflow-hidden bg-muted flex flex-col items-center justify-center py-8 px-4">
        <div
          className={[
            "relative bg-card rounded-[2.8rem] shadow-2xl border-4 border-foreground/10 overflow-hidden flex flex-col w-full max-w-[420px] md:max-w-[460px] items-center justify-center",
            settings.darkMode ? "dark" : "",
          ].join(" ")}
          style={{ height: "min(860px, calc(100vh - 4rem))" }}
        >
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl">
              <Zap className="w-10 h-10 text-primary-foreground fill-primary-foreground" />
            </div>
            <h1 className="text-2xl font-black text-foreground">App ODS 8</h1>
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mt-4" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen overflow-hidden bg-muted flex flex-col items-center justify-center py-8 px-4">
      {/* Phone shell — settings classes applied here so they scope inside the phone */}
      <div
        className={[
          "relative bg-card rounded-[2.8rem] shadow-2xl border-4 border-foreground/10 overflow-hidden flex flex-col w-full max-w-[420px] md:max-w-[460px]",
          settings.darkMode ? "dark" : "",
          settings.contrast ? "high-contrast" : "",
          settings.colorFilter !== "none" ? `filter-${settings.colorFilter}` : "",
          settings.textSize > 1 ? `text-size-${settings.textSize}` : "",
        ].join(" ")}
        style={{ height: "min(860px, calc(100vh - 4rem))" }}
      >
        {/* Status bar / Dynamic Island */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 h-10 bg-card relative z-10">
          <span className="text-[11px] font-semibold text-foreground">9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-6 bg-foreground rounded-full" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 items-end h-3">
              {[3, 5, 7, 9].map((h, i) => (
                <div key={i} className="w-[3px] bg-foreground rounded-sm" style={{ height: `${h}px`, opacity: i < 3 ? 1 : 0.25 }} />
              ))}
            </div>
            <div className="w-5 h-3 border-2 border-foreground rounded-[3px] relative">
              <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1.5 bg-foreground rounded-[1px]" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-foreground/50 rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Screen content area */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
          <div className="flex-1 overflow-y-auto min-h-0 relative">
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "home" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
              <HomeScreen {...commonProps} />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "action" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
              <ActionScreen {...commonProps} />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "challenges" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
              <ChallengesScreen {...commonProps} />
            </div>
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "profile" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
              <ProfileScreen showToast={showToast} />
            </div>
          </div>
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Home indicator */}
        <div className="flex-shrink-0 flex justify-center py-2 bg-card">
          <div className="w-28 h-1 bg-foreground/20 rounded-full" />
        </div>

        {/* Notifications Panel Overlay */}
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}

        {/* Global Toast */}
        {toastMessage && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-full shadow-xl z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {toastMessage}
          </div>
        )}

        {/* Video Overlay Modal */}
        {playingVideo && (
          <div className="absolute inset-0 z-[100] bg-black flex flex-col animate-in slide-in-from-bottom-full duration-300">
            <div className="p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">@sarah_dev</p>
                  <p className="text-white/60 text-[10px]">EN VIVO</p>
                </div>
              </div>
              <button onClick={() => setPlayingVideo(false)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white" aria-label="Cerrar video">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 relative">
              <img src="/images/story-sarah.png" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Video" />
              {/* Progress Bar */}
              <div className="absolute top-0 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3 animate-[progress_3s_linear]" />
              </div>
              
              {settings.subtitles && (
                <div className="absolute bottom-20 left-0 right-0 flex justify-center px-6">
                  <div className="bg-black/80 rounded-xl px-4 py-3">
                    <p className="text-white text-sm text-center font-medium leading-relaxed">
                      "Usé IA para preparar mi portafolio y conseguí 3 entrevistas en una semana. ¡Es increíble!"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Level Up Overlay Modal */}
        {user.showLevelUp && (
          <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-black/80 px-6 animate-in fade-in zoom-in duration-300">
            <div className="bg-card w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden border border-border">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-200/20 to-transparent" />
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
                <Trophy className="w-12 h-12 text-amber-500" />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-2 relative z-10">¡Nivel {user.level}!</h2>
              <p className="text-sm text-muted-foreground mb-8 relative z-10 leading-relaxed">
                ¡Enhorabuena! Has alcanzado un nuevo nivel de impacto. Sigue completando retos y aprendiendo para desbloquear más logros.
              </p>
              <button 
                onClick={() => updateUser({ showLevelUp: false })}
                className="w-full py-4 bg-primary text-primary-foreground font-bold text-base rounded-2xl shadow-lg hover:opacity-90 transition-opacity relative z-10"
              >
                ¡Genial!
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  )
}
