
'use client'

import { useState, useEffect, useRef } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  MessageSquare, 
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  Mic,
  Settings,
  History,
  Trash2,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage = () => {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock initial messages
  const initialMessages: Message[] = [
    {
      id: 1,
      content: "Olá! Sou sua assistente de IA especializada em análise de reuniões. Como posso ajudá-lo hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
    setMessages(initialMessages);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: "Entendi sua pergunta. Baseando-me na análise das suas reuniões, posso sugerir algumas estratégias para melhorar a produtividade da sua equipe...",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 text-lg">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-xl border-b border-white/20 p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Chat com IA</h1>
                  <p className="text-slate-600">Assistente inteligente para suas reuniões</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <EnhancedButton
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-white/30 text-slate-700 hover:bg-white/70"
                >
                  <History className="w-4 h-4 mr-2" />
                  Histórico
                </EnhancedButton>
                <EnhancedButton
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-white/30 text-slate-700 hover:bg-white/70"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Conversa
                </EnhancedButton>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6">
          {/* Messages Area */}
          <Card className="flex-1 bg-white/70 backdrop-blur-xl border-white/30 shadow-xl mb-4 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'bg-white/50 text-slate-800 border border-white/30'
                      } rounded-2xl p-4 shadow-lg backdrop-blur-xl`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-white/20' 
                              : 'bg-gradient-to-br from-blue-600 to-purple-600'
                          }`}>
                            {message.sender === 'user' ? 
                              <User className="w-4 h-4" /> : 
                              <Bot className="w-4 h-4 text-white" />
                            }
                          </div>
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/50 border border-white/30 rounded-2xl p-4 shadow-lg backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </Card>

          {/* Input Area */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/30 shadow-xl">
            <div className="p-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-white/50 border-white/50 text-slate-800 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                    rows={1}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <EnhancedButton
                    variant="outline"
                    size="sm"
                    className="bg-white/30 border-white/50 text-slate-700 hover:bg-white/50"
                  >
                    <Mic className="w-4 h-4" />
                  </EnhancedButton>
                  
                  <EnhancedButton
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
