
'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, Clock, Users, Play } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import MeetingFilters from '../../components/filters/MeetingFilters'

export default function MeetingsPage() {
  const [filteredMeetings, setFilteredMeetings] = useState<any[]>([])

  const meetings = [
    {
      id: 1,
      title: 'Reunião de Planejamento Q1',
      date: '2024-01-15',
      duration: '1h 23min',
      participants: 8,
      status: 'completed',
      transcript: 'Lorem ipsum dolor sit amet...',
      tags: ['planejamento', 'Q1', 'estratégia']
    },
    {
      id: 2,
      title: 'Daily Standup - Dev Team',
      date: '2024-01-14',
      duration: '32min',
      participants: 5,
      status: 'completed',
      transcript: 'Discussão sobre sprint atual...',
      tags: ['daily', 'desenvolvimento', 'sprint']
    },
    {
      id: 3,
      title: 'Client Presentation - Alpha',
      date: '2024-01-13',
      duration: '2h 15min',
      participants: 12,
      status: 'completed',
      transcript: 'Apresentação do projeto Alpha...',
      tags: ['cliente', 'apresentação', 'alpha']
    }
  ]

  const handleFilter = (filters: any) => {
    let filtered = meetings

    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter(meeting => {
        const meetingDate = new Date(meeting.date)
        const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : null
        const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : null
        
        if (fromDate && meetingDate < fromDate) return false
        if (toDate && meetingDate > toDate) return false
        return true
      })
    }

    if (filters.participants.min || filters.participants.max) {
      filtered = filtered.filter(meeting => {
        if (filters.participants.min && meeting.participants < filters.participants.min) return false
        if (filters.participants.max && meeting.participants > filters.participants.max) return false
        return true
      })
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(meeting =>
        filters.tags.some((tag: string) => 
          meeting.tags.some(meetingTag => 
            meetingTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      )
    }

    setFilteredMeetings(filtered)
  }

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setFilteredMeetings(meetings)
      return
    }

    const filtered = meetings.filter(meeting =>
      meeting.title.toLowerCase().includes(keyword.toLowerCase()) ||
      meeting.transcript.toLowerCase().includes(keyword.toLowerCase()) ||
      meeting.tags.some((tag: string) => tag.toLowerCase().includes(keyword.toLowerCase()))
    )

    setFilteredMeetings(filtered)
  }

  const displayMeetings = filteredMeetings.length > 0 ? filteredMeetings : meetings

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Minhas Reuniões</h1>
          <p className="text-slate-600">Gerencie e revise todas as suas reuniões transcritas</p>
        </div>

        {/* Filters */}
        <MeetingFilters onFilter={handleFilter} onSearch={handleSearch} />

        {/* Meetings List */}
        <div className="space-y-6">
          {displayMeetings.map((meeting) => (
            <Card key={meeting.id} className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-slate-900 mb-2">{meeting.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(meeting.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {meeting.participants} participantes
                      </span>
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Concluída
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 text-sm line-clamp-3">
                      {meeting.transcript}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {meeting.tags.map((tag: string, index: number) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Link href={`/meetings/${meeting.id}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayMeetings.length === 0 && (
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Nenhuma reunião encontrada
              </h3>
              <p className="text-slate-600 mb-6">
                Tente ajustar os filtros ou faça o upload de uma nova reunião.
              </p>
              <Link href="/upload">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Upload de Reunião
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
