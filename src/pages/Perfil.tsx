import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, MapPin, Calendar, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-6 pt-12 pb-8 rounded-b-[2rem] text-center">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 mx-auto flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-xl font-bold text-primary-foreground">Maria Silva</h1>
        <p className="text-sm text-primary-foreground/70">maria@email.com</p>
      </div>

      <div className="px-6 mt-6 space-y-3">
        {[
          { icon: Calendar, label: "Idade", value: "28 anos" },
          { icon: MapPin, label: "Cidade", value: "São Paulo" },
          { icon: Heart, label: "Ciclo", value: "Irregular" },
        ].map(item => (
          <div key={item.label} className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <item.icon className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-display">{item.label}</p>
              <p className="font-display font-semibold text-foreground text-sm">{item.value}</p>
            </div>
          </div>
        ))}

        <Button variant="hero-outline" className="w-full mt-4" onClick={() => navigate("/")}>
          <LogOut className="w-4 h-4 mr-1" /> Sair
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
