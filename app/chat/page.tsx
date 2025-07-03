
'use client'

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { 
  Send,
  Bot,
  User,
  Sparkles,
  Brain,
  Clock,
  FileText,
  Search,
  Mic,
  MicOff,
  Settings,
  RotateCcw,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou seu assistente de IA especializado em análise de reuniões. Como posso ajudá-lo hoje? Posso responder perguntas sobre suas reuniões, gerar relatórios, ou fornecer insights sobre produtividade.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI typing
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Com base na análise das suas últimas reuniões, posso ver que o engajamento da equipe tem aumentado consistentemente. Gostaria que eu detalhe essas métricas?",
        "Identifiquei alguns padrões interessantes nos tópicos discutidos. As reuniões sobre 'estratégia' têm sido 30% mais longas que a média. Posso sugerir otimizações?",
        "Sua produtividade em reuniões está acima da média do setor. Baseado nos dados, recomendo manter reuniões entre 30-45 minutos para máxima eficiência.",
        "Analisando as transcrições, notei que decisões importantes são tomadas mais rapidamente quando há menos de 8 participantes. Quer que eu gere um relatório detalhado?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => prev.map(msg => 
        msg.isTyping ? { ...msg, content: randomResponse, isTyping: false } : msg
      ));
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Resumir últimas reuniões", icon: FileText },
    { text: "Analisar produtividade", icon: Brain },
    { text: "Gerar relatório semanal", icon: Download },
    { text: "Buscar por tópico", icon: Search }
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would implement speech recognition
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto h-[calc(100vh-3rem)] flex flex-col">
          {/* Header */}
          <FadeInSection>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Chat IA Inteligente
                </h1>
                <p className="text-slate-300 text-lg">
                  Converse com IA sobre suas reuniões e obtenha insights valiosos
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <EnhancedButton variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </EnhancedButton>
                
                <EnhancedButton variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Nova Conversa
                </EnhancedButton>
              </div>
            </div>
          </FadeInSection>

          <div className="flex-1 flex gap-6">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <Card className="flex-1 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm flex flex-col">
                {/* Messages */}
                <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === 'user' 
                                ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                                : 'bg-gradient-to-br from-purple-500 to-pink-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-5 h-5 text-white" />
                              ) : (
                                <Bot className="w-5 h-5 text-white" />
                              )}
                            </div>
                            
                            {/* Message Content */}
                            <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                              <div className={`inline-block p-4 rounded-2xl max-w-full ${
                                message.type === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                  : 'bg-slate-700/50 text-slate-100 border border-slate-600/50'
                              }`}>
                                {message.isTyping ? (
                                  <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                    <span className="text-sm text-slate-400">IA está digitando...</span>
                                  </div>
                                ) : (
                                  <p className="whitespace-pre-wrap">{message.content}</p>
                                )}
                              </div>
                              
                              {/* Message Actions */}
                              {!message.isTyping && message.type === 'assistant' && (
                                <div className="flex items-center space-x-2 mt-2">
                                  <button
                                    onClick={() => copyMessage(message.content)}
                                    className="p-1 text-slate-400 hover:text-white transition-colors"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 text-slate-400 hover:text-green-400 transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                                    <ThumbsDown className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                              
                              <div className="text-xs text-slate-400 mt-1">
                                {message.timestamp.toLocaleTimeString('pt-BR', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="p-6 border-t border-slate-700/50">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta sobre reuniões, análises ou insights..."
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 pr-12 py-3 min-h-[3rem] resize-none"
                        disabled={isLoading}
                      />
                      
                      <button
                        onClick={toggleListening}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                          isListening 
                            ? 'text-red-400 bg-red-600/20' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-600/50'
                        }`}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <EnhancedButton
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-3"
                    >
                      <Send className="w-5 h-5" />
                    </EnhancedButton>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-6">
              {/* Quick Actions */}
              <FadeInSection>
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                      Ações Rápidas
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInputValue(action.text)}
                        className="w-full p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-lg text-left transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <action.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                          <span className="text-slate-200 group-hover:text-white">{action.text}</span>
                        </div>
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>
              </FadeInSection>

              {/* Recent Topics */}
              <FadeInSection>
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-400" />
                      Tópicos Recentes
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    {[
                      'Análise de produtividade Q4',
                      'Relatório de engajamento',
                      'Otimização de reuniões',
                      'Insights de IA sobre vendas'
                    ].map((topic, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-700/20 rounded-lg border border-slate-600/20 hover:bg-slate-700/30 transition-colors cursor-pointer"
                      >
                        <p className="text-slate-300 text-sm">{topic}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </FadeInSection>

              {/* AI Status */}
              <FadeInSection>
                <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white font-medium">IA Online</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between">
                        <span>Precisão:</span>
                        <span className="text-green-400">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tempo de resposta:</span>
                        <span className="text-blue-400">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dados processados:</span>
                        <span className="text-purple-400">156 reuniões</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Chat;
