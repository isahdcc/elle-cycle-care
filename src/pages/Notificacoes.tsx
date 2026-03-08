import { useNavigate } from "react-router-dom";
import { ArrowLeft, Droplets, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const notificacoes = [
  { id: 1, tipo: "ciclo", titulo: "Menstruação prevista em 3 dias", desc: "Prepare-se! Sua menstruação está prevista para 28 de maio.", tempo: "Há 2 horas", lida: false },
  { id: 2, tipo: "consulta", titulo: "Consulta amanhã às 10:00", desc: "Lembre-se de levar seu ultrassom recente para a Clínica Saúde da Mulher.", tempo: "Há 5 horas", lida: false },
  { id: 3, tipo: "ciclo", titulo: "Fase lútea iniciada", desc: "Você entrou na fase lútea. É comum sentir alterações de humor e inchaço.", tempo: "Há 1 dia", lida: true },
  { id: 4, tipo: "consulta", titulo: "Retorno confirmado — 28 junho", desc: "Sua consulta de retorno com Dr. Rafael Lima foi confirmada.", tempo: "Há 2 dias", lida: true },
  { id: 5, tipo: "ciclo", titulo: "Ovulação estimada hoje", desc: "Seu período fértil está no auge. Registre seus sintomas para um relatório mais preciso.", tempo: "Há 5 dias", lida: true },
  { id: 6, tipo: "consulta", titulo: "Lembrete: enviar relatório", desc: "Envie seu relatório de sintomas para a Clínica Saúde da Mulher antes da consulta.", tempo: "Há 1 semana", lida: true },
];

const Notificacoes = () => {
  const navigate = useNavigate();

  const getIcon = (tipo: string) => {
    if (tipo === "ciclo") return Droplets;
    return Calendar;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/home")} className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Notificações</h1>
        </div>

        <div className="space-y-3">
          {notificacoes.map((n, i) => {
            const Icon = getIcon(n.tipo);
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-card rounded-2xl p-4 shadow-card border flex gap-3 ${
                  n.lida ? "border-border" : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  n.tipo === "ciclo" ? "bg-primary/15" : "bg-accent"
                }`}>
                  <Icon className={`w-5 h-5 ${n.tipo === "ciclo" ? "text-primary" : "text-accent-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-semibold text-foreground text-sm">{n.titulo}</p>
                    {!n.lida && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{n.tempo}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Notificacoes;
