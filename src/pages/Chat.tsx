import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Paperclip } from "lucide-react";

type Message = { text: string; from: "user" | "clinic"; time: string };

const initialMessages: Message[] = [
  { text: "Olá, tenho uma consulta amanhã e queria saber se preciso levar exames.", from: "user", time: "14:30" },
  { text: "Sim, se tiver ultrassom recente pode trazer. Também é bom ter seu relatório de sintomas.", from: "clinic", time: "14:32" },
];

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    setMessages(prev => [...prev, { text: input, from: "user", time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}` }]);
    setInput("");
    // Simulated reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Perfeito! Aguardamos você amanhã. Qualquer dúvida, estamos aqui.",
        from: "clinic",
        time: `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, "0")}`,
      }]);
    }, 1500);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-primary px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-display font-bold text-primary-foreground text-sm">Clínica Saúde da Mulher</h2>
          <p className="text-[10px] text-primary-foreground/70">Consulta — 14 junho</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              m.from === "user"
                ? "gradient-primary text-primary-foreground rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md"
            }`}>
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card flex items-center gap-2">
        <button className="text-muted-foreground">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
        />
        <button onClick={send} className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
