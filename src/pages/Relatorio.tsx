import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Send, FileText, Calendar, TrendingUp, AlertTriangle, Activity, Brain, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const periodos = [
  { label: "Última semana", value: "week", gerado: "07/03/2026", periodo: "01 Mar — 07 Mar 2026 (7 dias, 6 registros)" },
  { label: "Último mês", value: "month", gerado: "07/03/2026", periodo: "07 Fev — 07 Mar 2026 (1 mês, 18 registros)" },
  { label: "Últimos 3 meses", value: "3months", gerado: "07/03/2026", periodo: "Dez 2025 — Mar 2026 (3 meses, 42 registros)" },
  { label: "Últimos 6 meses", value: "6months", gerado: "07/03/2026", periodo: "Set 2025 — Mar 2026 (6 meses, 78 registros)" },
  { label: "Último ano", value: "year", gerado: "07/03/2026", periodo: "Mar 2025 — Mar 2026 (12 meses, 156 registros)" },
];

const sintomasFrequentes = [
  { label: "Cólica intensa", pct: 85 },
  { label: "Fadiga", pct: 72 },
  { label: "Inchaço", pct: 60 },
  { label: "Dor lombar", pct: 55 },
  { label: "Alterações de humor", pct: 48 },
  { label: "Náusea", pct: 35 },
  { label: "Dor pélvica", pct: 30 },
  { label: "Dor de cabeça", pct: 22 },
];

const padroes = [
  "Cólica intensifica nos dias 1-3 do ciclo (média 8/10)",
  "Fadiga aumenta na fase pré-menstrual",
  "Dor pélvica persiste fora do período menstrual",
  "Inchaço correlacionado com fase lútea",
  "Alterações de humor pioram 5 dias antes da menstruação",
];

const condicoes = [
  { nome: "Endometriose", correlacao: 72 },
  { nome: "SOP (Síndrome dos Ovários Policísticos)", correlacao: 45 },
  { nome: "Adenomiose", correlacao: 28 },
];

const intensidadePorDia = [
  { dia: "D1", dor: 9, fadiga: 5, humor: 4 },
  { dia: "D2", dor: 8, fadiga: 6, humor: 5 },
  { dia: "D3", dor: 8, fadiga: 7, humor: 6 },
  { dia: "D4", dor: 6, fadiga: 7, humor: 5 },
  { dia: "D5", dor: 4, fadiga: 6, humor: 4 },
  { dia: "D7", dor: 2, fadiga: 4, humor: 3 },
  { dia: "D10", dor: 1, fadiga: 3, humor: 2 },
  { dia: "D14", dor: 3, fadiga: 3, humor: 3 },
  { dia: "D21", dor: 4, fadiga: 5, humor: 5 },
  { dia: "D25", dor: 5, fadiga: 6, humor: 6 },
  { dia: "D28", dor: 7, fadiga: 7, humor: 7 },
];

const distribuicaoSintomas = [
  { name: "Dor", value: 35, color: "hsl(336, 100%, 48%)" },
  { name: "Fadiga", value: 22, color: "hsl(330, 80%, 60%)" },
  { name: "Digestivo", value: 18, color: "hsl(320, 60%, 70%)" },
  { name: "Emocional", value: 15, color: "hsl(340, 40%, 80%)" },
  { name: "Outros", value: 10, color: "hsl(336, 20%, 90%)" },
];

const cicloHistorico = [
  { mes: "Dez", duracao: 30, intensidade: 7 },
  { mes: "Jan", duracao: 28, intensidade: 8 },
  { mes: "Fev", duracao: 32, intensidade: 6 },
  { mes: "Mar", duracao: 29, intensidade: 9 },
];

