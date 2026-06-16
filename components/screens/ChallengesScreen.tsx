"use client"

import { useState, useEffect } from "react"
import { Bell, Play, ChevronRight, Zap, Share2, CheckCircle, Circle, X, TrendingUp, TrendingDown, Factory } from "lucide-react"
import { useSettings } from "@/context/SettingsContext"

const triviaQuestions = [
  {
    category: "LEGISLACIÓN LABORAL",
    question: "¿Cuál es el máximo legal de horas laborales por semana sin horas extra?",
    options: ["35 Horas", "40 Horas", "48 Horas"],
    correct: 1,
  },
  {
    category: "OIT",
    question: "¿Qué organismo internacional establece normas laborales globales?",
    options: ["OIT", "UNESCO", "OMC"],
    correct: 0,
  },
  {
    category: "DERECHOS",
    question: "¿Es obligatorio firmar un contrato laboral por escrito en la mayoría de países?",
    options: ["Sí", "No", "Depende del sector"],
    correct: 0,
  },
  {
    category: "SALUD",
    question: "¿Quién debe proveer el equipo de protección personal (EPP)?",
    options: ["El trabajador", "El empleador", "El sindicato"],
    correct: 1,
  },
]

const initialQuickWins = [
  { id: 1, icon: <Share2 className="w-4 h-4 text-primary" />, label: "Difunde el mensaje", desc: "Comparte tu puntuación de impacto", xp: "+50 XP", xpValue: 50, done: false },
  { id: 2, icon: <CheckCircle className="w-4 h-4 text-muted-foreground" />, label: "Inicio de Sesión Diario", desc: "¡Vuelve mañana!", xp: null, xpValue: 0, done: true },
]

interface Props {
  onOpenNotifications?: () => void
  hasUnread?: boolean
  showToast?: (msg: string) => void
  onNavigate?: (tab: string) => void
}

