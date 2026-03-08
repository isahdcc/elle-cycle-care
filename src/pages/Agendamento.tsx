import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const horarios = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const dias = ["12 jun", "13 jun", "14 jun", "16 jun", "17 jun", "18 jun"];

const Agendamento = () => {
  const navigate = useNavigate();
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [enviarRelatorio, setEnviarRelatorio] = useState(false);

  const confirmar = () => {
    toast.success("Consulta agendada com sucesso!");
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <button onClick={() => navigate("/clinicas")} className="text-primary mb-4">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="font-display text-2xl font-bold text-foreground">Agendar consulta</h1>
      <p className="text-sm text-muted-foreground mt-1">Clínica Saúde da Mulher</p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground text-sm">Escolha a data</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {dias.map(d => (
              <button
                key={d}
                onClick={() => setDia(d)}
                className={`px-4 py-3 rounded-xl font-display font-medium text-sm transition-all ${
                  dia === d ? "gradient-primary text-primary-foreground shadow-card" : "bg-muted text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground text-sm">Escolha o horário</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            {horarios.map(h => (
              <button
                key={h}
                onClick={() => setHora(h)}
                className={`px-4 py-3 rounded-xl font-display font-medium text-sm transition-all ${
                  hora === h ? "gradient-primary text-primary-foreground shadow-card" : "bg-muted text-foreground"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setEnviarRelatorio(!enviarRelatorio)}
          className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${
            enviarRelatorio ? "gradient-soft border border-primary/30" : "bg-muted"
          }`}
        >
          <FileText className={`w-5 h-5 ${enviarRelatorio ? "text-primary" : "text-muted-foreground"}`} />
          <div className="text-left">
            <p className="font-display font-semibold text-sm text-foreground">Enviar relatório de sintomas</p>
            <p className="text-xs text-muted-foreground">Compartilhar com a clínica</p>
          </div>
        </button>

        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={confirmar}
          disabled={!dia || !hora}
        >
          Confirmar consulta
        </Button>
      </motion.div>
    </div>
  );
};

export default Agendamento;
