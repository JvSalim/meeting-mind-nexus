
'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { 
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Download,
  Play,
  Pause,
  MoreVertical,
  FileText,
  Mic,
  Video,
  Star,
  MapPin,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";

const Meetings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for meetings
  const meetings = [
    {
      id: 1,
      title: "Planejamento Estratégico Q4 2024",
      date: "2024-01-15",
      time: "14:30",
      duration: "2h 15min",
      platform: "Zoom",
      status: "completed",
      participants: 8,
      transcriptionStatus: "completed",
      rating: 4.8,
      topics: ["estratégia", "orçamento", "metas"],
      summary: "Discussão detalhada sobre objetivos do Q4 e alocação de recursos.",
      recordingUrl: "#",
      transcriptUrl: "#"
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14",
      time: "09:00",
      duration: "32min",
      platform: "Google Meet",
      status: "completed",
      participants: 5,
      transcriptionStatus: "processing",
      rating: 4.2,
      topics: ["desenvolvimento", "bugs", "features"],
      summary: "Atualização diária da equipe de desenvolvimento sobre progresso dos projetos.",
      recordingUrl: "#",
      transcriptUrl: null
    },
    {
      id: 3,
      title: "Client Presentation - Project Alpha",
      date: "2024-01-13",
      time: "15:00",
      duration: "1h 45min",
      platform: "Microsoft Teams",
      status: "completed",
      participants: 12,
      transcriptionStatus: "completed",
      rating: 4.9,
      topics: ["apresentação", "cliente", "aprovação"],
      summary: "Apresentação do projeto Alpha para cliente com aprovação dos requisitos.",
      recordingUrl: "#",
      transcriptUrl: "#"
    },
    {
      id: 4,
      title: "Weekly Marketing Review",
      date: "2024-01-12",
      time: "10:30",
      duration: "1h 15min",
      platform: "Zoom",
      status: "scheduled",
      participants: 6,
      transcriptionStatus: "pending",
      rating: null,
      topics: ["marketing", "campanhas", "resultados"],
      summary: "Revisão semanal das campanhas de marketing e análise de resultados.",
      recordingUrl: null,
      transcriptUrl: null
    }
  ];

  const filters = [
    { key: "all", label: "Todas", count: meetings.length },
    { key: "completed", label: "Concluídas", count: meetings.filter(m => m.status === "completed").length },
    { key: "scheduled", label: "Agendadas", count: meetings.filter(m => m.status === "scheduled").length },
    { key: "processing", label: "Processando", count: meetings.filter(m => m.transcriptionStatus === "processing").length }
  ];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = 
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      selectedFilter === "all" ||
      meeting.status === selectedFilter ||
      meeting.transcriptionStatus === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'scheduled': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'processing': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500/30';
    }
  };

  const getTranscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'processing': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      case 'pending': return 'bg-slate-600/20 text-slate-300 border-slate-500/30';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Minhas Reuniões
                </h1>
                <p className="text-slate-300 text-lg">
                  Gerencie e acompanhe todas as suas reuniões e transcrições
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <EnhancedButton 
                  variant="outline" 
                  className="bg-slate-800/50 border-slate-700/50 text-slate-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </EnhancedButton>
                
                <EnhancedButton className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Reunião
                </EnhancedButton>
              </div>
            </div>
          </FadeInSection>

          {/* Search and Filters */}
          <FadeInSection>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar reuniões por título, tópicos ou participantes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
                />
              </div>
              
              <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-1">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      selectedFilter === filter.key
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Meetings Grid */}
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMeetings.map((meeting, index) => (
                <StaggerItem key={meeting.id}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="h-full"
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm h-full hover:bg-slate-700/50 transition-all duration-300 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className={getStatusColor(meeting.status)}>
                                {meeting.status === 'completed' ? 'Concluída' : 
                                 meeting.status === 'scheduled' ? 'Agendada' : 'Em andamento'}
                              </Badge>
                              
                              <Badge variant="outline" className={getTranscriptionStatusColor(meeting.transcriptionStatus)}>
                                {meeting.transcriptionStatus === 'completed' ? 'Transcrita' :
                                 meeting.transcriptionStatus === 'processing' ? 'Processando' : 'Pendente'}
                              </Badge>
                            </div>
                            
                            <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                              {meeting.title}
                            </CardTitle>
                            
                            <CardDescription className="text-slate-300 mt-2">
                              {meeting.summary}
                            </CardDescription>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {meeting.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-slate-300">{meeting.rating}</span>
                              </div>
                            )}
                            
                            <button className="p-2 text-slate-400 hover:text-white transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Meeting Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(meeting.date).toLocaleDateString('pt-BR')} às {meeting.time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.duration}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{meeting.participants} participantes</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {meeting.platform === 'Zoom' && <Video className="w-4 h-4" />}
                            {meeting.platform === 'Google Meet' && <Video className="w-4 h-4" />}
                            {meeting.platform === 'Microsoft Teams' && <Video className="w-4 h-4" />}
                            <span>{meeting.platform}</span>
                          </div>
                        </div>
                        
                        {/* Topics */}
                        <div className="flex flex-wrap gap-2">
                          {meeting.topics.map((topic, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline" 
                              className="text-xs bg-purple-600/10 text-purple-300 border-purple-500/30"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                          <div className="flex space-x-2">
                            {meeting.recordingUrl && (
                              <EnhancedButton
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Gravação
                              </EnhancedButton>
                            )}
                            
                            {meeting.transcriptUrl && (
                              <EnhancedButton
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300 hover:bg-green-600/10"
                              >
                                <FileText className="w-4 h-4 mr-1" />
                                Transcrição
                              </EnhancedButton>
                            )}
                          </div>
                          
                          <Link href={`/meetings/${meeting.id}`}>
                            <EnhancedButton
                              variant="outline"
                              size="sm"
                              className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver Detalhes
                            </EnhancedButton>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Empty State */}
          {filteredMeetings.length === 0 && (
            <FadeInSection>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Nenhuma reunião encontrada
                  </h3>
                  <p className="text-slate-300 mb-6">
                    {searchQuery 
                      ? `Não encontramos reuniões que correspondam a "${searchQuery}"`
                      : "Você ainda não tem reuniões nesta categoria."
                    }
                  </p>
                  <EnhancedButton className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Agendar Nova Reunião
                  </EnhancedButton>
                </CardContent>
              </Card>
            </FadeInSection>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Meetings;
