
'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, FileText, Search, Settings, LogOut, Brain, Menu, X, Plus, Filter, Eye, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data
  const stats = [
    { title: 'Reuniões Este Mês', value: '24', change: '+12%', icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { title: 'Horas Transcritas', value: '48h', change: '+8%', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { title: 'Participantes Únicos', value: '156', change: '+23%', icon: Users, color: 'from-green-500 to-emerald-500' },
    { title: 'Documentos Gerados', value: '89', change: '+15%', icon: FileText, color: 'from-orange-500 to-red-500' }
  ]

  const recentMeetings = [
    { id: 1, title: 'Reunião de Planejamento Q4', date: '2024-01-15', duration: '2h 30min', participants: 8, platform: 'Zoom', status: 'Transcrito' },
    { id: 2, title: 'Apresentação Novo Produto', date: '2024-01-14', duration: '1h 45min', participants: 12, platform: 'Teams', status: 'Processando' },
    { id: 3, title: 'Reunião de Vendas Semanal', date: '2024-01-13', duration: '1h 15min', participants: 6, platform: 'Meet', status: 'Transcrito' },
    { id: 4, title: 'Revisão de Orçamento', date: '2024-01-12', duration: '3h 10min', participants: 15, platform: 'Zoom', status: 'Transcrito' },
  ]

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Calendar, current: true },
    { name: 'Reuniões', href: '/meetings', icon: Users, current: false },
    { name: 'Perfil', href: '/profile', icon: Settings, current: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                item.current 
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-300">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar reuniões..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                />
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nova Reunião</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-slate-300 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Meetings */}
        <div className="p-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-bold text-white">Reuniões Recentes</h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filtrar</span>
                </button>
                <Link href="/meetings" className="px-3 py-2 text-purple-400 hover:text-purple-300 transition-colors">
                  Ver todas
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left p-4 text-slate-300 font-medium">Reunião</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Data</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Duração</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Participantes</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Plataforma</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left p-4 text-slate-300 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMeetings.map((meeting) => (
                    <tr key={meeting.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                      <td className="p-4">
                        <div className="text-white font-medium">{meeting.title}</div>
                      </td>
                      <td className="p-4 text-slate-300">{meeting.date}</td>
                      <td className="p-4 text-slate-300">{meeting.duration}</td>
                      <td className="p-4 text-slate-300">{meeting.participants}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {meeting.platform}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          meeting.status === 'Transcrito' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {meeting.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-purple-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="p-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Pergunte sobre suas reuniões</h2>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ex: O que foi discutido sobre orçamento na reunião de ontem?"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Perguntar</span>
              </button>
            </div>
            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <p className="text-slate-300 text-sm">
                💡 Dica: Você pode fazer perguntas específicas sobre qualquer reunião, como "Quais foram os pontos de ação da reunião de planejamento?" ou "Quem mencionou o projeto X?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
