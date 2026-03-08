import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const alertas = [
  { label: "Possível endometriose", desc: "Padrão de dor pélvica crônica identificado", level: "alto" },
  { label: "Ciclo irregular", desc: "Variação significativa nos últimos 3 meses", level: "medio" },
];

const frequencia = [
  { label: "Cólica intensa", count: 12, max: 15 },
  { label: "Fadiga", count: 8, max: 15 },
  { label: "Dor pélvica", count: 6, max: 15 },
  { label: "Náusea", count: 4, max: 15 },
  { label: "Inchaço", count: 3, max: 15 },
];

const Relatorio = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <button onClick={() => navigate("/home")} className="text-primary mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-display text-2xl font-bold text-foreground">Relatório da IA</h1>
        <p className="text-sm text-muted-foreground mt-1">Análise dos últimos 30 dias</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {/* Alertas */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-display font-bold text-foreground">Alertas</h3>
          </div>
          <div className="space-y-3">
            {alertas.map(a => (
              <div key={a.label} className={`rounded-xl p-3 ${a.level === "alto" ? "bg-destructive/10" : "bg-accent"}`}>
                <p className="font-display font-semibold text-sm text-foreground">{a.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Frequência */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-foreground">Frequência de sintomas</h3>
          </div>
          <div className="space-y-3">
            {frequencia.map(f => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-display font-medium text-foreground">{f.label}</span>
                  <span className="text-muted-foreground">{f.count}x</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(f.count / f.max) * 100}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Padrão */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-4 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-foreground">Padrão no ciclo</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sintomas mais intensos entre os dias 1-5 do ciclo. Dor pélvica persistente fora do período menstrual.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="gradient-soft rounded-2xl p-4 text-center">
          <p className="text-xs font-display font-semibold text-secondary-foreground">
            ⚠️ Este relatório não substitui diagnóstico médico.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="hero" size="lg" className="flex-1">
            <Download className="w-4 h-4 mr-1" /> Baixar PDF
          </Button>
          <Button variant="hero-outline" size="lg" className="flex-1">
            <Send className="w-4 h-4 mr-1" /> Enviar
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Relatorio;
