
'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Video, Mic, MessageSquare, Search, Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: string
  platform: 'zoom' | 'teams' | 'meet'
  participants: number
  keywords: string[]
  status: 'completed' | 'processing'
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Planejamento Estratégico Q4 2024',
    date: '2024-01-15',
    time: '14:30',
    duration: '2h 15min',
    platform: 'zoom',
    participants: 8,
    keywords: ['estratégia', 'metas', 'orçamento', 'crescimento'],
    status: 'completed'
  },
  {
    id: '2',
    title: 'Revisão de Produto e Roadmap',
    date: '2024-01-14',
    time: '10:00',
    duration: '1h 45min',
    platform: 'teams',
    participants: 12,
    keywords: ['produto', 'roadmap', 'features', 'UX'],
    status: 'completed'
  },
  {
    id: '3',
    title: 'Reunião Semanal de Vendas',
    date: '2024-01-13',
    time: '16:00',
    duration: '1h 30min',
    platform: 'meet',
    participants: 6,
    keywords: ['vendas', 'pipeline', 'metas', 'clientes'],
    status: 'completed'
  },
  {
    id: '4',
    title: 'Retrospectiva Sprint 23',
    date: '2024-01-12',
    time: '09:00',
    duration: '1h 00min',
    platform: 'zoom',
    participants: 9,
    keywords: ['sprint', 'retrospectiva', 'melhorias', 'desenvolvimento'],
    status: 'processing'
  }
]

export default function MeetingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const platformIcons = {
    zoom: '🔵',
    teams: '🟣',
    meet: '🟢'
  }

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPlatform = selectedPlatform === 'all' || meeting.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reuniões</h1>
          <p className="text-slate-600">Gerencie e explore suas reuniões transcritas</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar reuniões por título ou palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filtros
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Plataforma</label>
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Todas as plataformas</option>
                      <option value="zoom">Zoom</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="meet">Google Meet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Duração mínima</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Qualquer duração</option>
                      <option value="30">30 minutos</option>
                      <option value="60">1 hora</option>
                      <option value="90">1h 30min</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {meeting.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{platformIcons[meeting.platform]}</span>
                    {meeting.status === 'processing' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {meeting.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {meeting.participants} participantes
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Palavras-chave:</p>
                    <div className="flex flex-wrap gap-1">
                      {meeting.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/meetings/${meeting.id}`}>
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhuma reunião encontrada</h3>
            <p className="text-slate-600">Tente ajustar seus filtros ou termo de busca</p>
          </div>
        )}
      </div>
    </div>
  )
}
