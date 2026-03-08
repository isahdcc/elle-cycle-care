import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/BottomNav";

const clinicas = [
  { nome: "Clínica Saúde da Mulher", esp: "Endometriose", rating: 4.8, dist: "2.3 km", cidade: "São Paulo" },
  { nome: "Centro Feminino Vida", esp: "Fertilidade", rating: 4.6, dist: "3.1 km", cidade: "São Paulo" },
  { nome: "Instituto Mulher", esp: "SOP", rating: 4.9, dist: "5.0 km", cidade: "São Paulo" },
];

const BuscarClinicas = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = clinicas.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.esp.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-6 pt-8">
        <button onClick={() => navigate("/home")} className="text-primary mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-display text-2xl font-bold text-foreground">Buscar clínicas</h1>

        <div className="relative mt-4">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cidade ou especialidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 rounded-xl bg-muted/50 border-border"
          />
        </div>
      </div>

      <div className="px-6 mt-6 space-y-3">
        {filtered.map((c, i) => (
          <motion.div
            key={c.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <h3 className="font-display font-bold text-foreground">{c.nome}</h3>
            <p className="text-xs text-primary font-display font-semibold mt-1">{c.esp}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {c.rating}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {c.dist}
              </span>
            </div>
            <Button
              variant="hero"
              size="sm"
              className="mt-3 w-full"
              onClick={() => navigate("/agendamento")}
            >
              Agendar consulta
            </Button>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default BuscarClinicas;
