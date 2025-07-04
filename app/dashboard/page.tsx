
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Search, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  Brain,
  Zap,
  BarChart3,
  Plus,
  Eye,
  Clock,
  Users,
  Bot,
  Sparkles,
  Star,
  Upload,
  Activity,
  Target,
  CheckCircle,
  FileText,
  Mic,
  PlayCircle,
  Timer,
  Award,
  Bookmark
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Métricas úteis para o backend
  const stats = [
    { 
      title: "Reuniões Este Mês", 
      value: "24", 
      change: "+12%", 
      icon: Calendar,
      color: "from-blue-600 to-cyan-600",
      description: "Reuniões processadas"
    },
    { 
      title: "Horas de Áudio", 
      value: "87h", 
      change: "+23%", 
      icon: Clock,
      color: "from-green-600 to-emerald-600",
      description: "Tempo total transcrito"
    },
    { 
      title: "Insights Gerados", 
      value: "142", 
      change: "+31%", 
      icon: Brain,
      color: "from-purple-600 to-violet-600",
      description: "Resumos automáticos"
    },
    { 
      title: "Taxa de Precisão", 
      value: "94.2%", 
      change: "+2.1%", 
      icon: Target,
      color: "from-orange-600 to-red-600",
      description: "Qualidade da IA"
    },
    {
      title: "Participantes Únicos",
      value: "67",
      change: "+8%",
      icon: Users,
      color: "from-pink-600 to-rose-600",
      description: "Pessoas diferentes"
    },
    {
      title: "Palavras Transcritas",
      value: "125K",
      change: "+18%",
      icon: FileText,
      color: "from-indigo-600 to-purple-600",
      description: "Total de palavras"
    }
  ];

  // Dados de reuniões recentes com mais métricas
  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Q1",
      date: "2024-01-15",
      duration: "1h 23min",
      platform: "Google Meet",
      participants: 8,
      keyTopics: ["orçamento", "estratégia", "timeline"],
      status: "processada",
      transcriptionAccuracy: 94,
      sentiment: "positivo",
      priority: "alta"
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14", 
      duration: "32min",
      platform: "Zoom",
      participants: 5,
      keyTopics: ["bugs", "features", "deploy"],
      status: "processada",
      transcriptionAccuracy: 96,
      sentiment: "neutro",
      priority: "média"
    },
    {
      id: 3,
      title: "Client Presentation - Project Alpha",
      date: "2024-01-13",
      duration: "2h 15min", 
      platform: "Teams",
      participants: 12,
      keyTopics: ["proposta", "cronograma", "aprovação"],
      status: "processando",
      transcriptionAccuracy: 89,
      sentiment: "positivo",
      priority: "alta"
    }
  ];

  const quickActions = [
    {
      title: "Nova Reunião",
      description: "Agendar ou iniciar reunião",
      icon: Plus,
      color: "from-purple-600 to-blue-600",
      href: "/meetings"
    },
    {
      title: "Upload de Áudio",
      description: "Analisar reunião gravada",
      icon: Upload,
      color: "from-green-600 to-emerald-600",
      href: "/upload"
    },
    {
      title: "Chat IA",
      description: "Perguntas sobre reuniões",
      icon: Bot,
      color: "from-orange-600 to-red-600",
      href: "/chat"
    },
    {
      title: "Ver Analytics",
      description: "Relatórios e insights",
      icon: BarChart3,
      color: "from-pink-600 to-rose-600",
      href: "/analytics"
    }
  ];

  // Resumo de atividades recentes
  const recentActivity = [
    {
      id: 1,
      type: "meeting",
      title: "Reunião processada",
      description: "Daily Standup - Dev Team",
      time: "2 horas atrás",
      icon: CheckCircle,
      color: "text-green-400"
    },
    {
      id: 2,
      type: "insight",
      title: "Novo insight gerado",
      description: "Análise de produtividade disponível",
      time: "4 horas atrás",
      icon: Brain,
      color: "text-purple-400"
    },
    {
      id: 3,
      type: "upload",
      title: "Áudio carregado",
      description: "Client Presentation processando",
      time: "6 horas atrás",
      icon: Upload,
      color: "text-blue-400"
    }
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults = [
        {
          meetingTitle: "Reunião de Planejamento Q1",
          date: "2024-01-15",
          snippet: "Discutimos o orçamento para o próximo trimestre, com foco em marketing digital e expansão da equipe.",
          confidence: 0.95,
          type: "meeting"
        },
        {
          meetingTitle: "Client Presentation - Project Alpha",
          date: "2024-01-13",
          snippet: "O cliente aprovou a proposta inicial e solicitou ajustes no cronograma de entrega.",
          confidence: 0.87,
          type: "presentation"
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
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
            <Brain className="w-8 h-8 text-white" />
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
              <h1 className="text-3xl font-bold text-white mb-2">
                Bem-vindo, {user?.name || user?.companyName || 'Usuário'}!
              </h1>
              <p className="text-slate-300">
                Aqui está um resumo das suas atividades recentes
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Pesquisar reuniões..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 w-80 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>
              <EnhancedButton 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                {isSearching ? <Brain className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              </EnhancedButton>
            </div>
          </motion.div>
        </header>

        <main className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-green-400 text-sm font-medium">
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-slate-400 text-sm mb-1">
                        {stat.title}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Ações Rápidas
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Acesse rapidamente as principais funcionalidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={action.href}>
                          <div className={`p-6 bg-gradient-to-r ${action.color} rounded-lg text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200`}>
                            <action.icon className="w-8 h-8 mb-4" />
                            <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                            <p className="text-sm opacity-90">{action.description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-green-400" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.02, x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/30 transition-all duration-200"
                      >
                        <div className={`w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center ${activity.color}`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium">{activity.title}</h4>
                          <p className="text-slate-400 text-xs">{activity.description}</p>
                          <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Search Results */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    Resultados da Busca IA
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Encontrei {searchResults.length} resultados relevantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.01, x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 border border-slate-700/50 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{result.meetingTitle}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-slate-600/50 text-slate-300 border-slate-500/50">
                              {result.type}
                            </Badge>
                            <Badge variant="outline" className="bg-slate-600/50 text-slate-300 border-slate-500/50">
                              {result.date}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-3">{result.snippet}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-400">
                              Confiança: {(result.confidence * 100).toFixed(0)}%
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < Math.floor(result.confidence * 5) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-slate-600'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <EnhancedButton 
                            variant="outline" 
                            size="sm"
                            className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                          >
                            Ver Transcrição
                          </EnhancedButton>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Recent Meetings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    Reuniões Recentes
                  </CardTitle>
                  <Link href="/meetings">
                    <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Todas
                    </EnhancedButton>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeetings.map((meeting) => (
                    <motion.div 
                      key={meeting.id}
                      whileHover={{ scale: 1.01, x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between p-4 border border-slate-700/50 rounded-lg hover:bg-slate-700/30 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="w-5 h-5 text-purple-400" />
                          <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {meeting.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              meeting.priority === 'alta' 
                                ? 'bg-red-600/20 text-red-300 border-red-500/30'
                                : meeting.priority === 'média'
                                ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                                : 'bg-green-600/20 text-green-300 border-green-500/30'
                            }`}
                          >
                            {meeting.priority}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-sm text-slate-400">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(meeting.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Timer className="w-4 h-4 mr-1" />
                            {meeting.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.participants} participantes
                          </span>
                          <span className="flex items-center">
                            <Brain className="w-4 h-4 mr-1" />
                            {meeting.transcriptionAccuracy}% precisão
                          </span>
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
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <Badge 
                          variant="outline" 
                          className={`${
                            meeting.status === 'processada' 
                              ? 'bg-green-600/20 text-green-300 border-green-500/30'
                              : 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                          }`}
                        >
                          {meeting.status}
                        </Badge>
                        
                        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                          {meeting.platform}
                        </Badge>
                        
                        <EnhancedButton 
                          variant="ghost" 
                          size="sm"
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/10"
                        >
                          <Eye className="w-4 h-4" />
                        </EnhancedButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
