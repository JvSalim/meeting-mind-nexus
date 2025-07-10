
'use client'

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Calendar, 
  Clock, 
  Users, 
  Search,
  Plus,
  Eye,
  Download,
  MoreVertical,
  Play,
  FileText,
  Brain,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  status: 'completed' | 'scheduled' | 'in-progress' | 'cancelled';
  recording?: boolean;
  transcript?: boolean;
  summary?: boolean;
  tags?: string[];
}

const Meetings = () => {
  const [user, setUser] = useState<any>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock meetings data
  const mockMeetings: Meeting[] = [
    {
      id: 1,
      title: "Reunião de Planejamento Estratégico Q1 2024",
      date: "2024-01-15",
      time: "09:00",
      duration: "2h 30min",
      participants: 8,
      status: 'completed',
      recording: true,
      transcript: true,
      summary: true,
      tags: ['Estratégia', 'Planejamento', 'Q1']
    },
    {
      id: 2,
      title: "Sprint Review - Desenvolvimento Produto",
      date: "2024-01-14",
      time: "14:00",
      duration: "1h 15min",
      participants: 12,
      status: 'completed',
      recording: true,
      transcript: true,
      summary: false,
      tags: ['Sprint', 'Desenvolvimento', 'Review']
    },
    {
      id: 3,
      title: "Apresentação para Investidores",
      date: "2024-01-16",
      time: "15:30",
      duration: "45min",
      participants: 6,
      status: 'scheduled',
      recording: false,
      transcript: false,
      summary: false,
      tags: ['Investidores', 'Apresentação']
    },
    {
      id: 4,
      title: "Daily Standup - Equipe Engineering",
      date: "2024-01-13",
      time: "10:00",
      duration: "30min",
      participants: 15,
      status: 'completed',
      recording: true,
      transcript: true,
      summary: true,
      tags: ['Daily', 'Engineering', 'Standup']
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
    
    // Simulate loading
    setTimeout(() => {
      setMeetings(mockMeetings);
      setLoading(false);
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Meeting['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'in-progress':
        return <Play className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-emerald-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative p-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 tracking-tight">
                      Minhas Reuniões
                    </h1>
                    <p className="text-xl text-slate-300 font-medium">
                      Gerencie e analise suas reuniões com inteligência artificial
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <EnhancedButton className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Reunião
                  </EnhancedButton>
                </div>
              </div>
            </div>
          </motion.header>
        </div>

        <div className="px-8 pb-16 -mt-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-6"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar reuniões por título ou tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 h-14 rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="flex gap-4">
                <EnhancedButton
                  variant="outline"
                  className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 backdrop-blur-xl h-14 px-6"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </EnhancedButton>
              </div>
            </motion.div>

            {/* Meetings Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                      <div className="p-6 animate-pulse">
                        <div className="h-6 bg-slate-700 rounded mb-4"></div>
                        <div className="h-4 bg-slate-700 rounded mb-2"></div>
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMeetings.map((meeting, index) => (
                      <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/20 transition-all duration-300 h-full">
                          <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                                  {meeting.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge className={`${getStatusColor(meeting.status)} text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1`}>
                                    {getStatusIcon(meeting.status)}
                                    {meeting.status === 'completed' ? 'Concluída' :
                                     meeting.status === 'scheduled' ? 'Agendada' :
                                     meeting.status === 'in-progress' ? 'Em Andamento' : 'Cancelada'}
                                  </Badge>
                                </div>
                              </div>
                              
                              <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <MoreVertical className="w-4 h-4 text-slate-400" />
                              </button>
                            </div>

                            {/* Meeting Details */}
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center gap-3 text-slate-300 text-sm">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span>{new Date(meeting.date).toLocaleDateString('pt-BR')} às {meeting.time}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-slate-300 text-sm">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span>{meeting.duration}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-slate-300 text-sm">
                                <Users className="w-4 h-4 text-slate-400" />
                                <span>{meeting.participants} participantes</span>
                              </div>
                            </div>

                            {/* Tags */}
                            {meeting.tags && meeting.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {meeting.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs px-2 py-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {/* Available Resources */}
                            <div className="flex items-center gap-4 mb-6">
                              {meeting.recording && (
                                <div className="flex items-center gap-1 text-green-400 text-xs">
                                  <Play className="w-3 h-3" />
                                  <span>Gravação</span>
                                </div>
                              )}
                              {meeting.transcript && (
                                <div className="flex items-center gap-1 text-blue-400 text-xs">
                                  <FileText className="w-3 h-3" />
                                  <span>Transcrição</span>
                                </div>
                              )}
                              {meeting.summary && (
                                <div className="flex items-center gap-1 text-purple-400 text-xs">
                                  <Brain className="w-3 h-3" />
                                  <span>Resumo IA</span>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                              <EnhancedButton
                                size="sm"
                                onClick={() => router.push(`/meetings/${meeting.id}`)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </EnhancedButton>
                              
                              {meeting.status === 'completed' && (
                                <EnhancedButton
                                  size="sm"
                                  variant="outline"
                                  className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10"
                                >
                                  <Brain className="w-4 h-4 mr-2" />
                                  Insights
                                </EnhancedButton>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </motion.div>

            {/* Empty State */}
            {!loading && filteredMeetings.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl max-w-md mx-auto">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Nenhuma reunião encontrada</h3>
                    <p className="text-slate-400 mb-6">
                      {searchQuery ? 'Tente ajustar os filtros de busca.' : 'Comece criando sua primeira reunião.'}
                    </p>
                    <EnhancedButton className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Reunião
                    </EnhancedButton>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
