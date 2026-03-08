import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryScreen from "./pages/EntryScreen";
import CadastroUsuaria from "./pages/CadastroUsuaria";
import Onboarding from "./pages/Onboarding";
import HomePage from "./pages/HomePage";
import RegistrarSintomas from "./pages/RegistrarSintomas";
import Relatorio from "./pages/Relatorio";
import BuscarClinicas from "./pages/BuscarClinicas";
import Agendamento from "./pages/Agendamento";
import Chat from "./pages/Chat";
import Perfil from "./pages/Perfil";
import Notificacoes from "./pages/Notificacoes";
import ClinicaCadastro from "./pages/ClinicaCadastro";
import ClinicaPainel from "./pages/ClinicaPainel";
import ClinicaChat from "./pages/ClinicaChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryScreen />} />
          <Route path="/cadastro" element={<CadastroUsuaria />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/registrar" element={<RegistrarSintomas />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/clinicas" element={<BuscarClinicas />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/clinica/cadastro" element={<ClinicaCadastro />} />
          <Route path="/clinica/painel" element={<ClinicaPainel />} />
          <Route path="/clinica/chat" element={<ClinicaChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
