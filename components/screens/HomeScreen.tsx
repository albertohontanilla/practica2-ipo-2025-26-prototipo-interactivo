"use client"

import { useState } from "react"
import { Bell, Play, Share2, ChevronRight, TrendingDown, X, Link, Camera, MessageCircle } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useSettings } from "@/context/SettingsContext"

const TrendChart = dynamic(() => import("@/components/TrendChart"), {
  ssr: false,
  loading: () => <div className="w-full h-[72px] bg-muted/50 animate-pulse rounded-xl" />
})

const factCards = [
  { icon: "🤖", color: "bg-orange-100", text: "85M empleos desplazados para 2025", stat: "85M" },
  { icon: "🌱", color: "bg-green-100", text: "97M nuevos roles de IA emergentes", stat: "97M" },
  { icon: "⚖️", color: "bg-blue-100", text: "70% buscará reskilling para 2030", stat: "70%" },
  { icon: "💡", color: "bg-amber-100", text: "La creatividad es la habilidad más demandada", stat: "#1" },
]

interface Props {
  onOpenNotifications?: () => void
  hasUnread?: boolean
  showToast?: (msg: string) => void
  onNavigate?: (tab: string) => void
  onPlayVideo?: () => void
}

export default function HomeScreen({ onOpenNotifications, hasUnread = true, showToast, onNavigate, onPlayVideo }: Props) {
  const { settings } = useSettings()
  const [showShareModal, setShowShareModal] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto px-4 py-4 lg:px-6 lg:py-5">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">8</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ODS Y NOTICIAS RECIENTES</p>
            <h1 className="text-sm font-bold text-foreground leading-tight">Actualización Semanal</h1>
          </div>
        </div>
        <button tabIndex={0} onClick={onOpenNotifications} className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notificaciones">
          <Bell className="w-5 h-5 text-foreground" />
          {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />}
        </button>
      </div>

      {/* Tarjeta de Tendencia */}
      <div className="mb-4 bg-card rounded-2xl shadow-sm border border-border p-4">
        <div className="flex items-start justify-between mb-1">
          <p className="text-xs text-muted-foreground">Tendencia de Desempleo Juvenil</p>
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            DATOS EN VIVO
          </span>
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-foreground">-2.4%</span>
          <span className="text-xs text-primary font-medium mb-1 flex items-center gap-0.5">
            <TrendingDown className="w-3.5 h-3.5" />
            Este mes
          </span>
        </div>
        <TrendChart />
      </div>

      {/* Datos Rápidos (Carrusel) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">IA y Datos Laborales</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {factCards.map((f, i) => (
            <div key={i} className="flex-shrink-0 w-60 bg-card rounded-xl border border-border px-3 py-3 flex items-center gap-3 snap-center">
              <div className={`w-10 h-10 rounded-full ${f.color} flex items-center justify-center text-lg flex-shrink-0`}>{f.icon}</div>
              <p className="text-xs text-foreground font-medium leading-tight">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historias Reales */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-2 h-2 text-primary-foreground fill-primary-foreground" />
          </div>
          <p className="text-sm font-bold text-foreground">Historias Reales</p>
        </div>

        {/* Tarjeta de Historia */}
        <div className="relative rounded-2xl overflow-hidden bg-accent shadow-md">
          <div className="relative w-full h-52">
            <Image
              src="/images/story-sarah.png"
              alt="Historia de Sarah"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>
          {/* Overlay superior */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3">
            <div className="flex items-center gap-2 bg-black/50 rounded-full px-2.5 py-1">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[11px] text-primary-foreground font-bold">S</div>
              <span className="text-white text-xs font-medium">@sarah_dev</span>
            </div>
            <button tabIndex={0} onClick={() => setShowShareModal(true)} className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center" aria-label="Compartir">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
          {/* Subtítulos */}
          {settings.subtitles && (
            <div className="absolute bottom-16 left-0 right-0 flex justify-center px-4">
              <div className="bg-black/80 rounded-lg px-3 py-1.5 max-w-[90%]">
                <p className="text-white text-xs text-center leading-snug">
                  &ldquo;Usé IA para preparar mi portafolio y conseguí 3 entrevistas en una semana.&rdquo;
                </p>
              </div>
            </div>
          )}
          {/* Overlay inferior */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white text-sm font-bold leading-tight">Cómo conseguí mi primer empleo de desarrollo usando IA.</p>
                <div className="flex gap-1 mt-1">
                  {["#CARRERA", "#IA", "#TRABAJO"].map(tag => (
                    <span key={tag} className="text-[11px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <button tabIndex={0} onClick={onPlayVideo} className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg" aria-label="Reproducir video">
                  <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner de Desafío */}
      <div className="mb-4 bg-secondary border border-border rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-foreground">¿Listo para un desafío?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Verifica tus derechos y gana XP.</p>
        </div>
        <button tabIndex={0} onClick={() => onNavigate && onNavigate("challenges")} className="bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition-opacity">
          Hacer Quiz
        </button>
      </div>

      {/* Share Modal Bottom Sheet */}
      {showShareModal && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 animate-in fade-in duration-200">
          <div className="bg-card rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-foreground">Compartir Historia</h2>
              <button tabIndex={0} onClick={() => setShowShareModal(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Compartir">
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button tabIndex={0} onClick={() => { showToast && showToast("Copiado al portapapeles"); setShowShareModal(false); }} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Link className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">Copiar Enlace</span>
              </button>
              <button tabIndex={0} onClick={() => { showToast && showToast("Abriendo WhatsApp..."); setShowShareModal(false); }} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-900" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">WhatsApp</span>
              </button>
              <button tabIndex={0} onClick={() => { showToast && showToast("Abriendo Instagram..."); setShowShareModal(false); }} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-pink-900" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">Instagram</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
