import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-diagnelas.png";
import { Heart, Building2 } from "lucide-react";

const EntryScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10"
      >
        <img src={logo} alt="DiagnELAs" className="w-40 h-40 object-contain mb-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-sm space-y-4"
      >
        <button
          onClick={() => navigate("/cadastro")}
          className="w-full rounded-2xl p-5 gradient-soft shadow-card border border-border text-left hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">Entrar como Usuária</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-[52px]">
            Acompanhar ciclo, registrar sintomas e agendar consultas.
          </p>
        </button>

        <button
          onClick={() => navigate("/clinica/cadastro")}
          className="w-full rounded-2xl p-5 bg-card shadow-card border border-border text-left hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-secondary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">Entrar como Clínica</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-[52px]">
            Receber pacientes e gerenciar consultas.
          </p>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-3"
      >
        <Button variant="hero" size="lg" onClick={() => navigate("/cadastro")}>
          Entrar
        </Button>
        <Button variant="hero-outline" size="lg" onClick={() => navigate("/cadastro")}>
          Criar conta
        </Button>
      </motion.div>
    </div>
  );
};

export default EntryScreen;
