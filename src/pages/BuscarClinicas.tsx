import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Search, Phone, Clock, Navigation, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const especialidades = ["Todas", "Endometriose", "SOP", "Fertilidade", "Ginecologia"];

const clinicas = [
  {
    nome: "Centro de Saúde da Mulher",
    esp: "Endometriose",
    rating: 4.8,
    reviews: 128,
    dist: "2.3 km",
    endereco: "Rua Augusta, 1200 — Consolação, São Paulo - SP",
    telefone: "(11) 3456-7890",
    horario: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
    lat: -23.5558,
    lng: -46.6625,
  },
  {
    nome: "Clínica FemCare",
    esp: "SOP",
    rating: 4.6,
    reviews: 94,
    dist: "3.1 km",
    endereco: "Av. Paulista, 800 — Bela Vista, São Paulo - SP",
    telefone: "(11) 3789-0123",
    horario: "Seg-Sex: 7h-19h | Sáb: 8h-13h",
    lat: -23.5631,
    lng: -46.6544,
  },
  {
    nome: "Dra. Ana Silva – Ginecologia",
    esp: "Fertilidade",
    rating: 4.9,
    reviews: 215,
    dist: "4.8 km",
    endereco: "Rua Oscar Freire, 450 — Pinheiros, São Paulo - SP",
    telefone: "(11) 3567-8901",
    horario: "Seg-Sex: 9h-17h",
    lat: -23.5627,
    lng: -46.6725,
  },
  {
    nome: "Especialistas em Endo",
    esp: "Endometriose",
    rating: 4.7,
    reviews: 67,
    dist: "5.2 km",
    endereco: "Rua Haddock Lobo, 595 — Cerqueira César, São Paulo - SP",
    telefone: "(11) 3234-5678",
    horario: "Seg-Sex: 8h-18h",
    lat: -23.5589,
    lng: -46.6667,
  },
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
  const [selectedClinica, setSelectedClinica] = useState<typeof clinicas[0] | null>(null);

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
            onClick={() => setSelectedClinica(c)}
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

      {/* Clinic Details Modal */}
      <AnimatePresence>
        {selectedClinica && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedClinica(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card w-full max-w-sm rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-foreground text-lg">{selectedClinica.nome}</h3>
                <button onClick={() => setSelectedClinica(null)} className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div className="gradient-soft rounded-2xl p-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="font-display font-bold text-foreground text-lg">{selectedClinica.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({selectedClinica.reviews} avaliações)</span>
                  <span className="ml-auto px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-display font-semibold">
                    {selectedClinica.esp}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Endereço</p>
                      <p className="text-xs text-muted-foreground">{selectedClinica.endereco}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Telefone</p>
                      <p className="text-xs text-muted-foreground">{selectedClinica.telefone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Horário</p>
                      <p className="text-xs text-muted-foreground">{selectedClinica.horario}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Navigation className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">Distância</p>
                      <p className="text-xs text-muted-foreground">{selectedClinica.dist} de você</p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-muted rounded-2xl h-32 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground font-display">Ver no mapa</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <Button variant="hero" size="lg" className="flex-1" onClick={() => { setSelectedClinica(null); navigate("/agendamento"); }}>
                    Solicitar consulta
                  </Button>
                  <Button variant="hero-outline" size="lg" className="flex-1" onClick={() => { setSelectedClinica(null); navigate("/chat"); }}>
                    <MessageSquare className="w-4 h-4 mr-1" /> Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default BuscarClinicas;
