import { X, Bell, Zap, Shield, Briefcase } from "lucide-react"

interface NotificationsPanelProps {
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    title: "¡Nueva guía disponible!",
    desc: "Actualizamos la guía de derechos de horas extra.",
    time: "Hace 10 min",
    icon: <Shield className="w-4 h-4 text-primary" />,
    color: "bg-primary/10",
    unread: true,
  },
  {
    id: 2,
    title: "¡Nivel 10 Alcanzado!",
    desc: "Has desbloqueado la insignia 'Pro Defensor'.",
    time: "Hace 2 horas",
    icon: <Zap className="w-4 h-4 text-amber-900" />,
    color: "bg-amber-100",
    unread: true,
  },
  {
    id: 3,
    title: "Oferta verificada cerca de ti",
    desc: "El Café Central busca personal de apoyo, pago validado.",
    time: "Hace 1 día",
    icon: <Briefcase className="w-4 h-4 text-emerald-900" />,
    color: "bg-emerald-100",
    unread: false,
  },
]

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background animate-in slide-in-from-bottom-full duration-300">
      {/* Cabecera */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Bell className="w-4 h-4 text-foreground" />
          </div>
          <h2 className="text-base font-bold text-foreground">Notificaciones</h2>
        </div>
        <button tabIndex={0}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Cerrar notificaciones"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Lista de Notificaciones */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`relative p-4 rounded-2xl border ${n.unread ? "bg-card border-primary/30 shadow-sm" : "bg-muted border-transparent"}`}
            >
              {n.unread && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
              )}
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${n.color}`}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className={`text-sm font-bold truncate ${n.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {n.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {n.desc}
                  </p>
                  <p className="text-[11px] font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
                    {n.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estado Vacío / Final */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">No tienes más notificaciones.</p>
        </div>
      </div>
    </div>
  )
}
