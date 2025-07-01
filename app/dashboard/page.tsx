'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Settings, 
  FileText, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Brain,
  Zap,
  BarChart3,
  Plus,
  Download,
  Eye,
  Bell,
  Clock,
  Users,
  Bot,
  Sparkles,
  Filter,
  Star,
  Upload
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Mock data
  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Q1",
      date: "2024-01-15",
      duration: "1h 23min",
      platform: "Google Meet",
      participants: 8,
      keyTopics: ["orçamento", "estratégia", "timeline"]
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14", 
      duration: "32min",
      platform: "Zoom",
      participants: 5,
      keyTopics: ["bugs", "features", "deploy"]
    },
    {
      id: 3,
      title: "Client Presentation - Project Alpha",
      date: "2024-01-13",
      duration: "2h 15min", 
      platform: "Teams",
      participants: 12,
      keyTopics: ["proposta", "cronograma", "aprovação"]
    }
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults = [
        {
          meetingTitle: "Reunião de Planejamento Q1",
          date: "2024-01-15",
          snippet: "Discutimos o orçamento para o próximo trimestre, com foco em marketing digital e expansão da equipe.",
          confidence: 0.95
        },
        {
          meetingTitle: "Client Presentation - Project Alpha",
          date: "2024-01-13",
          snippet: "O cliente aprovou a proposta inicial e solicitou ajustes no cronograma de entrega.",
          confidence: 0.87
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const menuItems = [
    { id: "dashboard", label: "Visão Geral", icon: BarChart3, href: "/dashboard" },
    { id: "meetings", label: "Reuniões", icon: Calendar, href: "/meetings" },
    { id: "upload", label: "Upload", icon: Upload, href: "/upload" },
    { id: "chat", label: "Chat IA", icon: MessageSquare, href: "/chat" },
    { id: "analytics", label: "Analytics", icon: TrendingUp, href: "/analytics" },
    { id: "settings", label: "Configurações", icon: Settings, href: "/settings" },
  ];

  const quickActions = [
    {
      title: "Nova Reunião",
      description: "Agendar ou iniciar",
      icon: Plus,
      color: "from-purple-600 to-blue-600",
      href: "/meetings"
    },
    {
      title: "Upload de Áudio",
      description: "Analisar reunião",
      icon: Upload,
      color: "from-green-600 to-emerald-600",
      href: "/upload"
    },
    {
      title: "Chat IA",
      description: "Perguntas inteligentes",
      icon: Bot,
      color: "from-orange-600 to-red-600",
      href: "/chat"
    }
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-950 to-purple-950 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-800/50`}>
      <div className="flex items-center justify-between p-6 border-b border-slate-800/50 lg:justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MeetingAI
          </span>
        </Link>
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <nav className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} className="block">
                <div
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-blue-600/10'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg mb-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
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
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex w-full">
      <Sidebar />
      
      <div className="flex-1 lg:ml-0 w-full">
        <header className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-4 sticky top-0 z-30">
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
                <p className="text-slate-400">
                  Bem-vindo de volta, <span className="text-purple-400 font-medium">{user.name}</span>!
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6 w-full">
          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                Ações Rápidas
              </CardTitle>
              <CardDescription className="text-slate-400">
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href} className="block">
                    <div 
                      className={`h-auto p-6 bg-gradient-to-r ${action.color} hover:scale-105 text-white border-0 transition-all duration-200 group w-full rounded-lg cursor-pointer`}
                    >
                      <div className="text-center">
                        <action.icon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <div className="font-semibold text-lg">{action.title}</div>
                        <div className="text-sm opacity-90">{action.description}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Search */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Bot className="w-5 h-5 mr-2 text-purple-400" />
                Busca Inteligente
              </CardTitle>
              <CardDescription className="text-slate-300">
                Faça perguntas sobre suas reuniões usando IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input
                  placeholder="Ex: O que foi decidido sobre o orçamento na última reunião?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                />
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isSearching ? <Bot className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  Reuniões Recentes
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                  <Link href="/meetings">
                    <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Todas
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="flex items-center justify-between p-4 border border-slate-700/50 rounded-lg hover:bg-slate-700/30 transition-all duration-200 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {meeting.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-slate-400">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(meeting.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {meeting.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {meeting.participants} participantes
                        </span>
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
                      <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                        {meeting.platform}
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

          {/* Search Results */}
          {searchResults.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Resultados da Busca IA</CardTitle>
                <CardDescription className="text-slate-400">
                  Encontrei {searchResults.length} resultados relevantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="p-4 border border-slate-700/50 rounded-lg bg-slate-700/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{result.meetingTitle}</h3>
                        <Badge variant="outline" className="bg-slate-600/50 text-slate-300 border-slate-500/50">
                          {result.date}
                        </Badge>
                      </div>
                      <p className="text-slate-300 mb-3">{result.snippet}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-400">
                            Confiança: {(result.confidence * 100).toFixed(0)}%
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < Math.floor(result.confidence * 5) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-slate-600'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                        >
                          Ver Transcrição
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