export default function ChallengesScreen({ onOpenNotifications, hasUnread = true, showToast }: Props) {
  const { user, updateUser } = useSettings()
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({})
  const [showResult, setShowResult] = useState<Record<number, boolean>>({})
  const [showGame, setShowGame] = useState(false)
  const [gameStep, setGameStep] = useState(0) // 0: loading, 1: playing, 2: result
  const maxXp = 1000

  useEffect(() => {
    if (showGame && gameStep === 0) {
      const timer = setTimeout(() => setGameStep(1), 1500)
      return () => clearTimeout(timer)
    }
  }, [showGame, gameStep])

  const handleAnswer = (qi: number, oi: number) => {
    if (showResult[qi]) return
    setSelectedAnswers(prev => ({ ...prev, [qi]: oi }))
    setShowResult(prev => ({ ...prev, [qi]: true }))
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto px-4 py-4 lg:px-6 lg:py-5">
      {/* Encabezado */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sube de nivel completando misiones</p>
              <h1 className="text-sm font-bold text-foreground leading-tight">Retos</h1>
            </div>
          </div>
          <button tabIndex={0} onClick={onOpenNotifications} className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notificaciones">
            <Bell className="w-5 h-5 text-foreground" />
            {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />}
          </button>
        </div>
        
        {/* Fila de etiquetas */}
        <div className="flex items-center gap-1.5 pl-9">
          <span className="text-[11px] font-bold text-foreground/60 bg-muted px-2 py-1 rounded-full">Pro Defensor</span>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
            <Zap className="w-2.5 h-2.5 text-primary fill-primary" />
            <span className="text-[11px] font-bold text-primary">NIVEL 10</span>
          </div>
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">250 XP para Oro</span>
        </div>
      </div>

      {/* Reto Semanal */}
      <div className="mb-4 bg-accent rounded-2xl border border-accent p-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold text-primary-foreground bg-primary px-2.5 py-1 rounded-full tracking-[0.12em]">
            RETO SEMANAL
          </span>
          <span className="text-[11px] font-semibold text-accent-foreground uppercase tracking-[0.14em]">
            Misiones activas
          </span>
        </div>
        <h2 className="text-xl font-black text-accent-foreground leading-tight">CEO Verde</h2>
        <p className="text-xs text-accent-foreground mt-1 mb-4 leading-relaxed">Equilibra ganancias y planeta en esta simulación de decisiones con impacto real.</p>
        <button tabIndex={0} onClick={() => { setShowGame(true); setGameStep(0); }} className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg">
          <Play className="w-4 h-4 fill-primary-foreground" />
          Jugar Ahora
        </button>
      </div>

      {/* Progreso de XP */}
      <div className="mb-4 bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">Tu Progreso</p>
          <p className="text-xs font-bold text-primary">250 XP para Oro</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-black text-foreground">{user.xp.toLocaleString("es")}</span>
          <span className="text-sm text-muted-foreground">/ {maxXp.toLocaleString("es")} XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(user.xp / maxXp) * 100}%` }}
          />
        </div>
      </div>

      {/* Tiempo de Trivia */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <h2 className="text-sm font-bold text-foreground">Tiempo de Trivia</h2>
          </div>
          <button tabIndex={0} onClick={() => showToast && showToast("Cargando todas las categorías de trivia...")} className="text-xs text-primary font-medium flex items-center gap-0.5">
            Ver Todo <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {triviaQuestions.map((q, qi) => (
            <div key={qi} className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border p-4">
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{q.category}</span>
              <p className="text-xs font-semibold text-foreground mt-2 mb-3 leading-relaxed">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = selectedAnswers[qi] === oi
                  const revealed = showResult[qi]
                  const isCorrect = oi === q.correct
                  let optClass = "border-border text-foreground hover:border-primary hover:bg-primary/5"
                  if (revealed && isCorrect) optClass = "border-emerald-400 bg-emerald-50 text-emerald-900"
                  else if (revealed && selected && !isCorrect) optClass = "border-red-400 bg-red-50 text-red-900"
                  return (
                    <button tabIndex={0}
                      key={oi}
                      onClick={() => handleAnswer(qi, oi)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${optClass}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">Desliza para la siguiente pregunta</p>
      </div>

      {/* Logros Rápidos */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground mb-3">Logros Rápidos</h2>
        <div className="space-y-2">
          {initialQuickWins.map((w, i) => {
            const isDone = user.completedWins.includes(w.id)
            return (
              <button tabIndex={0} 
                key={w.id} 
                onClick={() => {
                  if (isDone) return
                  updateUser({ xp: user.xp + w.xpValue, completedWins: [...user.completedWins, w.id] })
                  showToast && showToast(`¡Logro reclamado! +${w.xpValue} XP`)
                }}
                className={`w-full text-left bg-card rounded-xl border p-3 flex items-center gap-3 transition-colors ${isDone ? "border-border opacity-60" : "border-border hover:border-primary cursor-pointer"}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? "bg-muted" : "bg-primary/10"}`}>
                  {isDone ? <CheckCircle className="w-4 h-4 text-emerald-900" /> : w.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{w.label}</p>
                  <p className="text-xs text-muted-foreground">{w.desc}</p>
                </div>
                {w.xp && !isDone && (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{w.xp}</span>
                )}
                {isDone && (
                  <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Reclamado</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Game Modal */}
      {showGame && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <h2 className="text-sm font-bold text-foreground">CEO Verde</h2>
            <button tabIndex={0} onClick={() => setShowGame(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar CEO Verde">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-accent relative overflow-hidden">
            {gameStep === 0 && (
              <div className="flex flex-col items-center text-center animate-pulse">
                <Factory className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-lg font-bold text-accent-foreground">Cargando Simulación...</h3>
                <p className="text-sm text-accent-foreground/80 mt-2">Preparando escenarios de impacto</p>
              </div>
            )}
            
            {gameStep === 1 && (
              <div className="w-full max-w-sm bg-card rounded-3xl shadow-xl border border-border p-6 flex flex-col items-center text-center animate-in slide-in-from-bottom-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Factory className="w-8 h-8 text-red-900" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-2">Planta de Carbón Antigua</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Tu fábrica más rentable está contaminando un río cercano. Actualizar los filtros costará un 20% de tus beneficios trimestrales.
                </p>
                <div className="flex gap-4 w-full">
                  <button tabIndex={0} onClick={() => setGameStep(2)} className="flex-1 py-3 px-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-900 font-bold text-sm hover:bg-red-100 transition-colors">
                    Ignorar
                  </button>
                  <button tabIndex={0} onClick={() => setGameStep(2)} className="flex-1 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
                    Actualizar
                  </button>
                </div>
              </div>
            )}

            {gameStep === 2 && (
              <div className="w-full max-w-sm bg-card rounded-3xl shadow-xl border border-border p-6 flex flex-col items-center text-center animate-in zoom-in-95">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-900" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2">¡Decisión Tomada!</h3>
                <div className="w-full grid grid-cols-2 gap-4 my-6">
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">Impacto Ambiental</p>
                    <p className="text-lg font-bold text-emerald-900 flex justify-center items-center gap-1"><TrendingUp className="w-4 h-4"/> +45%</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">Beneficios</p>
                    <p className="text-lg font-bold text-red-900 flex justify-center items-center gap-1"><TrendingDown className="w-4 h-4"/> -20%</p>
                  </div>
                </div>
                <button tabIndex={0} onClick={() => { setShowGame(false); updateUser({ xp: user.xp + 100 }); showToast && showToast("¡Simulación completada! +100 XP"); }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md">
                  Reclamar +100 XP
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
