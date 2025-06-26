
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from '@/components/ui/input'
import { 
  Brain, 
  Upload, 
  FileText, 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  Filter, 
  Bot, 
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  Download
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Estratégico",
      date: "2024-01-15",
      duration: "1h 30min",
      participants: 5,
      status: "Disponível",
      keyTopics: ["orçamento", "estratégia", "timeline"]
    },
    {
      id: 2,
      title: "Review Semanal da Equipe",
      date: "2024-01-12",
      duration: "45min",
      participants: 8,
      status: "Em análise",
      keyTopics: ["bugs", "features", "deploy"]
    },
    {
      id: 3,
      title: "Apresentação de Resultados Q4",
      date: "2024-01-10",
      duration: "2h 15min",
      participants: 12,
      status: "Completo",
      keyTopics: ["proposta", "cronograma", "aprovação"]
    }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'meetings', label: 'Reuniões', icon: Calendar },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'chat', label: 'Chat IA', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ]

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-950 to-purple-950 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-800/50`}>
      <div className="flex items-center justify-between p-6 border-b border-slate-800/50 lg:justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MeetingAI
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <nav className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 shadow-lg' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg mb-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-purple-600 text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-slate-400">{user?.company || 'Empresa'}</p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-slate-400 text-sm">
                    Bem-vindo de volta, <span className="text-purple-400">{user.name?.split(' ')[0]}</span>!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Upload de Áudio</h3>
                    <p className="text-purple-100">Enviar nova gravação</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white cursor-pointer hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Chat IA</h3>
                    <p className="text-green-100">Conversar sobre reuniões</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-0 text-white cursor-pointer hover:from-orange-700 hover:to-red-700 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Analytics</h3>
                    <p className="text-orange-100">Ver insights detalhados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Section */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                Buscar Reuniões
              </CardTitle>
              <CardDescription className="text-slate-400">
                Encontre reuniões por título ou conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input 
                  placeholder="Buscar por título ou conteúdo..." 
                  className="bg-white/10 border-white/20 text-white placeholder-slate-400"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Reuniões Recentes
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Suas análises mais recentes
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{meeting.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-slate-400 mb-2">
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
                      <div className="flex flex-wrap gap-2">
                        {meeting.keyTopics.map((topic, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs bg-purple-600/10 text-purple-300 border-purple-500/30"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <Badge 
                        variant="outline"
                        className={`${
                          meeting.status === 'Completo' ? 'bg-green-600/20 text-green-300 border-green-500/30' :
                          meeting.status === 'Em análise' ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30' :
                          'bg-blue-600/20 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {meeting.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats Sidebar */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white text-lg">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-slate-300 text-sm">Reuniões este mês</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">18.5h</div>
                  <div className="text-slate-300 text-sm">Horas analisadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">47</div>
                  <div className="text-slate-300 text-sm">Perguntas feitas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
