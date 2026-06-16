"use client"

import { Bell, Search, ChevronRight, Shield, AlertTriangle, Briefcase, BadgeCheck, Sparkles, X, Send, BookOpen } from "lucide-react"
import { useSettings } from "@/context/SettingsContext"

const tools = [
  {
    id: 1,
    icon: <Shield className="w-5 h-5 text-primary" />,
    label: "Tus Derechos",
    badge: "ESENCIAL",
    desc: "Conoce tu valor. Accede a guías sobre salario mínimo, períodos de descanso y conceptos básicos de contrato.",
    cta: "Explorar Guías +",
    dark: false,
  },
  {
    id: 2,
    icon: <AlertTriangle className="w-5 h-5 text-primary-foreground" />,
    label: "Guía Anti-Explotación",
    badge: null,
    desc: "Identifica las señales. Aprende cómo detectar y denunciar de forma segura el abuso laboral o las infracciones de seguridad.",
    cta: "Obtener Ayuda",
    dark: true,
  },
]

const jobs = [
  { title: "Barista", company: "Café Centro · Tiempo completo", pay: "$18/hr", badge: "VERIFICADO", badgeColor: "text-emerald-900 bg-emerald-100" },
  { title: "Socio de Reparto", company: "Express Local · Flexible", pay: "$32/hr", badge: "NUEVO", badgeColor: "text-primary bg-primary/10" },
  { title: "Cajero", company: "Supermercados Día · Medio tiempo", pay: "$16/hr", badge: "SEGURO", badgeColor: "text-blue-900 bg-blue-100" },
  { title: "Atención al Cliente", company: "Tech Support Inc · Remoto", pay: "$22/hr", badge: "VERIFICADO", badgeColor: "text-emerald-900 bg-emerald-100" },
  { title: "Ayudante de Cocina", company: "Restaurante El Sol · Fines de semana", pay: "$20/hr", badge: "NUEVO", badgeColor: "text-primary bg-primary/10" },
]

import { useState } from "react"

interface Props {
  onOpenNotifications?: () => void
  hasUnread?: boolean
  showToast?: (msg: string) => void
  onNavigate?: (tab: string) => void
}

export default function ActionScreen({ onOpenNotifications, hasUnread = true, showToast }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showJobBoard, setShowJobBoard] = useState(false)
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [showSupportChat, setShowSupportChat] = useState(false)
  const { user } = useSettings()

  const filteredTools = tools.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredJobs = jobs.slice(0, 2).filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto px-4 py-4 lg:px-6 lg:py-5">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Potenciando tu vida laboral</p>
            <h1 className="text-sm font-bold text-foreground leading-tight">El Conocimiento es Poder</h1>
          </div>
        </div>
        <button tabIndex={0} onClick={onOpenNotifications} className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notificaciones">
          <Bell className="w-5 h-5 text-foreground" />
          {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />}
        </button>
      </div>

      {/* Búsqueda */}
      <div className="mb-4">
        <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 border border-border">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            aria-label="Buscar derechos, guías o empleos"
            placeholder="Buscar derechos, guías o empleos..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground flex-1 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Centro de Acción */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Centro de Acción</h2>
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">8 HERRAMIENTAS</span>
        </div>



        {/* Tarjetas de herramientas */}
        <div className="space-y-3">
          {filteredTools.length > 0 ? filteredTools.map(tool => (
            <div
              key={tool.id}
              className={`rounded-2xl p-4 border ${tool.dark ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border"}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${tool.dark ? "bg-white/10" : "bg-primary/10"}`}>
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-sm font-bold ${tool.dark ? "text-accent-foreground" : "text-foreground"}`}>{tool.label}</p>
                    {tool.badge && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${tool.dark ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed mb-3 ${tool.dark ? "text-accent-foreground/80" : "text-muted-foreground"}`}>{tool.desc}</p>
                  <button tabIndex={0} 
                    onClick={() => tool.dark ? setShowSupportChat(true) : setShowGuideModal(true)}
                    className={`text-xs font-bold px-4 py-2 rounded-full transition-opacity hover:opacity-90 ${tool.dark ? "bg-primary text-primary-foreground" : "border border-primary text-primary"}`}>
                    {tool.cta}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-xs text-muted-foreground text-center py-4">No se encontraron herramientas.</p>
          )}
        </div>
      </div>

      {/* Bolsa de Empleo Segura */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Bolsa de Empleo Segura</h2>
          </div>
          <button tabIndex={0} onClick={() => setShowJobBoard(true)} className="text-xs text-primary font-medium flex items-center gap-0.5">
            Ver Todo <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{job.title}</p>
                <p className="text-xs text-muted-foreground truncate">{job.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-foreground">{job.pay}</p>
                <div className="flex items-center gap-1 justify-end">
                  <BadgeCheck className="w-3 h-3 text-emerald-900" />
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${job.badgeColor}`}>{job.badge}</span>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-xs text-muted-foreground text-center py-4">No se encontraron empleos.</p>
          )}
        </div>

        {/* Consejo */}
        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">Consejo:</span> Guarda siempre una copia de tu contrato firmado en un lugar seguro. Usa nuestra herramienta &quot;Bóveda&quot; para compartir fotos del mismo.
          </p>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Support Chat Modal */}
      {showSupportChat && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full" />
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">Soporte Legal</h2>
                <p className="text-[11px] text-emerald-900 font-medium">Agente Conectado</p>
              </div>
            </div>
            <button tabIndex={0} onClick={() => setShowSupportChat(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Chat">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/30">
            <div className="flex justify-center">
              <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">HOY 10:41 AM</span>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">🤖</div>
              <div className="bg-card p-3 rounded-2xl rounded-tl-sm border border-border max-w-[85%] shadow-sm">
                <p className="text-xs text-foreground leading-relaxed">Hola {user.name.split(" ")[0]}, veo que estás consultando sobre horas extra. ¿Quieres contactar a un asesor humano?</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-card border-t border-border flex gap-2">
            <input type="text" placeholder="Escribe tu mensaje..." className="flex-1 bg-muted rounded-full px-4 text-xs outline-none border border-transparent focus:border-primary" />
            <button tabIndex={0} onClick={() => {showToast && showToast("Mensaje enviado"); setShowSupportChat(false)}} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" aria-label="Enviar mensaje">
              <Send className="w-4 h-4 text-primary-foreground ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Índice de Guías</h2>
            </div>
            <button tabIndex={0} onClick={() => setShowGuideModal(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Índice de Guías">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {["Salario Mínimo Legal", "Períodos de Descanso", "Conceptos Básicos de Contrato", "Tipos de Despido"].map((tema, i) => (
              <button tabIndex={0} key={i} onClick={() => {showToast && showToast("Abriendo guía..."); setShowGuideModal(false)}} className="w-full flex items-center justify-between bg-card border border-border p-4 rounded-xl hover:border-primary transition-colors text-left">
                <span className="text-sm font-bold text-foreground">{tema}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Job Board Modal */}
      {showJobBoard && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Bolsa de Empleo Segura</h2>
            </div>
            <button tabIndex={0} onClick={() => setShowJobBoard(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Bolsa de Empleo">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-muted/20">
            {jobs.map((job, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{job.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{job.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-foreground">{job.pay}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <BadgeCheck className="w-3 h-3 text-emerald-900" />
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${job.badgeColor}`}>{job.badge}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">No hay más empleos disponibles en tu zona.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
