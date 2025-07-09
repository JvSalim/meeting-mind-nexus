
'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Calendar,
  Target,
  Award,
  Activity,
  Brain,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Sidebar } from "../../components/ui/sidebar";

export default function Analytics() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const stats = [
    { 
      title: "Total de Reuniões", 
      value: "147", 
      change: "+12%", 
      trend: "up", 
      icon: Calendar,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Horas Processadas", 
      value: "2,847", 
      change: "+8%", 
      trend: "up", 
      icon: Clock,
      color: "from-purple-500 to-violet-500"
    },
    { 
      title: "Insights Gerados", 
      value: "892", 
      change: "+15%", 
      trend: "up", 
      icon: Brain,
      color: "from-emerald-500 to-teal-500"
    },
    { 
      title: "Taxa de Precisão", 
      value: "97.3%", 
      change: "+2.1%", 
      trend: "up", 
      icon: Target,
      color: "from-orange-500 to-red-500"
    }
  ];

  const recentActivity = [
    { action: "Reunião processada", file: "Board Meeting Q4.mp3", time: "2 min atrás", status: "completed" },
    { action: "Transcrição gerada", file: "Client Call.wav", time: "15 min atrás", status: "completed" },
    { action: "Análise iniciada", file: "Team Standup.mp4", time: "1h atrás", status: "processing" },
    { action: "Insights extraídos", file: "Product Review.mp3", time: "2h atrás", status: "completed" },
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
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-emerald-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <div className="relative px-8 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Analytics Avançado
                  </h1>
                  <p className="text-xl text-slate-300 mt-2">
                    Insights detalhados sobre suas reuniões e produtividade
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-8 pb-16 -mt-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          {stat.change}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-slate-400 text-sm">{stat.title}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Performance Chart */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Performance Mensal</h3>
                      <p className="text-slate-400">Evolução das métricas principais</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center border border-white/5">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">Gráfico de performance em breve</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Activity Overview */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Atividade Recente</h3>
                      <p className="text-slate-400">Últimas ações realizadas</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                          }`}></div>
                          <div>
                            <p className="text-white font-medium text-sm">{activity.action}</p>
                            <p className="text-slate-400 text-xs">{activity.file}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-xs">{activity.time}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Insights Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Insights Inteligentes</h3>
                      <p className="text-slate-400">Descobertas automáticas baseadas em seus dados</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Participação</h4>
                      <p className="text-slate-300 text-sm mb-3">Suas reuniões têm em média 6 participantes, 20% acima da média do setor.</p>
                      <div className="text-blue-400 text-xs font-medium">Excelente engajamento</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Duração</h4>
                      <p className="text-slate-300 text-sm mb-3">Duração média de 45 min, ideal para manter foco e produtividade.</p>
                      <div className="text-emerald-400 text-xs font-medium">Tempo otimizado</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Qualidade</h4>
                      <p className="text-slate-300 text-sm mb-3">97% de precisão na transcrição, garantindo confiabilidade total.</p>
                      <div className="text-orange-400 text-xs font-medium">Alta qualidade</div>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
