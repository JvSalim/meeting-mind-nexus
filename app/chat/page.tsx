
'use client'

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Send, 
  Bot, 
  User, 
  Brain, 
  Sparkles,
  MessageSquare,
  Calendar,
  FileText,
  Search,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou sua assistente de IA para reuniões. Posso ajudá-lo a encontrar informações, gerar resumos e responder perguntas sobre suas reuniões. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const suggestedQuestions = [
    "Quais foram os principais pontos da última reunião?",
    "Mostre-me as reuniões da semana passada",
    "Qual foi a decisão tomada sobre o orçamento?",
    "Quem participou da reunião de ontem?",
    "Gere um resumo das reuniões de janeiro"
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string) => {
    const responses = [
      "Encontrei 3 reuniões relacionadas à sua consulta. Na reunião de 15/01, foram discutidos os pontos principais sobre orçamento e estratégia de marketing. Os participantes chegaram a um consenso sobre aumentar o investimento em publicidade digital em 25%.",
      "Baseado nas suas reuniões recentes, identifiquei os seguintes temas recorrentes: planejamento estratégico (mencionado em 8 reuniões), questões de orçamento (6 reuniões) e desenvolvimento de produto (4 reuniões). Gostaria que eu detalhe algum desses tópicos?",
      "Analisando as transcrições, posso ver que sua equipe tem mantido um alto nível de engajamento nas reuniões, com uma média de 92% de participação ativa. As decisões mais importantes dos últimos 30 dias incluem a aprovação do novo sistema de CRM e a expansão da equipe de desenvolvimento.",
      "Encontrei informações sobre essa reunião específica. Participaram 6 pessoas, durou 1h 45min, e os principais action items foram: 1) Finalizar apresentação até sexta-feira (responsável: Maria), 2) Agendar reunião com cliente (responsável: João), 3) Revisar proposta comercial (responsável: Pedro)."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Chat limpo! Como posso ajudá-lo agora?',
        timestamp: new Date()
      }
    ]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
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
      
      <div className="flex-1 lg:ml-0 flex flex-col">
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>
          
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative p-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                      Chat Inteligente
                    </h1>
                    <p className="text-xl text-blue-100 font-medium">
                      Converse com sua assistente de IA sobre reuniões e insights
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <EnhancedButton
                    variant="outline"
                    onClick={handleClearChat}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-xl"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpar Chat
                  </EnhancedButton>
                </div>
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              >
                {[
                  { title: "Conversas Ativas", value: "12", icon: Activity, color: "from-emerald-500 to-teal-600" },
                  { title: "Insights Gerados", value: "89", icon: Brain, color: "from-blue-500 to-cyan-600" },
                  { title: "Tempo Economizado", value: "4.2h", icon: Zap, color: "from-purple-500 to-pink-600" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-blue-100 text-sm font-medium">{stat.title}</p>
                          </div>
                          <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.header>
        </div>

        <div className="flex-1 flex overflow-hidden -mt-8">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                              : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                          }`}
                        >
                          {message.type === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </motion.div>
                        
                        {/* Message Content */}
                        <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className={`p-6 rounded-3xl shadow-lg max-w-full ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'bg-white/80 backdrop-blur-xl border border-white/30 text-slate-800'
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </motion.div>
                          
                          <div className="flex items-center space-x-2 mt-3 px-2">
                            <span className="text-xs text-slate-500 font-medium">
                              {message.timestamp.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            
                            {message.type === 'bot' && (
                              <div className="flex items-center space-x-1">
                                <button className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-green-500 transition-all duration-200">
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-red-500 transition-all duration-200">
                                  <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-blue-500 transition-all duration-200">
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-t border-white/20 bg-white/30 backdrop-blur-xl p-8"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Digite sua pergunta sobre reuniões..."
                      className="w-full bg-white/70 backdrop-blur-xl border-white/30 text-slate-800 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20 py-4 px-6 text-base rounded-2xl shadow-lg"
                      disabled={isTyping}
                    />
                  </div>
                  <EnhancedButton
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-2xl shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Suggestions Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-80 border-l border-white/20 bg-white/30 backdrop-blur-xl p-8 hidden xl:block"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                  <Sparkles className="w-5 h-5 mr-3 text-purple-600" />
                  Perguntas Sugeridas
                </h3>
                <div className="space-y-3">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-4 bg-white/50 hover:bg-white/70 border border-white/30 hover:border-blue-300 rounded-2xl text-slate-700 hover:text-slate-900 transition-all duration-200 text-sm shadow-lg backdrop-blur-xl"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                  <Brain className="w-5 h-5 mr-3 text-blue-600" />
                  Funcionalidades IA
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Busca Inteligente", desc: "Encontre informações específicas", icon: Search, color: "from-green-500 to-emerald-600" },
                    { title: "Resumos Automáticos", desc: "Gere resumos executivos", icon: FileText, color: "from-blue-500 to-cyan-600" },
                    { title: "Análise Temporal", desc: "Analise padrões e tendências", icon: Calendar, color: "from-purple-500 to-pink-600" }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                      className="p-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mr-3`}>
                          <feature.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{feature.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
