import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Check, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

type Categoria = {
  nome: string;
  emoji: string;
  sintomas: { emoji: string; label: string }[];
};

const categorias: Categoria[] = [
  {
    nome: "Dor",
    emoji: "🔴",
    sintomas: [
      { emoji: "🔴", label: "Dor pélvica" },
      { emoji: "😣", label: "Cólica intensa" },
      { emoji: "🔥", label: "Dor lombar" },
      { emoji: "💔", label: "Dor durante relação" },
      { emoji: "🤕", label: "Dor de cabeça" },
      { emoji: "⚡", label: "Dor nas pernas" },
      { emoji: "🩸", label: "Dor ao urinar" },
    ],
  },
  {
    nome: "Digestivo",
    emoji: "🤢",
    sintomas: [
      { emoji: "🤢", label: "Náusea" },
      { emoji: "💨", label: "Inchaço abdominal" },
      { emoji: "😖", label: "Constipação" },
      { emoji: "🚽", label: "Diarreia" },
      { emoji: "🫃", label: "Gases" },
      { emoji: "🍽️", label: "Perda de apetite" },
    ],
  },
  {
    nome: "Emocional",
    emoji: "💜",
    sintomas: [
      { emoji: "😤", label: "Irritabilidade" },
      { emoji: "😢", label: "Tristeza" },
      { emoji: "😰", label: "Ansiedade" },
      { emoji: "😶", label: "Apatia" },
      { emoji: "🌪️", label: "Mudanças de humor" },
      { emoji: "😡", label: "Raiva sem motivo" },
    ],
  },
  {
    nome: "Energia & Sono",
    emoji: "😴",
    sintomas: [
      { emoji: "😴", label: "Fadiga" },
      { emoji: "🥱", label: "Sonolência excessiva" },
      { emoji: "🌙", label: "Insônia" },
      { emoji: "🔋", label: "Falta de energia" },
      { emoji: "💤", label: "Sono não reparador" },
    ],
  },
  {
    nome: "Pele & Corpo",
    emoji: "✨",
    sintomas: [
      { emoji: "🧴", label: "Acne" },
      { emoji: "💇", label: "Queda de cabelo" },
      { emoji: "💧", label: "Retenção de líquido" },
      { emoji: "🌡️", label: "Ondas de calor" },
      { emoji: "🥵", label: "Suor excessivo" },
      { emoji: "🦵", label: "Pernas pesadas" },
    ],
  },
  {
    nome: "Fluxo Menstrual",
    emoji: "🩸",
    sintomas: [
      { emoji: "🩸", label: "Fluxo intenso" },
      { emoji: "💧", label: "Fluxo leve" },
      { emoji: "🟤", label: "Coágulos" },
      { emoji: "📅", label: "Escape fora do período" },
      { emoji: "⏰", label: "Menstruação prolongada" },
    ],
  },
];

const intensidades = ["Leve", "Moderada", "Intensa", "Muito intensa"];

const RegistrarSintomas = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [intensidade, setIntensidade] = useState("");
  const [expandedCats, setExpandedCats] = useState<string[]>(["Dor"]);

  const toggle = (label: string) => {
    setSelected(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);
  };

  const toggleCat = (nome: string) => {
    setExpandedCats(prev => prev.includes(nome) ? prev.filter(c => c !== nome) : [...prev, nome]);
  };

  const countInCat = (cat: Categoria) => cat.sintomas.filter(s => selected.includes(s.label)).length;

  const salvar = () => {
    toast.success("Sintomas registrados com sucesso!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate("/home")} className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Registrar sintomas</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-9">
          {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="px-6 mt-6 space-y-3">
        {categorias.map(cat => {
          const isExpanded = expandedCats.includes(cat.nome);
          const count = countInCat(cat);
          return (
            <motion.div
              key={cat.nome}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleCat(cat.nome)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="font-display font-bold text-foreground text-sm">{cat.nome}</span>
                  {count > 0 && (
                    <span className="gradient-primary text-primary-foreground text-[10px] font-display font-bold px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-4 pb-4"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {cat.sintomas.map(s => (
                      <button
                        key={s.label}
                        onClick={() => toggle(s.label)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-display font-medium transition-all ${
                          selected.includes(s.label)
                            ? "gradient-primary text-primary-foreground shadow-card"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <span>{s.emoji}</span>
                        <span className="truncate">{s.label}</span>
                        {selected.includes(s.label) && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground text-sm mb-3">Intensidade geral</h3>
            <div className="grid grid-cols-2 gap-2">
              {intensidades.map(int => (
                <button
                  key={int}
                  onClick={() => setIntensidade(int)}
                  className={`py-3 rounded-xl font-display font-medium text-sm transition-all ${
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

        {/* Resumo */}
        {selected.length > 0 && (
          <div className="gradient-soft rounded-2xl p-4">
            <p className="text-xs font-display font-semibold text-secondary-foreground">
              {selected.length} sintoma{selected.length > 1 ? "s" : ""} selecionado{selected.length > 1 ? "s" : ""}
              {intensidade ? ` • Intensidade: ${intensidade}` : ""}
            </p>
          </div>
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
