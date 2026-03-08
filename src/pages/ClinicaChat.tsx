import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

type Message = { text: string; from: "clinic" | "patient"; time: string };

const initialMessages: Message[] = [
  { text: "Olá, gostaria de confirmar minha consulta de amanhã.", from: "patient", time: "10:15" },
  { text: "Confirmada! Pode trazer seus exames mais recentes.", from: "clinic", time: "10:18" },
];

const ClinicaChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    setMessages(prev => [...prev, { text: input, from: "clinic", time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}` }]);
    setInput("");
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="gradient-primary px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/clinica/painel")} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-display font-bold text-primary-foreground text-sm">Maria Silva</h2>
          <p className="text-[10px] text-primary-foreground/70">Paciente</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "clinic" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              m.from === "clinic"
                ? "gradient-primary text-primary-foreground rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md"
            }`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === "clinic" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border bg-card flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Responder paciente..."
          className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <button onClick={send} className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ClinicaChat;
