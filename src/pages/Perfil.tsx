import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Calendar, Heart, LogOut, Mail, Phone, Droplets, Weight, Ruler, PenSquare, Shield, Bell, ChevronRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Perfil = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [lembreteCiclo, setLembreteCiclo] = useState(true);
  const [lembreteConsulta, setLembreteConsulta] = useState(true);

  const [dados, setDados] = useState({
    nome: "Maria Silva",
    idade: "28 anos",
    cidade: "São Paulo, SP",
    email: "maria@email.com",
    telefone: "(11) 99999-0000",
    ciclo: "Irregular",
    duracao: "5 dias",
    cicloMedio: "28 dias",
    peso: "62 kg",
    altura: "1,65 m",
  });

  const [editDados, setEditDados] = useState(dados);

  const startEdit = () => {
    setEditDados(dados);
    setEditing(true);
  };

  const saveEdit = () => {
    setDados(editDados);
    setEditing(false);
    toast.success("Perfil atualizado!");
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setEditDados(prev => ({ ...prev, [field]: value }));
  };

  const infoItems = [
    { icon: Calendar, label: "Idade", field: "idade" },
    { icon: MapPin, label: "Cidade", field: "cidade" },
    { icon: Mail, label: "E-mail", field: "email" },
    { icon: Phone, label: "Telefone", field: "telefone" },
  ];

  const saudeItems = [
    { icon: Heart, label: "Tipo de ciclo", field: "ciclo" },
    { icon: Droplets, label: "Duração média", field: "duracao" },
    { icon: Calendar, label: "Ciclo médio", field: "cicloMedio" },
    { icon: Weight, label: "Peso", field: "peso" },
    { icon: Ruler, label: "Altura", field: "altura" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-6 pt-12 pb-8 rounded-b-[2rem] text-center relative">
        {!editing ? (
          <button onClick={startEdit} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <PenSquare className="w-4 h-4 text-primary-foreground" />
          </button>
        ) : (
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={saveEdit} className="w-8 h-8 rounded-full bg-primary-foreground/30 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </button>
            <button onClick={cancelEdit} className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        )}
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center mb-3 ring-4 ring-primary-foreground/10">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        {editing ? (
          <input
            value={editDados.nome}
            onChange={e => updateField("nome", e.target.value)}
            className="font-display text-xl font-bold text-primary-foreground bg-primary-foreground/10 rounded-xl px-4 py-2 text-center outline-none w-full max-w-[200px]"
          />
        ) : (
          <h1 className="font-display text-xl font-bold text-primary-foreground">{dados.nome}</h1>
        )}
        <p className="text-sm text-primary-foreground/70 mt-1">Membro desde Jan 2025</p>
      </div>

      <div className="px-6 mt-6 space-y-5">
        {/* Info pessoal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-foreground text-sm mb-3">Informações pessoais</h2>
          <div className="space-y-2">
            {infoItems.map(item => (
              <div key={item.label} className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-display">{item.label}</p>
                  {editing ? (
                    <input
                      value={(editDados as any)[item.field]}
                      onChange={e => updateField(item.field, e.target.value)}
                      className="font-display font-semibold text-foreground text-sm bg-muted rounded-lg px-2 py-1 w-full outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="font-display font-semibold text-foreground text-sm truncate">{(dados as any)[item.field]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saúde */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display font-bold text-foreground text-sm mb-3">Dados de saúde</h2>
          <div className="space-y-2">
            {saudeItems.map(item => (
              <div key={item.label} className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-display">{item.label}</p>
                  {editing ? (
                    <input
                      value={(editDados as any)[item.field]}
                      onChange={e => updateField(item.field, e.target.value)}
                      className="font-display font-semibold text-foreground text-sm bg-muted rounded-lg px-2 py-1 w-full outline-none focus:ring-2 focus:ring-ring"
                    />
                  ) : (
                    <p className="font-display font-semibold text-foreground text-sm">{(dados as any)[item.field]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notificações */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-bold text-foreground text-sm mb-3">Notificações</h2>
          <div className="bg-card rounded-2xl shadow-card border border-border divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="font-display text-sm text-foreground">Notificações gerais</span>
              </div>
              <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-muted-foreground" />
                <span className="font-display text-sm text-foreground">Lembrete de ciclo</span>
              </div>
              <Switch checked={lembreteCiclo} onCheckedChange={setLembreteCiclo} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="font-display text-sm text-foreground">Lembrete de consulta</span>
              </div>
              <Switch checked={lembreteConsulta} onCheckedChange={setLembreteConsulta} />
            </div>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="bg-card rounded-2xl shadow-card border border-border divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="font-display text-sm text-foreground">Privacidade e segurança</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        <Button variant="hero-outline" className="w-full" onClick={() => navigate("/")}>
          <LogOut className="w-4 h-4 mr-1" /> Sair da conta
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
