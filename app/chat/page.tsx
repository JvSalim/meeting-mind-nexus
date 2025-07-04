
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
  ThumbsDown
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 flex-shrink-0"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <MessageSquare className="w-8 h-8 mr-3 text-purple-400" />
                Chat IA
              </h1>
              <p className="text-slate-300">
                Converse com sua assistente inteligente sobre reuniões
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={handleClearChat}
                className="bg-slate-800/50 border-slate-700/50 text-slate-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Limpar Chat
              </EnhancedButton>
            </div>
          </div>
        </motion.header>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                            : 'bg-gradient-to-br from-emerald-500 to-teal-500'
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
                          className={`p-4 rounded-2xl shadow-lg max-w-full ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                              : 'bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 text-slate-100'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </motion.div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-slate-400">
                            {message.timestamp.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-1">
                              <button className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-green-400 transition-colors">
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-red-400 transition-colors">
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                              <button className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-blue-400 transition-colors">
                                <Copy className="w-3 h-3" />
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
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 p-4 rounded-2xl">
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

            {/* Input Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm p-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Digite sua pergunta sobre reuniões..."
                      className="w-full bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 py-3 text-base"
                      disabled={isTyping}
                    />
                  </div>
                  <EnhancedButton
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3"
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-80 border-l border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-6 hidden xl:block"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                  Perguntas Sugeridas
                </h3>
                <div className="space-y-3">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 text-sm"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  Funcionalidades IA
                </h3>
                <div className="space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-center mb-2">
                      <Search className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm font-medium text-white">Busca Inteligente</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Encontre informações específicas em suas reuniões
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-sm font-medium text-white">Resumos Automáticos</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Gere resumos executivos das suas reuniões
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-sm font-medium text-white">Análise Temporal</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Analise padrões e tendências ao longo do tempo
                    </p>
                  </motion.div>
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
