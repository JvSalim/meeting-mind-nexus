
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  FileText, 
  Brain,
  Activity,
  Zap,
  ArrowUpRight,
  Play
} from 'lucide-react'
import { Sidebar } from '../../components/ui/sidebar'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/60">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 pb-0"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-light text-white mb-2"
            >
              Olá, <span className="font-semibold">{user?.name || user?.companyName}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg"
            >
              Vamos revolucionar suas reuniões hoje
            </motion.p>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { label: "Reuniões este mês", value: "24", icon: Calendar, color: "from-blue-500 to-cyan-500" },
                { label: "Horas economizadas", value: "16h", icon: Clock, color: "from-purple-500 to-pink-500" },
                { label: "Insights gerados", value: "127", icon: Brain, color: "from-emerald-500 to-teal-500" },
                { label: "Precisão média", value: "97%", icon: TrendingUp, color: "from-orange-500 to-red-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Atividade Recente</h2>
                  <Activity className="w-6 h-6 text-white/40" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "Reunião de Planejamento Q4", time: "2 horas atrás", status: "completed", participants: 8 },
                    { title: "Daily Standup - Equipe Tech", time: "4 horas atrás", status: "processing", participants: 12 },
                    { title: "Apresentação para Cliente", time: "1 dia atrás", status: "completed", participants: 5 },
                    { title: "Brainstorm - Novo Produto", time: "2 dias atrás", status: "completed", participants: 6 }
                  ].map((meeting, index) => (
                    <motion.div
                      key={meeting.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${meeting.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                        <div>
                          <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">{meeting.title}</h3>
                          <p className="text-white/60 text-sm">{meeting.time} • {meeting.participants} participantes</p>
                        </div>
                      </div>
                      <Play className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">Ações Rápidas</h2>
                  <Zap className="w-6 h-6 text-white/40" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "Nova Gravação", icon: FileText, href: "/upload", color: "from-blue-500 to-purple-500" },
                    { label: "Ver Analytics", icon: TrendingUp, href: "/analytics", color: "from-emerald-500 to-teal-500" },
                    { label: "Chat com IA", icon: Brain, href: "/chat", color: "from-purple-500 to-pink-500" },
                    { label: "Gerenciar Equipe", icon: Users, href: "/empresa", color: "from-orange-500 to-red-500" }
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(action.href)}
                      className="w-full flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium group-hover:text-blue-300 transition-colors">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
