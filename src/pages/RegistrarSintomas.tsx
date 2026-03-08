import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const sintomas = [
  { emoji: "🔴", label: "Dor pélvica" },
  { emoji: "😣", label: "Cólica intensa" },
  { emoji: "🤢", label: "Náusea" },
  { emoji: "😴", label: "Fadiga" },
  { emoji: "💨", label: "Inchaço" },
  { emoji: "💔", label: "Dor durante relação" },
  { emoji: "😤", label: "Irritabilidade" },
  { emoji: "😢", label: "Tristeza" },
  { emoji: "🤕", label: "Dor de cabeça" },
  { emoji: "🔥", label: "Dor lombar" },
];

const intensidades = ["Leve", "Moderada", "Intensa"];

const RegistrarSintomas = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [intensidade, setIntensidade] = useState("");

  const toggle = (label: string) => {
    setSelected(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);
  };

  const salvar = () => {
    toast.success("Sintomas registrados com sucesso!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <button onClick={() => navigate("/home")} className="text-primary mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-display text-2xl font-bold text-foreground">Registrar sintomas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="px-6 mt-6 space-y-6">
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm mb-3">Como você está se sentindo?</h3>
          <div className="grid grid-cols-2 gap-2">
            {sintomas.map(s => (
              <motion.button
                key={s.label}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggle(s.label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-display font-medium transition-all ${
                  selected.includes(s.label)
                    ? "gradient-primary text-primary-foreground shadow-card"
                    : "bg-muted text-foreground"
                }`}
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
                {selected.includes(s.label) && <Check className="w-4 h-4 ml-auto" />}
              </motion.button>
            ))}
          </div>
        </div>

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="font-display font-semibold text-foreground text-sm mb-3">Intensidade geral</h3>
            <div className="flex gap-2">
              {intensidades.map(int => (
                <button
                  key={int}
                  onClick={() => setIntensidade(int)}
                  className={`flex-1 py-3 rounded-xl font-display font-medium text-sm transition-all ${
                    intensidade === int
                      ? "gradient-primary text-primary-foreground shadow-card"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {int}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={salvar}
          disabled={selected.length === 0}
        >
          Salvar registro
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default RegistrarSintomas;
