
'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MeetingFilters from '@/components/filters/MeetingFilters'

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: string
  durationMinutes: number
  platform: 'zoom' | 'teams' | 'meet' | 'webex'
  participants: number
  keywords: string[]
  content: string
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Planejamento Estratégico Q4 2024',
    date: '2024-01-15',
    time: '14:30',
    duration: '2h 15min',
    durationMinutes: 135,
    platform: 'zoom',
    participants: 8,
    keywords: ['estratégia', 'metas', 'orçamento', 'crescimento'],
    content: 'Discussão sobre planejamento estratégico para o quarto trimestre'
  },
  {
    id: '2',
    title: 'Revisão de Produto e Roadmap',
    date: '2024-01-14',
    time: '10:00',
    duration: '1h 45min',
    durationMinutes: 105,
    platform: 'teams',
    participants: 12,
    keywords: ['produto', 'roadmap', 'features', 'desenvolvimento'],
    content: 'Revisão do roadmap de produto e definição de próximas features'
  },
  {
    id: '3',
    title: 'Reunião Semanal de Vendas',
    date: '2024-01-13',
    time: '16:00',
    duration: '1h 30min',
    durationMinutes: 90,
    platform: 'meet',
    participants: 6,
    keywords: ['vendas', 'pipeline', 'metas', 'clientes'],
    content: 'Análise do pipeline de vendas e discussão sobre metas mensais'
  },
  {
    id: '4',
    title: 'Retrospectiva Sprint 23',
    date: '2024-01-12',
    time: '09:00',
    duration: '1h 00min',
    durationMinutes: 60,
    platform: 'zoom',
    participants: 9,
    keywords: ['sprint', 'retrospectiva', 'melhorias', 'desenvolvimento'],
    content: 'Retrospectiva do sprint 23 com discussão de melhorias'
  },
  {
    id: '5',
    title: 'Apresentação Cliente Alpha',
    date: '2024-01-11',
    time: '15:00',
    duration: '2h 30min',
    durationMinutes: 150,
    platform: 'teams',
    participants: 15,
    keywords: ['cliente', 'apresentação', 'proposta', 'projeto'],
    content: 'Apresentação da proposta para o cliente Alpha'
  },
  {
    id: '6',
    title: 'Daily Standup',
    date: '2024-01-10',
    time: '09:30',
    duration: '25min',
    durationMinutes: 25,
    platform: 'meet',
    participants: 7,
    keywords: ['daily', 'standup', 'desenvolvimento', 'tarefas'],
    content: 'Daily standup da equipe de desenvolvimento'
  }
]

const platformIcons = {
  zoom: '🔵',
  teams: '🟣',
  meet: '🟢',
  webex: '🟠'
}

const platformNames = {
  zoom: 'Zoom',
  teams: 'Microsoft Teams',
  meet: 'Google Meet',
  webex: 'Cisco Webex'
}

export default function MeetingsPage() {
  const [filteredMeetings, setFilteredMeetings] = useState(mockMeetings)

  const handleFiltersChange = (filters: any) => {
    let filtered = mockMeetings

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(searchLower) ||
        meeting.content.toLowerCase().includes(searchLower) ||
        meeting.keywords.some((keyword: string) => 
          keyword.toLowerCase().includes(searchLower)
        )
      )
    }

    // Date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(meeting => meeting.date >= filters.dateRange.start)
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(meeting => meeting.date <= filters.dateRange.end)
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(meeting => 
        filters.platforms.includes(meeting.platform)
      )
    }

    // Duration filter
    filtered = filtered.filter(meeting => 
      meeting.durationMinutes >= filters.duration.min &&
      meeting.durationMinutes <= filters.duration.max
    )

    // Participants filter
    filtered = filtered.filter(meeting => 
      meeting.participants >= filters.participants.min &&
      meeting.participants <= filters.participants.max
    )

    // Keywords filter
    if (filters.keywords.length > 0) {
      filtered = filtered.filter(meeting =>
        filters.keywords.some(keyword =>
          meeting.keywords.includes(keyword)
        )
      )
    }

    setFilteredMeetings(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reuniões</h1>
          <p className="text-slate-600">Gerencie e explore suas reuniões transcritas</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <MeetingFilters
            onFiltersChange={handleFiltersChange}
            totalMeetings={mockMeetings.length}
            filteredCount={filteredMeetings.length}
          />
        </div>

        {/* Meetings Grid */}
        {filteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-white border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {meeting.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(meeting.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" title={platformNames[meeting.platform]}>
                        {platformIcons[meeting.platform]}
                      </span>
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
                        {meeting.keywords.slice(0, 4).map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 text-xs"
                          >
                            {keyword}
                          </Badge>
                        ))}
                        {meeting.keywords.length > 4 && (
                          <Badge
                            variant="outline"
                            className="px-2 py-1 bg-slate-50 text-slate-600 border-slate-200 text-xs"
                          >
                            +{meeting.keywords.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link href={`/meetings/${meeting.id}`}>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhuma reunião encontrada</h3>
            <p className="text-slate-600 mb-4">Tente ajustar seus filtros ou termo de busca</p>
            <Link href="/upload">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Fazer Upload de Reunião
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
