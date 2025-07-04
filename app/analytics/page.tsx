
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { Sidebar } from "../../components/ui/sidebar";
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
  Eye,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Zap,
  Brain,
  MessageSquare,
  Mic,
  PlayCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";

const Analytics = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Métricas mais úteis e práticas para implementação backend
  const kpiData = [
    {
      title: "Reuniões Transcritas",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-600 to-cyan-600",
      description: "Total de reuniões processadas"
    },
    {
      title: "Tempo de Áudio Processado",
      value: "87h",
      change: "+23%",
      trend: "up",
      icon: Clock,
      color: "from-green-600 to-emerald-600",
      description: "Horas de conteúdo analisado"
    },
    {
      title: "Usuários Ativos",
      value: "43",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "from-purple-600 to-violet-600",
      description: "Usuários que usaram o sistema"
    },
    {
      title: "Taxa de Precisão IA",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Brain,
      color: "from-orange-600 to-red-600",
      description: "Precisão da transcrição"
    },
    {
      title: "Insights Gerados",
      value: "328",
      change: "+31%",
      trend: "up",
      icon: Target,
      color: "from-pink-600 to-rose-600",
      description: "Resumos e análises criadas"
    },
    {
      title: "Palavras-chave Extraídas",
      value: "1,247",
      change: "+15%",
      trend: "up",
      icon: MessageSquare,
      color: "from-indigo-600 to-purple-600",
      description: "Termos importantes identificados"
    }
  ];

  const meetingAnalytics = [
    {
      id: 1,
      title: "Reunião de Planejamento Q4",
      date: "2024-01-15",
      duration: "2h 15min",
      participants: 8,
      engagement: 87,
      transcriptionAccuracy: 94,
      keyTopics: ["estratégia", "orçamento", "metas"],
      sentiment: "positivo",
      wordsPerMinute: 150,
      silencePercentage: 12
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14",
      duration: "32min",
      participants: 5,
      engagement: 92,
      transcriptionAccuracy: 96,
      keyTopics: ["bugs", "features", "deploy"],
      sentiment: "neutro",
      wordsPerMinute: 180,
      silencePercentage: 8
    },
    {
      id: 3,
      title: "Client Presentation - Alpha",
      date: "2024-01-13",
      duration: "1h 45min",
      participants: 12,
      engagement: 76,
      transcriptionAccuracy: 89,
      keyTopics: ["proposta", "cronograma", "aprovação"],
      sentiment: "positivo",
      wordsPerMinute: 140,
      silencePercentage: 15
    }
  ];

  const topTopics = [
    { topic: "orçamento", mentions: 47, trend: "up", category: "Financeiro" },
    { topic: "estratégia", mentions: 34, trend: "up", category: "Planejamento" },
    { topic: "cronograma", mentions: 29, trend: "down", category: "Projetos" },
    { topic: "equipe", mentions: 23, trend: "up", category: "Recursos Humanos" },
    { topic: "cliente", mentions: 19, trend: "up", category: "Relacionamento" }
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
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
        <header className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-purple-400" />
                Analytics & Insights
              </h1>
              <p className="text-slate-300">
                Análises inteligentes das suas reuniões e produtividade
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
                Exportar
              </EnhancedButton>
            </div>
          </motion.div>
        </header>

        <main className="p-6 space-y-8">
          {/* Period Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-1 w-fit">
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
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                        <kpi.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                        {kpi.change}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {kpi.value}
                      </h3>
                      <p className="text-slate-400 text-sm mb-1">
                        {kpi.title}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {kpi.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Meeting Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-400" />
                      Análise Detalhada de Reuniões
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Performance e métricas das reuniões recentes
                    </CardDescription>
                  </div>
                  <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </EnhancedButton>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {meetingAnalytics.map((meeting) => (
                    <motion.div 
                      key={meeting.id}
                      whileHover={{ scale: 1.01, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{meeting.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            meeting.sentiment === 'positivo' 
                              ? 'bg-green-600/20 text-green-300 border-green-500/30'
                              : meeting.sentiment === 'neutro'
                              ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                              : 'bg-red-600/20 text-red-300 border-red-500/30'
                          }`}
                        >
                          {meeting.sentiment}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(meeting.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {meeting.participants} pessoas
                        </div>
                        <div className="flex items-center">
                          <Brain className="w-4 h-4 mr-1" />
                          {meeting.transcriptionAccuracy}% precisão
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          {meeting.engagement}% engajamento
                        </div>
                        <div className="flex items-center">
                          <Mic className="w-4 h-4 mr-1" />
                          {meeting.wordsPerMinute} pal/min
                        </div>
                        <div className="flex items-center">
                          <PlayCircle className="w-4 h-4 mr-1" />
                          {meeting.silencePercentage}% silêncio
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {meeting.keyTopics.map((topic, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline" 
                            className="text-xs bg-purple-600/10 text-purple-300 border-purple-500/30"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  Tópicos Mais Discutidos
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Assuntos frequentes nas suas reuniões
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {topTopics.map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.topic}</p>
                          <p className="text-slate-400 text-sm">{item.mentions} menções • {item.category}</p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center text-sm font-medium ${
                        item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  Insights da IA
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Análises inteligentes geradas automaticamente
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                      <h4 className="font-semibold text-white">Produtividade</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      Suas reuniões são 23% mais eficientes que a média do setor.
                    </p>
                    <p className="text-green-400 text-xs">Excelente performance!</p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="font-semibold text-white">Engajamento</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      O engajamento da equipe aumentou 15% nas últimas 4 semanas.
                    </p>
                    <p className="text-green-400 text-xs">Tendência positiva</p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <div className="flex items-center mb-2">
                      <Activity className="w-5 h-5 text-purple-400 mr-2" />
                      <h4 className="font-semibold text-white">Recomendação</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      Considere reuniões mais curtas para manter o foco alto.
                    </p>
                    <p className="text-yellow-400 text-xs">Otimização sugerida</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
