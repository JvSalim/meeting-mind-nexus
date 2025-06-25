
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
  Bot
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
    questionsAnswered: 128
  };

  const recentMeetings = [
    {
      id: 1,
      title: "Reunião de Planejamento Q1",
      date: "2024-01-15",
      duration: "1h 23min",
      platform: "Google Meet",
      status: "transcribed",
      participants: 8
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14",
      duration: "32min",
      platform: "Zoom",
      status: "processing",
      participants: 5
    },
    {
      id: 3,
      title: "Client Presentation - Project Alpha",
      date: "2024-01-13",
      duration: "2h 15min",
      platform: "Teams",
      status: "transcribed",
      participants: 12
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
    { id: "dashboard", label: "Visão Geral", icon: TrendingUp },
    { id: "meetings", label: "Reuniões", icon: Calendar },
    { id: "transcriptions", label: "Transcrições", icon: FileText },
    { id: "search", label: "Buscar Conteúdo", icon: Search },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-4 border-b lg:justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            MeetingAI
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 bg-slate-50 rounded-lg mb-4">
          <p className="text-sm font-medium text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.company}</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total de Reuniões</p>
                <p className="text-3xl font-bold text-slate-800">{stats.totalMeetings}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Transcrições Completas</p>
                <p className="text-3xl font-bold text-green-600">{stats.transcriptionsComplete}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Em Processamento</p>
                <p className="text-3xl font-bold text-orange-600">{stats.transcriptionsPending}</p>
              </div>
              <Mic className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Perguntas Respondidas</p>
                <p className="text-3xl font-bold text-purple-600">{stats.questionsAnswered}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reuniões Recentes</CardTitle>
          <CardDescription>Suas últimas reuniões e status de transcrição</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{meeting.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
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
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={meeting.status === 'transcribed' ? 'default' : 'secondary'}>
                    {meeting.status === 'transcribed' ? 'Transcrita' : 'Processando'}
                  </Badge>
                  <Badge variant="outline">{meeting.platform}</Badge>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Busca Inteligente por Conteúdo
          </CardTitle>
          <CardDescription>
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
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
            <CardDescription>Encontrei {searchResults.length} resultados relevantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{result.meetingTitle}</h3>
                    <Badge variant="outline">{result.date}</Badge>
                  </div>
                  <p className="text-slate-600 mb-2">{result.snippet}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Confiança: {(result.confidence * 100).toFixed(0)}%
                    </span>
                    <Button variant="outline" size="sm">Ver Transcrição Completa</Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Todas as Reuniões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Lista completa de reuniões em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "transcriptions":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Transcrições</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Visualização de transcrições em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Configurações da conta em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverview />;
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-slate-600">Bem-vindo de volta, {user.name}!</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
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
