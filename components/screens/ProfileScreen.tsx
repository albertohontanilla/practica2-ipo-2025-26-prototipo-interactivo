"use client"

import { useState } from "react"
import { ChevronRight, LogOut, User, Zap, Award, Sun, Type, Captions, Vibrate, X, Save, Lock, Moon, Volume2, Palette } from "lucide-react"
import { useSettings } from "@/context/SettingsContext"
import Image from "next/image"

const achievements = [
  { icon: "⚡", label: "Aprendiz Rápido", color: "bg-amber-100", desc: "Completaste tu primer módulo" },
  { icon: "🔥", label: "Racha 7 Días", color: "bg-orange-100", desc: "Entraste a la app por 7 días seguidos" },
  { icon: "📘", label: "Pro en Cursos", color: "bg-blue-100", desc: "Leíste 5 guías completas" },
  { icon: "🔒", label: "Experto Legal", color: "bg-muted", desc: "Acierta 10 preguntas de trivia", locked: true },
  { icon: "🔒", label: "Defensor", color: "bg-muted", desc: "Ayuda a un compañero en el foro", locked: true },
  { icon: "🔒", label: "Verificado", color: "bg-muted", desc: "Sube tu primer contrato", locked: true },
]

interface Props {
  showToast?: (msg: string) => void
}

