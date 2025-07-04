'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, FileText, Search, Filter, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { EnhancedButton } from '../../components/ui/enhanced-button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Sidebar } from '../../components/ui/sidebar'

export default function MeetingsPage() {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
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

  const meetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Estratégico",
      date: "2024-03-15",
      time: "10:00",
      participants: 5,
      status: "concluída"
    },
    {
      id: 2,
      title: "Discussão sobre o Novo Produto",
      date: "2024-03-20",
      time: "14:00",
      participants: 3,
      status: "agendada"
    },
    {
      id: 3,
      title: "Alinhamento da Equipe de Marketing",
      date: "2024-03-22",
      time: "11:00",
      participants: 7,
      status: "cancelada"
    }
  ];

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <Calendar className="w-8 h-8 mr-3 text-blue-400" />
                Reuniões
              </h1>
              <p className="text-slate-300">
                Gerencie e acompanhe todas as suas reuniões
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar reuniões..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>
              <EnhancedButton className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Reunião
              </EnhancedButton>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  Lista de Reuniões
                </CardTitle>
                <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </EnhancedButton>
              </div>
              <CardDescription className="text-slate-300">
                Visualize e gerencie suas reuniões agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                  <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Título
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Horário
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Participantes
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMeetings.map(meeting => (
                      <tr key={meeting.id} className="bg-slate-800/30 border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                          {meeting.title}
                        </th>
                        <td className="px-6 py-4">
                          {new Date(meeting.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4">
                          {meeting.time}
                        </td>
                        <td className="px-6 py-4">
                          {meeting.participants}
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant="outline" 
                            className={`${
                              meeting.status === 'concluída' 
                                ? 'bg-green-600/20 text-green-300 border-green-500/30'
                                : meeting.status === 'agendada'
                                  ? 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                                  : 'bg-red-600/20 text-red-300 border-red-500/30'
                            }`}
                          >
                            {meeting.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <EnhancedButton
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
                            >
                              <FileText className="w-4 h-4" />
                            </EnhancedButton>
                            <EnhancedButton
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                            >
                              <Clock className="w-4 h-4" />
                            </EnhancedButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
