import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageSquare, Clock, Check, X, RotateCcw, DollarSign, Eye, LogOut, QrCode, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo-diagnelas.png";

const consultas = [
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

const ClinicaPainel = () => {
  const navigate = useNavigate();
  const [selectedConsulta, setSelectedConsulta] = useState<typeof consultas[0] | null>(null);
  const [showPix, setShowPix] = useState<typeof consultas[0] | null>(null);

  const totalFaturamento = consultas.filter(c => c.pagamento === "pago").reduce((acc, c) => acc + c.valor, 0);
  const pendentes = consultas.filter(c => c.status === "pendente").length;
  const confirmadas = consultas.filter(c => c.status === "confirmada").length;

  const handleEnviarPix = (consulta: typeof consultas[0]) => {
    setShowPix(consulta);
    toast.success("Cobrança PIX enviada para a paciente!");
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
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Calendar, label: "Confirmadas", count: confirmadas, color: "gradient-primary" },
            { icon: Clock, label: "Pendentes", count: pendentes, color: "bg-accent" },
            { icon: DollarSign, label: "Faturado", count: `R$${totalFaturamento}`, color: "bg-secondary" },
          ].map(s => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-3 shadow-card border border-border text-center"
            >
              <div className={`w-10 h-10 rounded-full ${s.color} mx-auto flex items-center justify-center mb-2`}>
                <s.icon className={`w-5 h-5 ${s.color.includes("gradient") ? "text-primary-foreground" : "text-secondary-foreground"}`} />
              </div>
              <p className="font-display font-bold text-lg text-foreground">{s.count}</p>
              <p className="text-[10px] text-muted-foreground font-display">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Consultas */}
        <div>
          <h2 className="font-display font-bold text-foreground mb-3">Consultas</h2>
          <div className="space-y-3">
            {consultas.map((c, i) => (
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
            className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedConsulta(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-sm rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">Detalhes da Consulta</h3>
                <button onClick={() => setSelectedConsulta(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="gradient-soft rounded-2xl p-4">
                  <p className="font-display font-bold text-foreground">{selectedConsulta.paciente}</p>
                  <p className="text-sm text-primary font-display font-semibold mt-0.5">{selectedConsulta.especialidade}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Data/Hora</span><span className="font-display font-semibold text-foreground">{selectedConsulta.data}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">E-mail</span><span className="font-display font-semibold text-foreground">{selectedConsulta.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Telefone</span><span className="font-display font-semibold text-foreground">{selectedConsulta.telefone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-display font-bold text-primary">R$ {selectedConsulta.valor},00</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Pagamento</span>
                    <span className={`font-display font-semibold ${selectedConsulta.pagamento === "pago" ? "text-accent-foreground" : "text-destructive"}`}>
                      {selectedConsulta.pagamento === "pago" ? "✓ Pago" : "Pendente"}
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Relatório IA</span>
                    <span className="font-display font-semibold text-foreground">{selectedConsulta.relatorio ? "Anexado" : "Não enviado"}</span>
                  </div>
                </div>

                {selectedConsulta.relatorio && (
                  <button className="w-full flex items-center gap-3 bg-muted rounded-2xl p-4 text-left">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Ver relatório da paciente</p>
                      <p className="text-xs text-muted-foreground">Relatório de sintomas anexado</p>
                    </div>
                  </button>
                )}

                <div className="flex gap-3 pt-2">
                  {selectedConsulta.pagamento !== "pago" && (
                    <Button variant="hero" size="lg" className="flex-1" onClick={() => { setSelectedConsulta(null); handleEnviarPix(selectedConsulta); }}>
                      <QrCode className="w-4 h-4 mr-1" /> Cobrar PIX
                    </Button>
                  )}
                  <Button variant="hero-outline" size="lg" className="flex-1" onClick={() => { setSelectedConsulta(null); navigate("/clinica/chat"); }}>
                    <MessageSquare className="w-4 h-4 mr-1" /> Chat
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
            className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-6"
            onClick={() => setShowPix(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-sm rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">Cobrança PIX</h3>
                <button onClick={() => setShowPix(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">Cobrança para <span className="font-semibold text-foreground">{showPix.paciente}</span></p>
                <p className="text-3xl font-display font-bold text-primary">R$ {showPix.valor},00</p>

                {/* QR Code placeholder */}
                <div className="w-48 h-48 mx-auto bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">QR Code PIX</p>
                  </div>
                </div>

                {/* PIX code */}
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground mb-1 font-display">Código PIX copia e cola</p>
                  <p className="text-xs text-foreground font-mono break-all">{pixCode.slice(0, 60)}...</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" size="lg" className="flex-1" onClick={() => {
                    navigator.clipboard.writeText(pixCode);
                    toast.success("Código PIX copiado!");
                  }}>
                    <Copy className="w-4 h-4 mr-1" /> Copiar código
                  </Button>
                  <Button variant="hero-outline" size="lg" className="flex-1" onClick={() => {
                    toast.success("Cobrança enviada para a paciente!");
                    setShowPix(null);
                  }}>
                    Enviar
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
