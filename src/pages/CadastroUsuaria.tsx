import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CadastroUsuaria = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nome: "", idade: "", email: "", senha: "", cidade: "",
    anticoncepcional: "", ciclo: "", historico: "",
  });

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <button onClick={() => step > 1 ? setStep(step - 1) : navigate("/")} className="text-primary mb-6">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-sm mx-auto">
        <div className="flex gap-1 mb-8">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "gradient-primary" : "bg-muted"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold text-foreground">Criar conta</h1>
            <p className="text-muted-foreground text-sm mb-6">Seus dados pessoais</p>
            {[
              { label: "Nome", key: "nome", type: "text" },
              { label: "Idade", key: "idade", type: "number" },
              { label: "Email", key: "email", type: "email" },
              { label: "Senha", key: "senha", type: "password" },
              { label: "Cidade", key: "cidade", type: "text" },
            ].map(f => (
              <div key={f.key}>
                <Label className="text-foreground font-display text-sm">{f.label}</Label>
                <Input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => update(f.key, e.target.value)}
                  className="mt-1 rounded-xl border-border bg-muted/50 focus:ring-primary"
                />
              </div>
            ))}
            <Button variant="hero" className="w-full mt-4" size="lg" onClick={() => setStep(2)}>
              Próximo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h1 className="font-display text-2xl font-bold text-foreground">Saúde inicial</h1>
            <p className="text-muted-foreground text-sm mb-6">Informações sobre seu ciclo</p>

            <div>
              <Label className="text-foreground font-display text-sm">Usa anticoncepcional?</Label>
              <div className="flex gap-2 mt-2">
                {["Sim", "Não"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => update("anticoncepcional", opt)}
                    className={`flex-1 py-3 rounded-xl font-display font-medium text-sm transition-all ${
                      form.anticoncepcional === opt
                        ? "gradient-primary text-primary-foreground shadow-card"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-foreground font-display text-sm">Ciclo menstrual</Label>
              <div className="flex gap-2 mt-2">
                {["Regular", "Irregular"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => update("ciclo", opt)}
                    className={`flex-1 py-3 rounded-xl font-display font-medium text-sm transition-all ${
                      form.ciclo === opt
                        ? "gradient-primary text-primary-foreground shadow-card"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-foreground font-display text-sm">Histórico familiar</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Endometriose", "SOP", "Adenomiose", "Nenhum"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => update("historico", opt)}
                    className={`px-4 py-2.5 rounded-xl font-display font-medium text-sm transition-all ${
                      form.historico === opt
                        ? "gradient-primary text-primary-foreground shadow-card"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="hero" className="w-full mt-4" size="lg" onClick={() => navigate("/onboarding")}>
              Continuar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CadastroUsuaria;
