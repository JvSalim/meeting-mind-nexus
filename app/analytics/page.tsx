
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  Eye,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Zap,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";
import { Input } from "../../components/ui/input";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for analytics
  const kpiData = [
    {
      title: "Total de Reuniões",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Horas Economizadas",
      value: "87h",
      change: "+23%",
      trend: "up",
      icon: Clock,
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Participantes Ativos",
      value: "43",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "from-purple-600 to-violet-600"
    },
    {
      title: "Taxa de Precisão IA",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Brain,
      color: "from-orange-600 to-red-600"
    }
  ];

  const meetingAnalytics = [
    {
      id: 1,
      title: "Reunião de Planejamento Q4",
      date: "2024-01-15",
      duration: "2h 15min",
      participants: 8,
      engagement: 87,
      keyTopics: ["estratégia", "orçamento", "metas"],
      sentiment: "positivo"
    },
    {
      id: 2,
      title: "Daily Standup - Dev Team",
      date: "2024-01-14",
      duration: "32min",
      participants: 5,
      engagement: 92,
      keyTopics: ["bugs", "features", "deploy"],
      sentiment: "neutro"
    },
    {
      id: 3,
      title: "Client Presentation - Alpha",
      date: "2024-01-13",
      duration: "1h 45min",
      participants: 12,
      engagement: 76,
      keyTopics: ["proposta", "cronograma", "aprovação"],
      sentiment: "positivo"
    }
  ];

  const topTopics = [
    { topic: "orçamento", mentions: 47, trend: "up" },
    { topic: "estratégia", mentions: 34, trend: "up" },
    { topic: "cronograma", mentions: 29, trend: "down" },
    { topic: "equipe", mentions: 23, trend: "up" },
    { topic: "cliente", mentions: 19, trend: "up" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Analytics & Insights
                </h1>
                <p className="text-slate-300 text-lg">
                  Análises inteligentes das suas reuniões e produtividade
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700/50 text-white w-64"
                  />
                </div>
                
                <EnhancedButton variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </EnhancedButton>
              </div>
            </div>
          </FadeInSection>

          {/* Period Selector */}
          <FadeInSection>
            <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-1 mb-8 w-fit">
              {[
                { key: '7d', label: '7 dias' },
                { key: '30d', label: '30 dias' },
                { key: '90d', label: '90 dias' },
                { key: '1y', label: '1 ano' }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    selectedPeriod === period.key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* KPI Cards */}
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <StaggerItem key={index}>
                  <motion.div whileHover={{ scale: 1.02, y: -4 }}>
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                            <kpi.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className={`flex items-center text-sm font-medium ${
                            kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                            {kpi.change}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {kpi.value}
                          </h3>
                          <p className="text-slate-400 text-sm">
                            {kpi.title}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Meeting Analytics */}
            <StaggerItem>
              <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                        Análise de Reuniões
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        Performance e engajamento das reuniões recentes
                      </CardDescription>
                    </div>
                    <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </EnhancedButton>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {meetingAnalytics.map((meeting) => (
                      <div 
                        key={meeting.id}
                        className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">{meeting.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`${
                              meeting.sentiment === 'positivo' 
                                ? 'bg-green-600/20 text-green-300 border-green-500/30'
                                : meeting.sentiment === 'neutro'
                                ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30'
                                : 'bg-red-600/20 text-red-300 border-red-500/30'
                            }`}
                          >
                            {meeting.sentiment}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-slate-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(meeting.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {meeting.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.participants} pessoas
                          </div>
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 mr-1" />
                            {meeting.engagement}% engajamento
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Top Topics */}
            <StaggerItem>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-400" />
                    Tópicos em Alta
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Assuntos mais discutidos
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {topTopics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.topic}</p>
                            <p className="text-slate-400 text-sm">{item.mentions} menções</p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center text-sm font-medium ${
                          item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </div>

          {/* AI Insights */}
          <StaggerItem>
            <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  Insights da IA
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Análises inteligentes geradas automaticamente
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                      <h4 className="font-semibold text-white">Produtividade</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      Suas reuniões são 23% mais eficientes que a média do setor.
                    </p>
                    <p className="text-green-400 text-xs">Excelente performance!</p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-400 mr-2" />
                      <h4 className="font-semibold text-white">Engajamento</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      O engajamento da equipe aumentou 15% nas últimas 4 semanas.
                    </p>
                    <p className="text-green-400 text-xs">Tendência positiva</p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Activity className="w-5 h-5 text-purple-400 mr-2" />
                      <h4 className="font-semibold text-white">Recomendação</h4>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      Considere reuniões mais curtas para manter o foco alto.
                    </p>
                    <p className="text-yellow-400 text-xs">Otimização sugerida</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </div>
      </div>
    </PageTransition>
  );
};

export default Analytics;
