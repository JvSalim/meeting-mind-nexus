'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, FileText, Search, Filter, Eye, MessageSquare, Brain, Menu, X, Download, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MeetingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock data
  const meetings = [
    { 
      id: 1, 
      title: 'Reunião de Planejamento Q4', 
      date: '2024-01-15', 
      duration: '2h 30min', 
      participants: 8, 
      platform: 'Zoom', 
      status: 'Transcrito',
      description: 'Discussão sobre metas e objetivos para o quarto trimestre',
      transcript: 'Transcrição disponível'
    },
    { 
      id: 2, 
      title: 'Apresentação Novo Produto', 
      date: '2024-01-14', 
      duration: '1h 45min', 
      participants: 12, 
      platform: 'Teams', 
      status: 'Processando',
      description: 'Apresentação das funcionalidades do novo produto',
      transcript: 'Em processamento'
    },
    { 
      id: 3, 
      title: 'Reunião de Vendas Semanal', 
      date: '2024-01-13', 
      duration: '1h 15min', 
      participants: 6, 
      platform: 'Meet', 
      status: 'Transcrito',
      description: 'Revisão de métricas e pipelines de vendas',
      transcript: 'Transcrição disponível'
    },
    { 
      id: 4, 
      title: 'Revisão de Orçamento', 
      date: '2024-01-12', 
      duration: '3h 10min', 
      participants: 15, 
      platform: 'Zoom', 
      status: 'Transcrito',
      description: 'Análise detalhada do orçamento anual',
      transcript: 'Transcrição disponível'
    },
    { 
      id: 5, 
      title: 'Reunião de Arquitetura', 
      date: '2024-01-11', 
      duration: '2h 00min', 
      participants: 7, 
      platform: 'Teams', 
      status: 'Transcrito',
      description: 'Discussão sobre arquitetura do sistema',
      transcript: 'Transcrição disponível'
    },
    { 
      id: 6, 
      title: 'Retrospectiva Sprint', 
      date: '2024-01-10', 
      duration: '1h 30min', 
      participants: 9, 
      platform: 'Meet', 
      status: 'Transcrito',
      description: 'Retrospectiva do último sprint de desenvolvimento',
      transcript: 'Transcrição disponível'
    }
  ]

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Calendar, current: false },
    { name: 'Reuniões', href: '/meetings', icon: Users, current: true },
    { name: 'Perfil', href: '/profile', icon: FileText, current: false },
  ]

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'transcribed' && meeting.status === 'Transcrito') ||
                         (selectedFilter === 'processing' && meeting.status === 'Processando')
    return matchesSearch && matchesFilter
  })

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
              to={item.href}
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
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
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
                <h1 className="text-2xl font-bold text-white">Reuniões</h1>
                <p className="text-slate-300">Gerencie e explore todas as suas reuniões gravadas</p>
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
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">Todas</option>
                <option value="transcribed">Transcritas</option>
                <option value="processing">Em Processamento</option>
              </select>
            </div>
          </div>
        </header>

        {/* Meetings Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{meeting.title}</h3>
                      <p className="text-slate-300 text-sm mb-3">{meeting.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      meeting.status === 'Transcrito' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {meeting.duration}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {meeting.participants} participantes
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {meeting.platform}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-700/50 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">{meeting.transcript}</span>
                      <div className="flex items-center space-x-2">
                        {meeting.status === 'Transcrito' && (
                          <>
                            <button className="p-2 text-slate-400 hover:text-purple-400 transition-colors rounded-lg hover:bg-slate-700/50">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-700/50">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-green-400 transition-colors rounded-lg hover:bg-slate-700/50">
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {meeting.status === 'Processando' && (
                          <div className="flex items-center space-x-2 text-slate-400 text-sm">
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Processando...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMeetings.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Nenhuma reunião encontrada</h3>
              <p className="text-slate-400">Tente ajustar seus filtros ou termo de busca</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
