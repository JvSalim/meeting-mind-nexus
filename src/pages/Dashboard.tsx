
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Brain, Mic, Upload, FileText, Calendar, Clock, Users, Plus, Search, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Estratégico",
      date: "2024-01-15",
      duration: "1h 30min",
      participants: 5,
      status: "Transcrito"
    },
    {
      id: 2,
      title: "Review Semanal da Equipe",
      date: "2024-01-12",
      duration: "45min",
      participants: 8,
      status: "Processando"
    },
    {
      id: 3,
      title: "Apresentação de Resultados Q4",
      date: "2024-01-10",
      duration: "2h 15min",
      participants: 12,
      status: "Transcrito"
    }
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MeetingAI</h1>
                <p className="text-slate-400 text-sm">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback className="bg-purple-600 text-white">
                  {user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-slate-400 text-sm">{user.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bem-vindo de volta, {user.name?.split(' ')[0]}!
          </h2>
          <p className="text-slate-300">
            Gerencie suas reuniões e transcrições de forma inteligente
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Nova Transcrição</h3>
                  <p className="text-purple-100">Fazer upload de áudio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white cursor-pointer hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Gravar Agora</h3>
                  <p className="text-green-100">Iniciar gravação ao vivo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-0 text-white cursor-pointer hover:from-orange-700 hover:to-red-700 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Agendar Reunião</h3>
                  <p className="text-orange-100">Configurar gravação automática</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Meetings */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Reuniões Recentes
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Suas transcrições mais recentes
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{meeting.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {meeting.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.participants}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={meeting.status === 'Transcrito' ? 'default' : 'secondary'}
                        className={meeting.status === 'Transcrito' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}
                      >
                        {meeting.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Buscar Reuniões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input 
                    placeholder="Buscar por título ou conteúdo..." 
                    className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Reuniões este mês</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Horas transcritas</span>
                    <span className="text-white font-semibold">18.5h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Perguntas feitas</span>
                    <span className="text-white font-semibold">47</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
