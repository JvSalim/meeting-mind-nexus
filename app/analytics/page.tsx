
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { Sidebar } from "../../components/ui/sidebar";
import { Input } from "../../components/ui/input";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Brain,
  MessageSquare,
  Mic,
  PlayCircle,
  Edit3,
  Plus,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Analytics = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const router = useRouter();

  // Métricas editáveis para análise de negócios
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: 1, name: "ROI das Reuniões", value: "234%", isEditable: true, category: "Financeiro" },
    { id: 2, name: "Custo por Reunião", value: "R$ 450", isEditable: true, category: "Financeiro" },
    { id: 3, name: "Produtividade da Equipe", value: "87%", isEditable: true, category: "Performance" },
    { id: 4, name: "Taxa de Implementação", value: "73%", isEditable: true, category: "Performance" },
  ]);

  // Métricas automáticas do sistema
  const automaticMetrics = [
    { name: "Reuniões Transcritas", value: "156", description: "Total processado automaticamente" },
    { name: "Horas de Áudio", value: "87h", description: "Tempo total transcrito" },
    { name: "Precisão IA", value: "94.2%", description: "Qualidade da transcrição automática" },
    { name: "Palavras Extraídas", value: "12.7K", description: "Termos identificados automaticamente" }
  ];

  const [meetingInsights, setMeetingInsights] = useState([
    {
      id: 1,
      title: "Reunião Estratégica Q1",
      date: "2024-01-15",
      duration: "2h 15min",
      participants: 8,
      keyDecisions: ["Aprovação de orçamento", "Expansão de equipe"],
      actionItems: [
        { task: "Contratar 3 desenvolvedores", responsible: "RH", deadline: "15/02/2024", completed: false },
        { task: "Definir métricas de performance", responsible: "Gerência", deadline: "10/02/2024", completed: true }
      ],
      isEditable: true
    },
    {
      id: 2,
      title: "Review Semanal - Tech",
      date: "2024-01-14",
      duration: "45min",
      participants: 5,
      keyDecisions: ["Migração para nova arquitetura"],
      actionItems: [
        { task: "Documentar APIs", responsible: "Dev Team", deadline: "20/01/2024", completed: false },
        { task: "Setup ambiente de testes", responsible: "DevOps", deadline: "18/01/2024", completed: true }
      ],
      isEditable: true
    }
  ]);

  const trendingTopics = [
    { topic: "Estratégia de Crescimento", mentions: 47, growth: "+12%", priority: "Alta" },
    { topic: "Otimização de Processos", mentions: 34, growth: "+8%", priority: "Média" },
    { topic: "Satisfação do Cliente", mentions: 29, growth: "-3%", priority: "Alta" },
    { topic: "Inovação Tecnológica", mentions: 23, growth: "+15%", priority: "Média" }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleEditMetric = (id: string) => {
    setEditingMetric(editingMetric === id ? null : id);
  };

  const handleUpdateActionItem = (meetingId: number, itemIndex: number, field: string, value: any) => {
    setMeetingInsights(prev => 
      prev.map(meeting => 
        meeting.id === meetingId 
          ? {
              ...meeting,
              actionItems: meeting.actionItems.map((item, index) => 
                index === itemIndex ? { ...item, [field]: value } : item
              )
            }
          : meeting
      )
    );
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
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-purple-400" />
                Analytics Avançado
              </h1>
              <p className="text-slate-300">
                Análise profunda de dados e insights de negócios
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700/50 text-white w-64"
                />
              </div>
              
              <EnhancedButton variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </EnhancedButton>
            </div>
          </div>
        </motion.header>

        <main className="p-6 space-y-8">
          {/* Period & Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          >
            <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-1">
              {[
                { key: '7d', label: '7 dias' },
                { key: '30d', label: '30 dias' },
                { key: '90d', label: '90 dias' },
                { key: '1y', label: '1 ano' }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    selectedPeriod === period.key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            <EnhancedButton variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Filtros Avançados
            </EnhancedButton>
          </motion.div>

          {/* Layout em 3 colunas */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Coluna 1: Métricas Automáticas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-400" />
                    Métricas Automáticas
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Dados coletados automaticamente pelo sistema
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {automaticMetrics.map((metric, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white text-lg">{metric.value}</h4>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-slate-300 font-medium">{metric.name}</p>
                      <p className="text-slate-400 text-sm">{metric.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Tópicos em Tendência
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {trendingTopics.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                      >
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{item.topic}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-400 text-xs">{item.mentions} menções</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                item.priority === 'Alta' 
                                  ? 'bg-red-600/20 text-red-300 border-red-500/30'
                                  : 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className={`flex items-center text-sm font-medium ${
                          item.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.growth.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="ml-1">{item.growth}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coluna 2: Métricas Editáveis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-400" />
                      Métricas de Negócio
                    </div>
                    <EnhancedButton size="sm" variant="outline" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </EnhancedButton>
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Métricas personalizáveis para seu negócio
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {businessMetrics.map((metric) => (
                    <motion.div 
                      key={metric.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + metric.id * 0.1, duration: 0.3 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{metric.name}</h4>
                        <div className="flex items-center space-x-2">
                          <EnhancedButton 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEditMetric(metric.id.toString())}
                            className="text-slate-400 hover:text-white p-1"
                          >
                            <Edit3 className="w-4 h-4" />
                          </EnhancedButton>
                          <EnhancedButton 
                            size="sm" 
                            variant="ghost"
                            className="text-slate-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </EnhancedButton>
                        </div>
                      </div>
                      
                      {editingMetric === metric.id.toString() ? (
                        <Input
                          defaultValue={metric.value}
                          className="bg-slate-800/50 border-slate-600/50 text-white mb-2"
                          placeholder="Digite o novo valor..."
                        />
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-purple-300">{metric.value}</span>
                          <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                            {metric.category}
                          </Badge>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Coluna 3: Insights de Reuniões */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-orange-400" />
                    Insights de Reuniões
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Análise detalhada das reuniões recentes
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {meetingInsights.map((meeting) => (
                    <motion.div 
                      key={meeting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + meeting.id * 0.1, duration: 0.3 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white text-sm">{meeting.title}</h4>
                        <EnhancedButton 
                          size="sm" 
                          variant="ghost"
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <Edit3 className="w-3 h-3" />
                        </EnhancedButton>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-slate-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(meeting.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {meeting.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {meeting.participants} pessoas
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-slate-300 text-xs font-medium mb-2">Decisões Chave:</p>
                          {meeting.keyDecisions.map((decision, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline" 
                              className="text-xs bg-green-600/10 text-green-300 border-green-500/30 mr-1 mb-1"
                            >
                              {decision}
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <p className="text-slate-300 text-xs font-medium mb-2">Action Items:</p>
                          <div className="space-y-2">
                            {meeting.actionItems.map((item, idx) => (
                              <div key={idx} className="flex items-start space-x-2 text-xs">
                                <input
                                  type="checkbox"
                                  checked={item.completed}
                                  onChange={(e) => handleUpdateActionItem(meeting.id, idx, 'completed', e.target.checked)}
                                  className="mt-1 w-3 h-3 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                                />
                                <div className="flex-1">
                                  <p className={`text-slate-300 ${item.completed ? 'line-through opacity-60' : ''}`}>
                                    {item.task}
                                  </p>
                                  <p className="text-slate-500 text-xs">
                                    {item.responsible} • {item.deadline}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
