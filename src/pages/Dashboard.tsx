
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  PlayCircle, 
  Search, 
  Settings, 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Mic,
  Clock,
  Bot,
  Brain,
  Zap,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  Filter,
  Download,
  Eye,
  Star,
  Globe,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const stats = {
    totalMeetings: 47,
    transcriptionsComplete: 42,
    transcriptionsPending: 5,
    questionsAnswered: 128,
    timeSaved: "48h",
    accuracy: "98%",
    growth: "+12%"
  };

  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Q1",
      date: "2024-01-15",
      duration: "1h 23min",
      platform: "Google Meet",
      status: "transcribed",
      participants: 8,
      sentiment: "positive",
      keyTopics: ["orçamento", "estratégia", "timeline"]
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14", 
      duration: "32min",
      platform: "Zoom",
      status: "processing",
      participants: 5,
      sentiment: "neutral",
      keyTopics: ["bugs", "features", "deploy"]
    },
    {
      id: 3,
      title: "Client Presentation - Project Alpha",
      date: "2024-01-13",
      duration: "2h 15min", 
      platform: "Teams",
      status: "transcribed",
      participants: 12,
      sentiment: "positive",
      keyTopics: ["proposta", "cronograma", "aprovação"]
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simular busca
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
    { id: "dashboard", label: "Visão Geral", icon: BarChart3 },
    { id: "meetings", label: "Reuniões", icon: Calendar },
    { id: "transcriptions", label: "Transcrições", icon: FileText },
    { id: "search", label: "Buscar Conteúdo", icon: Search },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-950 to-purple-950 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-slate-800/50`}>
      {/* Header */}
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
      
      {/* Navigation */}
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
      
      {/* User Profile */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg mb-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)}
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

  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Total de Reuniões</p>
                <p className="text-3xl font-bold text-white">{stats.totalMeetings}</p>
                <div className="flex items-center mt-2 text-green-400">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">{stats.growth}</span>
                </div>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Transcrições Completas</p>
                <p className="text-3xl font-bold text-white">{stats.transcriptionsComplete}</p>
                <div className="flex items-center mt-2 text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">{stats.accuracy}</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Em Processamento</p>
                <p className="text-3xl font-bold text-white">{stats.transcriptionsPending}</p>
                <div className="flex items-center mt-2 text-orange-400">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-sm">Ativo</span>
                </div>
              </div>
              <Mic className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-300">Perguntas Respondidas</p>
                <p className="text-3xl font-bold text-white">{stats.questionsAnswered}</p>
                <div className="flex items-center mt-2 text-cyan-400">
                  <Zap className="w-4 h-4 mr-1" />
                  <span className="text-sm">{stats.timeSaved} economizadas</span>
                </div>
              </div>
              <MessageSquare className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-400" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <div className="text-center">
                <Plus className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Nova Reunião</div>
                <div className="text-xs opacity-80">Agendar ou iniciar</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50">
              <div className="text-center">
                <Search className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Buscar Conteúdo</div>
                <div className="text-xs opacity-80">IA avançada</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 bg-slate-700/50 border-slate-600/50 text-slate-200 hover:bg-slate-600/50">
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Exportar Dados</div>
                <div className="text-xs opacity-80">Relatórios</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
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
              <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                <Eye className="w-4 h-4 mr-2" />
                Ver Todas
              </Button>
            </div>
          </div>
          <CardDescription className="text-slate-400">
            Suas últimas reuniões e status de processamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div 
                key={meeting.id} 
                className="flex items-center justify-between p-4 border border-slate-700/50 rounded-lg hover:bg-slate-700/30 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {meeting.title}
                    </h3>
                    <Badge 
                      variant={meeting.sentiment === 'positive' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        meeting.sentiment === 'positive' 
                          ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                          : 'bg-slate-600/20 text-slate-400 border-slate-500/30'
                      }`}
                    >
                      {meeting.sentiment === 'positive' ? '😊 Positiva' : '😐 Neutra'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2 text-sm text-slate-400">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
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
                  
                  <div className="flex flex-wrap gap-1">
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
                    variant={meeting.status === 'transcribed' ? 'default' : 'secondary'}
                    className={meeting.status === 'transcribed' 
                      ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                      : 'bg-orange-600/20 text-orange-400 border-orange-500/30'
                    }
                  >
                    {meeting.status === 'transcribed' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> Transcrita</>
                    ) : (
                      <><AlertCircle className="w-3 h-3 mr-1" /> Processando</>
                    )}
                  </Badge>
                  
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                    <Globe className="w-3 h-3 mr-1" />
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
    </div>
  );

  const SearchContent = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Bot className="w-5 h-5 mr-2 text-purple-400" />
            Busca Inteligente por Conteúdo
          </CardTitle>
          <CardDescription className="text-slate-300">
            Faça perguntas sobre suas reuniões e obtenha respostas baseadas no conteúdo transcrito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Ex: O que foi decidido sobre o orçamento na reunião de janeiro?"
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
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Resultados da Busca</CardTitle>
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
                  <p className="text-slate-300 mb-2">{result.snippet}</p>
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
                      Ver Transcrição Completa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "search":
        return <SearchContent />;
      case "meetings":
        return (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Todas as Reuniões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Lista completa de reuniões em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "transcriptions":
        return (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Transcrições</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Visualização de transcrições em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "analytics":
        return (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Relatórios e análises em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Configurações da conta em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverview />;
    }
  };

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
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0 w-full">
        {/* Header */}
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
                <h1 className="text-2xl font-bold text-white">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
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

        {/* Content */}
        <main className="p-6 w-full">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
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
