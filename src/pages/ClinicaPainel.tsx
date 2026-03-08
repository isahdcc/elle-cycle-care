import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, Clock, Check, X, RotateCcw, DollarSign, Eye, LogOut, QrCode, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo-diagnelas.png";

type ConsultaType = {
  paciente: string;
  data: string;
  status: string;
  especialidade: string;
  email: string;
  telefone: string;
  valor: number;
  pagamento: string;
  relatorio: boolean;
};

const consultas: ConsultaType[] = [
  {
    paciente: "Maria Silva",
    data: "14 jun — 10:00",
    status: "pendente",
    especialidade: "Endometriose",
    email: "maria@email.com",
    telefone: "(11) 99999-0000",
    valor: 350,
    pagamento: "pendente",
    relatorio: true,
  },
  {
    paciente: "Ana Costa",
    data: "15 jun — 14:00",
    status: "confirmada",
    especialidade: "SOP",
    email: "ana@email.com",
    telefone: "(11) 98888-0000",
    valor: 280,
    pagamento: "pago",
    relatorio: false,
  },
  {
    paciente: "Julia Santos",
    data: "16 jun — 09:00",
    status: "pendente",
    especialidade: "Ginecologia",
    email: "julia@email.com",
    telefone: "(11) 97777-0000",
    valor: 300,
    pagamento: "pendente",
    relatorio: true,
  },
];

type FilterType = "todas" | "confirmadas" | "pendentes";

