import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, ChevronRight, Plus, X, Clock, MapPin, FileText, Eye, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import logo from "@/assets/logo-diagnelas.png";

const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

const consultas = [
  {
    id: 1,
    titulo: "Consulta — 14 junho",
    clinica: "Clínica Saúde da Mulher",
    endereco: "Rua Augusta, 1200 — São Paulo",
    horario: "10:00",
    medico: "Dra. Camila Souza",
    especialidade: "Endometriose",
    observacao: "Levar ultrassom recente e relatório de sintomas.",
  },
  {
    id: 2,
    titulo: "Retorno — 28 junho",
    clinica: "Centro Feminino Vida",
    endereco: "Av. Paulista, 800 — São Paulo",
    horario: "14:30",
    medico: "Dr. Rafael Lima",
    especialidade: "Ginecologia",
    observacao: "Retorno para avaliação de exames.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const today = new Date();
  const cycleDay = 3;

  const [selectedConsulta, setSelectedConsulta] = useState<typeof consultas[0] | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    menstrual: i < 5,
    symptom: i === 7 || i === 14,
    predicted: i >= 25 && i <= 29,
  }));

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-6 pt-10 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="DiagnELAs" className="w-9 h-9 object-contain" />
            <h1 className="font-display text-xl font-bold text-primary-foreground">DiagnELAs</h1>
          </div>
          <button
            onClick={() => navigate("/perfil")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
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
          className="bg-card rounded-2xl p-4 shadow-card border border-border relative"
        >
          <h3 className="font-display font-bold text-foreground mb-3">Calendário do ciclo</h3>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="text-[10px] font-display text-muted-foreground font-semibold">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[0, 0, 0].map((_, i) => <div key={`e${i}`} />)}
            {calendarDays.map(d => (
              <button
                key={d.day}
                onClick={() => handleDayClick(d.day)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mx-auto transition-all hover:ring-2 hover:ring-primary/30 ${
                  d.day === today.getDate()
                    ? "gradient-primary text-primary-foreground font-bold"
                    : d.menstrual
                    ? "bg-primary/20 text-primary"
                    : d.predicted
                    ? "bg-accent text-accent-foreground"
                    : d.symptom
                    ? "bg-destructive/10 text-destructive"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {d.day}
              </button>
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
          <div className="space-y-2">
            {consultas.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedConsulta(c)}
                className="w-full gradient-soft rounded-xl p-4 flex items-center justify-between text-left hover:shadow-card transition-shadow"
              >
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{c.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.clinica}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button variant="hero" size="lg" className="w-full" onClick={() => navigate("/registrar")}>
            <Plus className="w-5 h-5 mr-1" /> Registrar sintomas
          </Button>
        </motion.div>
      </div>

      {/* Day Options Modal */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 flex items-end justify-center"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-md rounded-t-3xl p-6 pb-8"
            >
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
              <h3 className="font-display font-bold text-foreground text-lg mb-1">
                Dia {selectedDay}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">O que deseja fazer?</p>

              <div className="space-y-3">
                <button
                  onClick={() => { setSelectedDay(null); navigate("/relatorio"); }}
                  className="w-full flex items-center gap-3 bg-muted rounded-2xl p-4 hover:shadow-card transition-shadow text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Eye className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">Ver detalhes do dia</p>
                    <p className="text-xs text-muted-foreground">Sintomas registrados e informações</p>
                  </div>
                </button>

                <button
                  onClick={() => { setSelectedDay(null); navigate("/registrar"); }}
                  className="w-full flex items-center gap-3 gradient-soft rounded-2xl p-4 hover:shadow-card transition-shadow text-left"
                >
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <PenSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">Registrar sintomas</p>
                    <p className="text-xs text-muted-foreground">Adicionar registro para este dia</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Details Modal */}
      <AnimatePresence>
        {selectedConsulta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 flex items-end justify-center"
            onClick={() => setSelectedConsulta(null)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-md rounded-t-3xl p-6 pb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">Detalhes da Consulta</h3>
                <button onClick={() => setSelectedConsulta(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="gradient-soft rounded-2xl p-4">
                  <p className="font-display font-bold text-foreground">{selectedConsulta.titulo}</p>
                  <p className="text-sm text-primary font-display font-semibold mt-0.5">{selectedConsulta.especialidade}</p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: MapPin, label: selectedConsulta.clinica, sub: selectedConsulta.endereco },
                    { icon: Clock, label: `Horário: ${selectedConsulta.horario}`, sub: selectedConsulta.medico },
                    { icon: FileText, label: "Observações", sub: selectedConsulta.observacao },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="hero" size="lg" className="flex-1" onClick={() => { setSelectedConsulta(null); navigate("/chat"); }}>
                    Chat com clínica
                  </Button>
                  <Button variant="hero-outline" size="lg" className="flex-1" onClick={() => { setSelectedConsulta(null); navigate("/agendamento"); }}>
                    Reagendar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default HomePage;
