import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ClinicaCadastro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "", endereco: "", cidade: "", especialidades: "", medicos: "", crm: "",
  });

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <button onClick={() => navigate("/")} className="text-primary mb-6">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto space-y-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Cadastro da Clínica</h1>
        <p className="text-muted-foreground text-sm mb-6">Dados do estabelecimento</p>

        {[
          { label: "Nome da clínica", key: "nome" },
          { label: "Endereço", key: "endereco" },
          { label: "Cidade", key: "cidade" },
          { label: "Especialidades", key: "especialidades" },
          { label: "Médicos responsáveis", key: "medicos" },
          { label: "CRM", key: "crm" },
        ].map(f => (
          <div key={f.key}>
            <Label className="text-foreground font-display text-sm">{f.label}</Label>
            <Input
              value={form[f.key as keyof typeof form]}
              onChange={e => update(f.key, e.target.value)}
              className="mt-1 rounded-xl border-border bg-muted/50"
            />
          </div>
        ))}

        <Button variant="hero" className="w-full mt-4" size="lg" onClick={() => navigate("/clinica/painel")}>
          Criar conta <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ClinicaCadastro;
