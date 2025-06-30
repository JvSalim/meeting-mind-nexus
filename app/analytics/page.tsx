
'use client'

import { ArrowLeft, TrendingUp, Users, Clock, MessageSquare, Calendar, Target } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

export default function AnalyticsPage() {
  // Mock data for charts
  const monthlyMeetings = [
    { month: 'Jan', meetings: 12, hours: 18.5 },
    { month: 'Fev', meetings: 15, hours: 22.3 },
    { month: 'Mar', meetings: 18, hours: 28.7 },
    { month: 'Abr', meetings: 14, hours: 21.2 },
    { month: 'Mai', meetings: 20, hours: 32.1 },
    { month: 'Jun', meetings: 16, hours: 24.8 }
  ]

  const platformData = [
    { name: 'Zoom', value: 45, color: '#3B82F6' },
    { name: 'Teams', value: 30, color: '#8B5CF6' },
    { name: 'Meet', value: 20, color: '#10B981' },
    { name: 'Webex', value: 5, color: '#F59E0B' }
  ]

  const keywordData = [
    { keyword: 'orçamento', count: 23 },
    { keyword: 'estratégia', count: 18 },
    { keyword: 'projeto', count: 15 },
    { keyword: 'cliente', count: 12 },
    { keyword: 'timeline', count: 10 },
    { keyword: 'aprovação', count: 8 }
  ]

  const aiInteractions = [
    { month: 'Jan', questions: 45 },
    { month: 'Fev', questions: 62 },
    { month: 'Mar', questions: 78 },
    { month: 'Abr', questions: 55 },
    { month: 'Mai', questions: 89 },
    { month: 'Jun', questions: 67 }
  ]

  const stats = [
    {
      title: 'Total de Reuniões',
      value: '95',
      subtitle: 'Este ano',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Horas Analisadas',
      value: '147.6h',
      subtitle: 'Tempo total',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Participantes Únicos',
      value: '84',
      subtitle: 'Pessoas diferentes',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Perguntas IA',
      value: '396',
      subtitle: 'Total de interações',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">Insights detalhados sobre suas reuniões e uso da plataforma</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Reuniões por Mês */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Reuniões por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyMeetings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="meetings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Plataformas Utilizadas */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Plataformas Utilizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Palavras-chave Mais Frequentes */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Palavras-chave Mais Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={keywordData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="keyword" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Interações com IA */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Interações com IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aiInteractions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="questions" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Insights e Recomendações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-slate-900 mb-2">📈 Tendência Positiva</h4>
                <p className="text-sm text-slate-600">
                  Suas reuniões aumentaram 25% nos últimos 3 meses, indicando maior engajamento da equipe.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-slate-900 mb-2">🤖 IA Muito Utilizada</h4>
                <p className="text-sm text-slate-600">
                  Você fez 89 perguntas para a IA em maio - um recorde! Continue explorando os insights.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-slate-900 mb-2">⏰ Duração Otimizada</h4>
                <p className="text-sm text-slate-600">
                  Suas reuniões têm duração média ideal de 1h30min, mantendo produtividade alta.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-slate-900 mb-2">📋 Tópicos Recorrentes</h4>
                <p className="text-sm text-slate-600">
                  "Orçamento" aparece em 24% das reuniões. Considere criar templates específicos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
