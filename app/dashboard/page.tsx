
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
  Edit3
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  // Métricas principais do dashboard
  const mainMetrics = [
    {
      title: "Reuniões Este Mês",
      value: "24",
      change: "+3 desde a semana passada",
      icon: Calendar,
      color: "from-blue-600 to-cyan-600",
      href: "/meetings"
    },
    {
      title: "Horas Economizadas",
      value: "12.5h",
      change: "Com transcrição automática",
      icon: Clock,
      color: "from-green-600 to-emerald-600",
      href: "/analytics"
    },
    {
      title: "Taxa de Conclusão",
      value: "87%",
      change: "Action items completados",
      icon: Target,
      color: "from-purple-600 to-violet-600",
      href: "/analytics"
    },
    {
      title: "Engajamento Médio",
      value: "92%",
      change: "Participação nas reuniões",
      icon: Users,
      color: "from-orange-600 to-red-600",
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
      status: "Transcrita",
      actionItems: 5,
      completedItems: 3,
      transcriptionReady: true,
      isEditable: true
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
      isEditable: true
    },
    {
      id: 3,
      title: "Apresentação para Cliente Alpha",
      date: "10/01/2024",
      duration: "2h 15min", 
      participants: ["Roberto Alves", "Lucia Fernandes", "Marcos Oliveira", "Sofia Ribeiro"],
      status: "Transcrita",
      actionItems: 8,
      completedItems: 6,
      transcriptionReady: true,
      isEditable: true
    }
  ]);

  // Action items pendentes
  const [pendingActions, setPendingActions] = useState([
    { id: 1, task: "Enviar proposta para cliente", responsible: "João Silva", deadline: "18/01/2024", priority: "Alta", completed: false },
    { id: 2, task: "Agendar reunião de follow-up", responsible: "Maria Santos", deadline: "20/01/2024", priority: "Média", completed: false },
    { id: 3, task: "Revisar documentação técnica", responsible: "Pedro Lima", deadline: "22/01/2024", priority: "Baixa", completed: false },
    { id: 4, task: "Preparar apresentação Q2", responsible: "Ana Costa", deadline: "25/01/2024", priority: "Alta", completed: false }
  ]);

  // Atalhos rápidos
  const quickActions = [
    { title: "Nova Reunião", icon: Plus, href: "/meetings", color: "from-blue-500 to-blue-600" },
    { title: "Upload de Áudio", icon: Upload, href: "/upload", color: "from-green-500 to-green-600" },
    { title: "Chat com IA", icon: MessageSquare, href: "/chat", color: "from-purple-500 to-purple-600" },
    { title: "Ver Analytics", icon: BarChart3, href: "/analytics", color: "from-orange-500 to-orange-600" }
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
                <Home className="w-8 h-8 mr-3 text-blue-400" />
                Dashboard
              </h1>
              <p className="text-slate-300">
                Bem-vindo de volta, {user?.name || user?.companyName}! Aqui está o resumo das suas atividades.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <EnhancedButton variant="outline" size="sm" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </EnhancedButton>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="p-6 space-y-8">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Link href={metric.href}>
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <metric.icon className="w-6 h-6 text-white" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {metric.value}
                        </h3>
                        <p className="text-slate-400 text-sm mb-1">
                          {metric.title}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {metric.change}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Ações Rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Acesso rápido às funcionalidades principais
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={action.href}>
                        <div className={`p-4 bg-gradient-to-r ${action.color} rounded-lg text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200`}>
                          <action.icon className="w-6 h-6 mb-2" />
                          <p className="font-medium text-sm">{action.title}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Layout de 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Reuniões Recentes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
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
                        Ver Todas
                      </EnhancedButton>
                    </Link>
                  </div>
                  <CardDescription className="text-slate-300">
                    Suas últimas reuniões e status de processamento
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {recentMeetings.map((meeting, index) => (
                    <motion.div 
                      key={meeting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm mb-1">{meeting.title}</h4>
                          <div className="flex items-center space-x-4 text-xs text-slate-400">
                            <span>{meeting.date}</span>
                            <span>{meeting.duration}</span>
                            <span>{meeting.participants.length} participantes</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              meeting.status === 'Transcrita' 
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
                              className="text-slate-400 hover:text-white p-1"
                            >
                              <Edit3 className="w-3 h-3" />
                            </EnhancedButton>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="text-slate-400">
                            Action Items: {meeting.completedItems}/{meeting.actionItems}
                          </span>
                          {meeting.transcriptionReady && (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Transcrição pronta
                            </div>
                          )}
                        </div>
                        
                        {meeting.transcriptionReady && (
                          <EnhancedButton size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 p-1">
                            <PlayCircle className="w-3 h-3 mr-1" />
                            Ver Resumo
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
                    Action Items Pendentes
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Tarefas que precisam da sua atenção
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {pendingActions.filter(action => !action.completed).slice(0, 6).map((action, index) => (
                    <motion.div 
                      key={action.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                      className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={action.completed}
                        onChange={() => handleCompleteAction(action.id)}
                        className="mt-1 w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium mb-1">{action.task}</p>
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                          <span>{action.responsible}</span>
                          <span>•</span>
                          <span>{action.deadline}</span>
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
                    transition={{ delay: 1.5, duration: 0.3 }}
                    className="text-center pt-4"
                  >
                    <Link href="/meetings">
                      <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                        Ver Todos os Action Items
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
