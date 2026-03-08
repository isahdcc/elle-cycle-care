import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-diagnelas.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const EntryScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background px-6 pt-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-6"
      >
        <img src={logo} alt="DiagnELAs" className="w-32 h-32 object-contain mb-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <h1 className="font-display text-2xl font-bold text-foreground text-center">Bem-vinda de volta</h1>
        <p className="text-muted-foreground text-sm text-center mt-1 mb-8">Entre para continuar</p>

        {/* Email */}
        <div className="relative mb-4">
          <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-4 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Senha */}
        <div className="relative mb-2">
          <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-2xl pl-12 pr-12 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-right mb-6">
          <button className="text-sm text-primary font-display font-medium">Esqueceu a senha?</button>
        </div>

        {/* Entrar */}
        <Button variant="hero" size="lg" className="w-full rounded-2xl py-6" onClick={() => navigate("/home")}>
          Entrar
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">ou continue com</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl py-3.5 bg-card hover:bg-muted transition-colors">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            <span className="text-sm font-medium text-foreground">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-2xl py-3.5 bg-card hover:bg-muted transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span className="text-sm font-medium text-foreground">Apple</span>
          </button>
        </div>

        {/* Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <button onClick={() => navigate("/cadastro")} className="text-primary font-display font-bold">
              Criar Conta
            </button>
          </p>
          <p className="text-sm text-muted-foreground">
            É uma clínica?{" "}
            <button onClick={() => navigate("/clinica/cadastro")} className="text-primary font-display font-bold">
              Cadastrar Clínica
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EntryScreen;
