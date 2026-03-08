import { useLocation, useNavigate } from "react-router-dom";
import { Home, PenSquare, Sparkles, Building2, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Início", path: "/home" },
  { icon: PenSquare, label: "Registrar", path: "/registrar" },
  { icon: Sparkles, label: "IA", path: "/relatorio" },
  { icon: Building2, label: "Clínicas", path: "/clinicas" },
  { icon: User, label: "Perfil", path: "/perfil" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-display font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