export default function ProfileScreen({ showToast }: Props) {
  const { settings, user, toggle, updateSetting, updateUser } = useSettings()
  const [showAchievements, setShowAchievements] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Local state for the edit form
  const [editForm, setEditForm] = useState(user)

  const handleSaveProfile = () => {
    updateUser(editForm)
    showToast && showToast("Perfil actualizado correctamente")
    setShowEditProfile(false)
  }

  const accessibilitySettings = [
    {
      id: "darkMode" as const,
      label: "Modo Oscuro",
      desc: "Apariencia nocturna para la app",
      icon: <Moon className="w-4 h-4" />,
    },
    {
      id: "contrast" as const,
      label: "Alto Contraste",
      desc: "Mejora la legibilidad general",
      icon: <Sun className="w-4 h-4" />,
    },
    {
      id: "textSize" as const,
      label: "Tamaño de Texto",
      desc: "Ajusta la fuente para lectura fácil",
      icon: <Type className="w-4 h-4" />,
    },
    {
      id: "subtitles" as const,
      label: "Subtítulos",
      desc: "Activar subtítulos en todos los videos",
      icon: <Captions className="w-4 h-4" />,
    },
    {
      id: "narrator" as const,
      label: "Narrador de Voz",
      desc: "Lee el contenido al tocar la pantalla",
      icon: <Volume2 className="w-4 h-4" />,
    },
    {
      id: null,
      label: "Retroalimentación Háptica",
      desc: "Respuesta táctil en cada interacción",
      icon: <Vibrate className="w-4 h-4" />,
    },
  ]

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto px-4 py-4 lg:px-6 lg:py-5">
      {/* Encabezado de Perfil */}
      <div className="mb-4 bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src="/images/avatar-alex.png"
              alt="Alex Harrison"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground fill-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-black text-foreground">{user.name}</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Pro Defensor</span>
              <span className="text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Nv. {user.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logros */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Logros</h2>
          </div>
          <button tabIndex={0} onClick={() => setShowAchievements(true)} className="text-xs text-primary font-medium flex items-center gap-0.5">
            Ver Todo <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {achievements.slice(0, 4).map((a, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl border border-border ${a.locked ? "grayscale bg-muted/30" : ""}`}>
              <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center text-xl`}>
                {a.icon}
              </div>
              <p className="text-[11px] text-center text-muted-foreground font-medium leading-tight truncate w-full">{a.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración de Accesibilidad */}
      <div className="mb-4">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Configuración de Accesibilidad</p>
        <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {accessibilitySettings.map((setting) => {
            if (setting.id === "textSize") {
              return (
                <div key={setting.label} className="flex flex-col gap-2 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground flex-shrink-0">
                      {setting.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-3 px-1">
                    <span className="text-xs font-medium text-muted-foreground">a</span>
                    <input
                      type="range"
                      aria-label="Ajustar tamaño de texto"
                      min="1"
                      max="5"
                      step="1"
                      value={settings.textSize}
                      onChange={(e) => updateSetting("textSize", parseInt(e.target.value))}
                      className="flex-1 accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-lg font-bold text-foreground">A</span>
                  </div>
                </div>
              )
            }
            if (setting.id === null) {
              return (
                <div key={setting.label} className="flex flex-col gap-2 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground flex-shrink-0">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">Filtros de Color</p>
                      <p className="text-xs text-muted-foreground">Simulación visual (Daltonismo)</p>
                    </div>
                  </div>
                  <div className="mt-1">
                    <select
                      aria-label="Seleccionar filtro de color"
                      value={settings.colorFilter}
                      onChange={(e) => updateSetting("colorFilter", e.target.value as any)}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-primary"
                    >
                      <option value="none">Ninguno</option>
                      <option value="grayscale">Escala de Grises</option>
                      <option value="invert">Invertir Colores</option>
                    </select>
                  </div>
                </div>
              )
            }

            const isOn = setting.id !== null ? settings[setting.id] : false
            return (
              <div key={setting.label} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground flex-shrink-0">
                  {setting.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.desc}</p>
                </div>
                <button tabIndex={0}
                  onClick={() => setting.id !== null && toggle(setting.id as any)}
                  disabled={setting.id === null}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${isOn ? "bg-primary" : "bg-muted border border-border"} ${setting.id === null ? "opacity-40 cursor-not-allowed" : ""}`}
                  aria-label={`${isOn ? "Desactivar" : "Activar"} ${setting.label}`}
                  role="switch"
                  aria-checked={isOn}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isOn ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            )
          })}

        </div>
      </div>

      {/* Detalles de Cuenta */}
      <div className="mb-4">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button tabIndex={0} onClick={() => setShowEditProfile(true)} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-muted/50 transition-colors">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground flex-1 text-left">Detalles de la Cuenta</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Cerrar Sesión */}
      <div className="mb-4">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button tabIndex={0} onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center gap-3 px-4 py-4 text-destructive text-sm font-semibold hover:bg-muted/50 transition-colors text-left">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">Todos los Logros</h2>
            </div>
            <button tabIndex={0} onClick={() => setShowAchievements(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Logros">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/20">
            {achievements.map((a, i) => (
              <div key={i} className={`bg-card rounded-xl border border-border p-3 flex items-center gap-3 ${a.locked ? "grayscale bg-muted/30" : ""}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {a.label}
                    {a.locked && <Lock className="w-3 h-3 text-muted-foreground" />}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-right-full duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
            <h2 className="text-base font-bold text-foreground">Editar Perfil</h2>
            <button tabIndex={0} onClick={() => setShowEditProfile(false)} className="p-2 bg-muted rounded-full" aria-label="Cerrar Edición">
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image src="/images/avatar-alex.png" alt="Alex Harrison" width={96} height={96} className="w-24 h-24 rounded-full object-cover border-4 border-card shadow-sm" />
                <button tabIndex={0} className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card text-primary-foreground text-xs" aria-label="Editar foto de perfil">✏️</button>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-muted-foreground">Nombre Completo</label>
                <span className={`text-[10px] font-bold ${editForm.name.length > 30 ? "text-red-500" : "text-muted-foreground"}`}>
                  {editForm.name.length}/30
                </span>
              </div>
              <input 
                type="text" 
                value={editForm.name} 
                maxLength={30}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full bg-card border rounded-xl px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-primary ${editForm.name.length >= 30 ? "border-red-500" : "border-border"}`} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground ml-1">Correo Electrónico</label>
              <input 
                type="email" 
                value={editForm.email} 
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-primary" 
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-muted-foreground">Ubicación</label>
                <span className={`text-[10px] font-bold ${editForm.location.length > 40 ? "text-red-500" : "text-muted-foreground"}`}>
                  {editForm.location.length}/40
                </span>
              </div>
              <input 
                type="text" 
                value={editForm.location} 
                maxLength={40}
                onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                className={`w-full bg-card border rounded-xl px-4 py-3 text-sm font-medium text-foreground outline-none focus:border-primary ${editForm.location.length >= 40 ? "border-red-500" : "border-border"}`} 
              />
            </div>
          </div>
          <div className="p-4 border-t border-border bg-card">
            <button tabIndex={0} onClick={handleSaveProfile} className="w-full py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-3xl p-6 w-full max-w-xs shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
              <LogOut className="w-6 h-6 text-red-900" />
            </div>
            <h2 className="text-lg font-bold text-center text-foreground mb-2">¿Cerrar sesión?</h2>
            <p className="text-sm text-center text-muted-foreground mb-6">Tendrás que volver a ingresar tus credenciales la próxima vez que uses la aplicación.</p>
            <div className="flex gap-3">
              <button tabIndex={0} onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3 bg-muted text-foreground font-bold text-sm rounded-xl hover:bg-muted/80">
                Cancelar
              </button>
              <button tabIndex={0} onClick={() => { setShowLogoutConfirm(false); showToast && showToast("Cerrando sesión..."); setTimeout(() => window.location.reload(), 1000) }} className="flex-1 py-3 bg-destructive text-white font-bold text-sm rounded-xl hover:opacity-90 shadow-md">
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