const ClinicaPainel = () => {
  const navigate = useNavigate();
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaType | null>(null);
  const [showPix, setShowPix] = useState<ConsultaType | null>(null);
  const [filter, setFilter] = useState<FilterType>("todas");

  const totalFaturamento = consultas.filter(c => c.pagamento === "pago").reduce((acc, c) => acc + c.valor, 0);
  const pendentes = consultas.filter(c => c.status === "pendente").length;
  const confirmadas = consultas.filter(c => c.status === "confirmada").length;

  const filteredConsultas = filter === "todas"
    ? consultas
    : filter === "confirmadas"
    ? consultas.filter(c => c.status === "confirmada")
    : consultas.filter(c => c.status === "pendente");

  const handleEnviarPix = (consulta: ConsultaType) => {
    setShowPix(consulta);
  };

  const pixCode = "00020126580014br.gov.bcb.pix0136diagnelas-clinica@pix.com5204000053039865802BR5925CLINICA SAUDE DA MULHER6009SAO PAULO62070503***63041D3D";

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="gradient-hero px-6 pt-10 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="DiagnELAs" className="w-9 h-9 object-contain" />
            <h1 className="font-display text-lg font-bold text-primary-foreground">Painel da Clínica</h1>
          </div>
          <button onClick={() => navigate("/")} className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
        <p className="text-sm text-primary-foreground/70 font-display">Clínica Saúde da Mulher</p>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Stats - clickable */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Calendar, label: "Confirmadas", count: confirmadas, color: "gradient-primary", filterVal: "confirmadas" as FilterType },
            { icon: Clock, label: "Pendentes", count: pendentes, color: "bg-accent", filterVal: "pendentes" as FilterType },
            { icon: DollarSign, label: "Faturado", count: `R$${totalFaturamento}`, color: "bg-secondary", filterVal: "todas" as FilterType },
          ].map(s => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setFilter(f => f === s.filterVal ? "todas" : s.filterVal)}
              className={`bg-card rounded-2xl p-3 shadow-card border text-center transition-all ${
                filter === s.filterVal && s.filterVal !== "todas" ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${s.color} mx-auto flex items-center justify-center mb-2`}>
                <s.icon className={`w-5 h-5 ${s.color.includes("gradient") ? "text-primary-foreground" : "text-secondary-foreground"}`} />
              </div>
              <p className="font-display font-bold text-lg text-foreground">{s.count}</p>
              <p className="text-[10px] text-muted-foreground font-display">{s.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Filter indicator */}
        {filter !== "todas" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-display">Filtrando: <span className="font-semibold text-foreground capitalize">{filter}</span></span>
            <button onClick={() => setFilter("todas")} className="text-xs text-primary font-display font-semibold">Limpar</button>
          </div>
        )}

        {/* Consultas */}
        <div>
          <h2 className="font-display font-bold text-foreground mb-3">Consultas</h2>
          <div className="space-y-3">
            {filteredConsultas.map((c, i) => (
              <motion.div
                key={c.paciente}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-4 shadow-card border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-foreground text-sm">{c.paciente}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-display font-semibold px-2 py-1 rounded-full ${
                      c.pagamento === "pago"
                        ? "bg-accent text-accent-foreground"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {c.pagamento === "pago" ? "Pago" : "Não pago"}
                    </span>
                    <span className={`text-[10px] font-display font-semibold px-2 py-1 rounded-full ${
                      c.status === "confirmada" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{c.data} • {c.especialidade}</p>
                <p className="text-xs text-primary font-display font-semibold mb-3">R$ {c.valor},00</p>

                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="hero" className="text-xs" onClick={() => setSelectedConsulta(c)}>
                    <Eye className="w-3 h-3 mr-1" /> Detalhes
                  </Button>
                  {c.pagamento !== "pago" && (
                    <Button size="sm" variant="secondary" className="text-xs" onClick={() => handleEnviarPix(c)}>
                      <QrCode className="w-3 h-3 mr-1" /> Cobrar PIX
                    </Button>
                  )}
                  <Button size="sm" variant="secondary" className="text-xs" onClick={() => navigate("/clinica/chat")}>
                    <MessageSquare className="w-3 h-3 mr-1" /> Chat
                  </Button>
                  {c.status === "pendente" && (
                    <>
                      <Button size="sm" variant="secondary" className="text-xs" onClick={() => toast.success("Consulta aceita!")}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs text-destructive" onClick={() => toast.error("Consulta cancelada")}>
                        <X className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            {filteredConsultas.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm font-display">
                Nenhuma consulta {filter} encontrada.
              </div>
            )}
          </div>
        </div>

        <Button variant="hero-outline" className="w-full" onClick={() => navigate("/clinica/chat")}>
          <MessageSquare className="w-4 h-4 mr-1" /> Abrir chats
        </Button>
      </div>

      {/* Consultation Details Modal */}
      <AnimatePresence>
        {selectedConsulta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedConsulta(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-sm rounded-3xl p-5 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-foreground text-base">Detalhes da Consulta</h3>
                <button onClick={() => setSelectedConsulta(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="gradient-soft rounded-xl p-3">
                  <p className="font-display font-bold text-foreground text-sm">{selectedConsulta.paciente}</p>
                  <p className="text-xs text-primary font-display font-semibold mt-0.5">{selectedConsulta.especialidade}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground text-xs">Data/Hora</span><span className="font-display font-semibold text-foreground text-xs">{selectedConsulta.data}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground text-xs">E-mail</span><span className="font-display font-semibold text-foreground text-xs">{selectedConsulta.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground text-xs">Telefone</span><span className="font-display font-semibold text-foreground text-xs">{selectedConsulta.telefone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground text-xs">Valor</span><span className="font-display font-bold text-primary text-xs">R$ {selectedConsulta.valor},00</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground text-xs">Pagamento</span>
                    <span className={`font-display font-semibold text-xs ${selectedConsulta.pagamento === "pago" ? "text-accent-foreground" : "text-destructive"}`}>
                      {selectedConsulta.pagamento === "pago" ? "✓ Pago" : "Pendente"}
                    </span>
                  </div>
                </div>

                {selectedConsulta.relatorio && (
                  <button className="w-full flex items-center gap-3 bg-muted rounded-xl p-3 text-left">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-display font-semibold text-foreground text-xs">Ver relatório da paciente</p>
                      <p className="text-[10px] text-muted-foreground">Relatório de sintomas anexado</p>
                    </div>
                  </button>
                )}

                <div className="flex gap-2 pt-1">
                  {selectedConsulta.pagamento !== "pago" && (
                    <Button variant="hero" size="sm" className="flex-1 text-xs py-2" onClick={() => { setSelectedConsulta(null); handleEnviarPix(selectedConsulta); }}>
                      <QrCode className="w-3 h-3 mr-1" /> Cobrar PIX
                    </Button>
                  )}
                  <Button variant="hero-outline" size="sm" className="flex-1 text-xs py-2" onClick={() => { setSelectedConsulta(null); navigate("/clinica/chat"); }}>
                    <MessageSquare className="w-3 h-3 mr-1" /> Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIX Modal */}
      <AnimatePresence>
        {showPix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPix(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-sm rounded-3xl p-5 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-foreground text-base">Cobrança PIX</h3>
                <button onClick={() => setShowPix(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-muted-foreground">Cobrança para <span className="font-semibold text-foreground">{showPix.paciente}</span></p>
                <p className="text-2xl font-display font-bold text-primary">R$ {showPix.valor},00</p>

                <div className="w-36 h-36 mx-auto bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-12 h-12 text-foreground mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground">QR Code PIX</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-2">
                  <p className="text-[10px] text-muted-foreground mb-1 font-display">Código PIX copia e cola</p>
                  <p className="text-[10px] text-foreground font-mono break-all">{pixCode.slice(0, 50)}...</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="hero" size="sm" className="flex-1 text-xs py-2" onClick={() => {
                    navigator.clipboard.writeText(pixCode);
                    toast.success("Código PIX copiado!");
                  }}>
                    <Copy className="w-3 h-3 mr-1" /> Copiar
                  </Button>
                  <Button variant="hero-outline" size="sm" className="flex-1 text-xs py-2" onClick={() => {
                    toast.success("Cobrança PIX enviada para a paciente!");
                    setShowPix(null);
                  }}>
                    Enviar cobrança
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClinicaPainel;
