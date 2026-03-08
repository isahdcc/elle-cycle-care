import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, ChevronRight, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

const HomePage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const cycleDay = 3;

  // Mock calendar data
  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    menstrual: i < 5,
    symptom: i === 7 || i === 14,
    predicted: i >= 25 && i <= 29,
  }));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
            <h1 className="font-display text-xl font-bold text-primary-foreground">DiagnELAs</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary-foreground">
          <p className="text-sm opacity-80 font-display">Seu ciclo</p>
          <h2 className="text-3xl font-display font-bold mt-1">Dia {cycleDay} da menstruação</h2>
          <p className="text-sm opacity-80 mt-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Próxima prevista: 28 maio
          </p>
        </motion.div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <h3 className="font-display font-bold text-foreground mb-3">Calendário do ciclo</h3>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="text-[10px] font-display text-muted-foreground font-semibold">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* offset for month start (wednesday) */}
            {[0, 0, 0].map((_, i) => <div key={`e${i}`} />)}
            {calendarDays.map(d => (
              <div
                key={d.day}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mx-auto ${
                  d.day === today.getDate()
                    ? "gradient-primary text-primary-foreground font-bold"
                    : d.menstrual
                    ? "bg-primary/20 text-primary"
                    : d.predicted
                    ? "bg-accent text-accent-foreground"
                    : d.symptom
                    ? "bg-destructive/10 text-destructive"
                    : "text-foreground"
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-[10px] font-display">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full gradient-primary" /> Menstruação</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Previsão</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive/30" /> Sintomas</span>
          </div>
        </motion.div>

        {/* Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <h3 className="font-display font-bold text-foreground mb-3">Consultas agendadas</h3>
          <div className="gradient-soft rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">Consulta — 14 junho</p>
              <p className="text-xs text-muted-foreground mt-0.5">Clínica Saúde da Mulher</p>
            </div>
            <button onClick={() => navigate("/clinicas")} className="text-primary">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button variant="hero" size="lg" className="w-full" onClick={() => navigate("/registrar")}>
            <Plus className="w-5 h-5 mr-1" /> Registrar sintomas
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
