import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const especialidades = ["Todas", "Endometriose", "SOP", "Fertilidade", "Ginecologia"];

const clinicas = [
  { nome: "Centro de Saúde da Mulher", esp: "Endometriose", rating: 4.8, reviews: 128, dist: "2.3 km" },
  { nome: "Clínica FemCare", esp: "SOP", rating: 4.6, reviews: 94, dist: "3.1 km" },
  { nome: "Dra. Ana Silva – Ginecologia", esp: "Fertilidade", rating: 4.9, reviews: 215, dist: "4.8 km" },
  { nome: "Especialistas em Endo", esp: "Endometriose", rating: 4.7, reviews: 67, dist: "5.2 km" },
];

const clinicColors = [
  "bg-primary/15 text-primary",
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-primary/10 text-primary",
];

const BuscarClinicas = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("Todas");

  const filtered = clinicas.filter(c => {
    const matchSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.esp.toLowerCase().includes(search.toLowerCase());
    const matchFiltro = filtro === "Todas" || c.esp === filtro;
    return matchSearch && matchFiltro;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/home")} className="text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Encontrar Especialistas</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar clínicas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-2xl pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {especialidades.map(esp => (
            <button
              key={esp}
              onClick={() => setFiltro(esp)}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold whitespace-nowrap transition-all ${
                filtro === esp
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {esp}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-4 space-y-3">
        {filtered.map((c, i) => (
          <motion.button
            key={c.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => navigate("/agendamento")}
            className="w-full bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-4 text-left hover:shadow-elevated transition-shadow"
          >
            {/* Clinic icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${clinicColors[i % clinicColors.length]}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2h6l3 7H6L9 2z" />
                <rect x="4" y="9" width="16" height="13" rx="2" />
                <path d="M12 13v4" />
                <path d="M10 15h4" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground text-sm truncate">{c.nome}</h3>
              <p className="text-xs text-primary font-display font-semibold mt-0.5">{c.esp}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-foreground font-medium">{c.rating}</span>
                  <span>({c.reviews})</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {c.dist}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default BuscarClinicas;