const Relatorio = () => {
  const navigate = useNavigate();
  const [periodoSelecionado, setPeriodoSelecionado] = useState("3months");
  const [showPeriodos, setShowPeriodos] = useState(false);

  const periodoAtual = periodos.find(p => p.value === periodoSelecionado)!;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate("/home")} className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Relatório da IA</h1>
        </div>
      </div>

      <div className="px-6 mt-4 space-y-4">
        {/* Period Selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
          <button
            onClick={() => setShowPeriodos(!showPeriodos)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="font-display font-bold text-foreground text-sm">Período do relatório</p>
                <p className="text-xs text-muted-foreground">{periodoAtual.label}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showPeriodos ? "rotate-180" : ""}`} />
          </button>

          {showPeriodos && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-4 pb-4">
              <div className="space-y-1">
                {periodos.map(p => (
                  <button
                    key={p.value}
                    onClick={() => { setPeriodoSelecionado(p.value); setShowPeriodos(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-display font-medium transition-all ${
                      periodoSelecionado === p.value
                        ? "gradient-primary text-primary-foreground shadow-card"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-display font-bold text-foreground">DiagnELAs — Relatório</h2>
          </div>
          <p className="text-xs text-muted-foreground">Gerado em {periodoAtual.gerado}</p>
          <div className="mt-3 flex items-start gap-2">
            <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-display font-semibold text-sm text-foreground">Período analisado</p>
              <p className="text-xs text-muted-foreground">{periodoAtual.periodo}</p>
            </div>
          </div>
        </motion.div>

        {/* Sintomas mais frequentes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-foreground">Sintomas mais frequentes</h3>
          </div>
          <div className="space-y-3">
            {sintomasFrequentes.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-display font-medium text-foreground">{s.label}</span>
                  <span className="text-primary font-display font-semibold">{s.pct}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(336, 100%, 48%), hsl(320, 80%, 65%))`,
                      opacity: 1 - i * 0.08,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gráfico de linha */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-foreground">Intensidade ao longo do ciclo</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={intensidadePorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(336, 20%, 92%)" />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fontFamily: "Quicksand" }} stroke="hsl(340, 10%, 50%)" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fontFamily: "Quicksand" }} stroke="hsl(340, 10%, 50%)" />
              <Tooltip contentStyle={{ borderRadius: 12, fontFamily: "Quicksand", fontSize: 12, border: "1px solid hsl(336, 20%, 90%)" }} />
              <Line type="monotone" dataKey="dor" stroke="hsl(336, 100%, 48%)" strokeWidth={2.5} dot={{ r: 3 }} name="Dor" />
              <Line type="monotone" dataKey="fadiga" stroke="hsl(320, 80%, 65%)" strokeWidth={2} dot={{ r: 3 }} name="Fadiga" />
              <Line type="monotone" dataKey="humor" stroke="hsl(340, 40%, 80%)" strokeWidth={2} dot={{ r: 3 }} name="Humor" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1 text-[10px] font-display"><span className="w-3 h-1 rounded-full" style={{ background: "hsl(336, 100%, 48%)" }} /> Dor</span>
            <span className="flex items-center gap-1 text-[10px] font-display"><span className="w-3 h-1 rounded-full" style={{ background: "hsl(320, 80%, 65%)" }} /> Fadiga</span>
            <span className="flex items-center gap-1 text-[10px] font-display"><span className="w-3 h-1 rounded-full" style={{ background: "hsl(340, 40%, 80%)" }} /> Humor</span>
          </div>
        </motion.div>

        {/* Distribuição (Pie) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-4">Distribuição por categoria</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={distribuicaoSintomas} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3}>
                  {distribuicaoSintomas.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {distribuicaoSintomas.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="font-display font-medium text-foreground">{d.name}</span>
                  <span className="text-muted-foreground ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Histórico de ciclos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-4">Histórico de ciclos</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={cicloHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(336, 20%, 92%)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fontFamily: "Quicksand" }} stroke="hsl(340, 10%, 50%)" />
              <YAxis tick={{ fontSize: 10, fontFamily: "Quicksand" }} stroke="hsl(340, 10%, 50%)" />
              <Tooltip contentStyle={{ borderRadius: 12, fontFamily: "Quicksand", fontSize: 12, border: "1px solid hsl(336, 20%, 90%)" }} />
              <Bar dataKey="duracao" fill="hsl(336, 100%, 48%)" radius={[6, 6, 0, 0]} name="Duração (dias)" />
              <Bar dataKey="intensidade" fill="hsl(320, 80%, 65%)" radius={[6, 6, 0, 0]} name="Intensidade" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1 text-[10px] font-display"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(336, 100%, 48%)" }} /> Duração</span>
            <span className="flex items-center gap-1 text-[10px] font-display"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(320, 80%, 65%)" }} /> Intensidade</span>
          </div>
        </motion.div>

        {/* Padrões */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h3 className="font-display font-bold text-foreground mb-3">Padrões detectados</h3>
          <ul className="space-y-2">
            {padroes.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Condições */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-foreground">Possíveis condições sugeridas</h3>
          </div>
          <div className="space-y-3">
            {condicoes.map(c => (
              <div key={c.nome}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-display font-medium text-foreground">{c.nome}</span>
                  <span className="text-primary font-display font-semibold">{c.correlacao}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.correlacao}%` }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recomendações */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="font-display font-bold text-foreground">Recomendações</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
              Procurar especialista em endometriose para avaliação detalhada
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
              Realizar ultrassom transvaginal com preparo intestinal
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              Monitorar padrão de dor fora do período menstrual
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              Avaliar dosagem hormonal (FSH, LH, estradiol, progesterona)
            </li>
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <div className="gradient-soft rounded-2xl p-4 text-center">
          <p className="text-xs font-display font-semibold text-secondary-foreground">
            ⚠️ Este relatório não substitui diagnóstico médico. Consulte um especialista.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="hero" size="lg" className="flex-1">
            <Download className="w-4 h-4 mr-1" /> Baixar PDF
          </Button>
          <Button variant="hero-outline" size="lg" className="flex-1" onClick={() => navigate("/clinicas")}>
            <Send className="w-4 h-4 mr-1" /> Enviar
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Relatorio;
