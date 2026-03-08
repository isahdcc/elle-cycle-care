import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, Clock, Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const consultas = [
  { paciente: "Maria Silva", data: "14 jun — 10:00", status: "pendente" },
  { paciente: "Ana Costa", data: "15 jun — 14:00", status: "confirmada" },
  { paciente: "Julia Santos", data: "16 jun — 09:00", status: "pendente" },
];

const ClinicaPainel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-foreground">Painel da Clínica</h1>
      <p className="text-sm text-muted-foreground mt-1">Clínica Saúde da Mulher</p>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[
          { icon: Calendar, label: "Agendadas", count: 5, color: "gradient-primary" },
          { icon: Clock, label: "Pendentes", count: 2, color: "bg-accent" },
          { icon: MessageSquare, label: "Chats", count: 3, color: "bg-secondary" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl p-3 shadow-card border border-border text-center">
            <div className={`w-10 h-10 rounded-full ${s.color} mx-auto flex items-center justify-center mb-2`}>
              <s.icon className={`w-5 h-5 ${s.color.includes("gradient") ? "text-primary-foreground" : "text-secondary-foreground"}`} />
            </div>
            <p className="font-display font-bold text-lg text-foreground">{s.count}</p>
            <p className="text-[10px] text-muted-foreground font-display">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display font-bold text-foreground mt-8 mb-4">Consultas</h2>
      <div className="space-y-3">
        {consultas.map((c, i) => (
          <motion.div
            key={c.paciente}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-foreground text-sm">{c.paciente}</h3>
              <span className={`text-[10px] font-display font-semibold px-2 py-1 rounded-full ${
                c.status === "confirmada" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
              }`}>
                {c.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{c.data}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="hero" className="flex-1 text-xs" onClick={() => toast.success("Consulta aceita!")}>
                <Check className="w-3 h-3 mr-1" /> Aceitar
              </Button>
              <Button size="sm" variant="secondary" className="text-xs" onClick={() => toast.info("Reagendamento solicitado")}>
                <RotateCcw className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => toast.error("Consulta cancelada")}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Button variant="hero-outline" className="w-full mt-6" onClick={() => navigate("/clinica/chat")}>
        <MessageSquare className="w-4 h-4 mr-1" /> Abrir chats
      </Button>
    </div>
  );
};

export default ClinicaPainel;
