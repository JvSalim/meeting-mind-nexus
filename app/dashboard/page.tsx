
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Home,
  Calendar,
  Upload,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  Plus,
  ArrowRight,
  Bell,
  Target,
  Zap,
  Edit3,
  Brain,
  Sparkles,
  Timer,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  // Métricas principais do dashboard com design inovador
  const mainMetrics = [
    {
      title: "Reuniões Processadas",
      value: "47",
      change: "+12 esta semana",
      icon: Brain,
      color: "from-violet-500 via-purple-500 to-indigo-500",
      bg: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      href: "/meetings"
    },
    {
      title: "Horas de Áudio",
      value: "156.8h",
      change: "Transcritas automaticamente",
      icon: Timer,
      color: "from-emerald-500 via-teal-500 to-cyan-500",
      bg: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      href: "/analytics"
    },
    {
      title: "Insights Gerados",
      value: "2,847",
      change: "Pontos de ação identificados",
      icon: Sparkles,
      color: "from-amber-500 via-orange-500 to-red-500",
      bg: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      href: "/analytics"
    },
    {
      title: "Eficiência Média",
      value: "94.2%",
      change: "Precisão das transcrições",
      icon: Activity,
      color: "from-rose-500 via-pink-500 to-fuchsia-500",
      bg: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
      href: "/analytics"
    }
  ];

  // Reuniões recentes com dados editáveis
  const [recentMeetings, setRecentMeetings] = useState([
    {
      id: 1,
      title: "Reunião de Planejamento Q1",
      date: "15/01/2024",
      duration: "1h 30min",
      participants: ["João Silva", "Maria Santos", "Pedro Lima"],
      status: "Processada",
      actionItems: 5,
      completedItems: 3,
      transcriptionReady: true,
      isEditable: true,
      priority: "high"
    },
    {
      id: 2,
      title: "Review Semanal - Desenvolvimento",
      date: "12/01/2024", 
      duration: "45min",
      participants: ["Ana Costa", "Carlos Mendes"],
      status: "Processando",
      actionItems: 3,
      completedItems: 2,
      transcriptionReady: false,
      isEditable: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Apresentação para Cliente Alpha",
      date: "10/01/2024",
      duration: "2h 15min", 
      participants: ["Roberto Alves", "Lucia Fernandes", "Marcos Oliveira", "Sofia Ribeiro"],
      status: "Processada",
      actionItems: 8,
      completedItems: 6,
      transcriptionReady: true,
      isEditable: true,
      priority: "high"
    }
  ]);

  // Action items pendentes
  const [pendingActions, setPendingActions] = useState([
    { id: 1, task: "Enviar proposta para cliente", responsible: "João Silva", deadline: "18/01/2024", priority: "Alta", completed: false },
    { id: 2, task: "Agendar reunião de follow-up", responsible: "Maria Santos", deadline: "20/01/2024", priority: "Média", completed: false },
    { id: 3, task: "Revisar documentação técnica", responsible: "Pedro Lima", deadline: "22/01/2024", priority: "Baixa", completed: false },
    { id: 4, task: "Preparar apresentação Q2", responsible: "Ana Costa", deadline: "25/01/2024", priority: "Alta", completed: false }
  ]);

  // Atalhos rápidos com design renovado
  const quickActions = [
    { title: "Nova Gravação", icon: Plus, href: "/upload", color: "from-blue-500 to-cyan-500", bg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
    { title: "Analisar Áudio", icon: Upload, href: "/upload", color: "from-green-500 to-emerald-500", bg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20" },
    { title: "Consultar IA", icon: MessageSquare, href: "/chat", color: "from-purple-500 to-violet-500", bg: "bg-gradient-to-br from-purple-500/20 to-violet-500/20" },
    { title: "Ver Relatórios", icon: BarChart3, href: "/analytics", color: "from-orange-500 to-red-500", bg: "bg-gradient-to-br from-orange-500/20 to-red-500/20" }
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

  const handleCompleteAction = (id: number) => {
    setPendingActions(prev => 
      prev.map(action => 
        action.id === id ? { ...action, completed: !action.completed } : action
      )
    );
  };

  const handleEditMeeting = (id: number) => {
    // Funcionalidade para editar reunião
    console.log(`Editando reunião ${id}`);
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
            <Home className="w-8 h-8 text-white" />
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
        {/* Header inovador */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-slate-900/90 via-purple-900/50 to-slate-900/90 backdrop-blur-xl border-b border-purple-500/20 p-8 sticky top-0 z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3 flex items-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                Central de Inteligência
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-slate-300 text-lg"
              >
                Bem-vindo de volta, {user?.name || user?.companyName}! Transforme suas reuniões em insights valiosos.
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="relative"
              >
                <EnhancedButton variant="outline" size="sm" className="bg-slate-800/50 border-purple-500/30 text-slate-300 hover:bg-purple-600/20 hover:border-purple-400/50">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </EnhancedButton>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <main className="p-8 space-y-10">
          {/* Métricas Principais com design inovador */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group"
              >
                <Link href={metric.href}>
                  <Card className={`relative overflow-hidden ${metric.bg} border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-purple-500/25`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <CardContent className="p-8 relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <metric.icon className="w-8 h-8 text-white" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                          {metric.value}
                        </h3>
                        <p className="text-slate-300 text-sm mb-1 font-medium">
                          {metric.title}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {metric.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Ações Rápidas com design renovado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-white flex items-center text-2xl">
                  <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  Acesso direto às funcionalidades principais
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.08, y: -6 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={action.href}>
                        <div className={`relative p-6 ${action.bg} backdrop-blur-sm rounded-2xl text-white cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20 group overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative">
                            <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                              <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-semibold text-lg">{action.title}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Layout de 2 colunas com design aprimorado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Reuniões Recentes */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-white/10 backdrop-blur-xl shadow-2xl h-full">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center text-xl">
                      <Calendar className="w-6 h-6 mr-3 text-blue-400" />
                      Reuniões Recentes
                    </CardTitle>
                    <Link href="/meetings">
                      <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-blue-600/20 hover:border-blue-400/50">
                        Ver Todas
                      </EnhancedButton>
                    </Link>
                  </div>
                  <CardDescription className="text-slate-300 text-base">
                    Suas últimas reuniões processadas pela IA
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {recentMeetings.map((meeting, index) => (
                    <motion.div 
                      key={meeting.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                      className="relative p-6 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border border-slate-600/30 hover:border-purple-400/30 transition-all duration-300 group hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-lg mb-2 group-hover:text-purple-100 transition-colors">{meeting.title}</h4>
                          <div className="flex items-center space-x-6 text-sm text-slate-400">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {meeting.duration}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {meeting.participants.length}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant="outline" 
                            className={`${
                              meeting.status === 'Processada' 
                                ? 'bg-green-600/20 text-green-300 border-green-500/30'
                                : 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                            }`}
                          >
                            {meeting.status}
                          </Badge>
                          
                          {meeting.isEditable && (
                            <EnhancedButton 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditMeeting(meeting.id)}
                              className="text-slate-400 hover:text-white p-2 hover:bg-slate-600/50"
                            >
                              <Edit3 className="w-4 h-4" />
                            </EnhancedButton>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-slate-400">
                            Ações: {meeting.completedItems}/{meeting.actionItems}
                          </span>
                          {meeting.transcriptionReady && (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Processado
                            </div>
                          )}
                        </div>
                        
                        {meeting.transcriptionReady && (
                          <EnhancedButton size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 p-2 hover:bg-purple-600/20">
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Ver Insights
                          </EnhancedButton>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Items Pendentes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-white/10 backdrop-blur-xl shadow-2xl h-full">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white flex items-center text-xl">
                    <Target className="w-6 h-6 mr-3 text-orange-400" />
                    Ações Pendentes
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-base">
                    Itens identificados automaticamente pela IA
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {pendingActions.filter(action => !action.completed).slice(0, 6).map((action, index) => (
                    <motion.div 
                      key={action.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-700/40 to-slate-800/40 rounded-xl hover:from-slate-700/60 hover:to-slate-800/60 transition-all duration-300 border border-slate-600/20 hover:border-slate-500/40"
                    >
                      <input
                        type="checkbox"
                        checked={action.completed}
                        onChange={() => handleCompleteAction(action.id)}
                        className="mt-1 w-5 h-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium mb-2 text-base">{action.task}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {action.responsible}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {action.deadline}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              action.priority === 'Alta' 
                                ? 'bg-red-600/20 text-red-300 border-red-500/30'
                                : action.priority === 'Média'
                                ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                                : 'bg-gray-600/20 text-gray-300 border-gray-500/30'
                            }`}
                          >
                            {action.priority}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                    className="text-center pt-6"
                  >
                    <Link href="/meetings">
                      <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-orange-600/20 hover:border-orange-400/50">
                        Ver Todas as Ações
                      </EnhancedButton>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
