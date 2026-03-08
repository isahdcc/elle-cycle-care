import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    title: "Qual a intensidade da sua dor menstrual?",
    options: ["Leve", "Moderada", "Intensa", "Muito intensa"],
  },
  {
    title: "Qual a duração média do seu ciclo?",
    options: ["Menos de 21 dias", "21-28 dias", "28-35 dias", "Mais de 35 dias"],
  },
  {
    title: "Quais sintomas são mais frequentes?",
    options: ["Cólica", "Dor pélvica", "Fadiga", "Náusea", "Inchaço", "Mudança de humor"],
    multi: true,
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const current = questions[step];
  const isMulti = (current as any).multi;

  const selectAnswer = (opt: string) => {
    if (isMulti) {
      const prev = (answers[step] as string[]) || [];
      setAnswers({
        ...answers,
        [step]: prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt],
      });
    } else {
      setAnswers({ ...answers, [step]: opt });
    }
  };

  const isSelected = (opt: string) => {
    if (isMulti) return ((answers[step] as string[]) || []).includes(opt);
    return answers[step] === opt;
  };

  const next = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 flex flex-col">
      <div className="flex gap-1 mb-8">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "gradient-primary" : "bg-muted"}`} />
        ))}
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 max-w-sm mx-auto w-full">
        <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-2">
          Pergunta {step + 1} de {questions.length}
        </p>
        <h1 className="font-display text-2xl font-bold text-foreground mb-8">{current.title}</h1>

        <div className="space-y-3">
          {current.options.map(opt => (
            <button
              key={opt}
              onClick={() => selectAnswer(opt)}
              className={`w-full text-left px-5 py-4 rounded-2xl font-display font-medium text-sm transition-all ${
                isSelected(opt)
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-sm mx-auto w-full mt-8">
        <Button variant="hero" className="w-full" size="lg" onClick={next}>
          {step < questions.length - 1 ? "Próxima" : "Começar"} <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
