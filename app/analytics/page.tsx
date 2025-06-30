
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Calendar, Clock, MessageSquare, TrendingUp, Users, Video } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const monthlyMeetings = [
  { month: 'Set', meetings: 12, duration: 18.5 },
  { month: 'Out', meetings: 18, duration: 24.2 },
  { month: 'Nov', meetings: 15, duration: 21.8 },
  { month: 'Dez', meetings: 22, duration: 32.1 },
  { month: 'Jan', meetings: 25, duration: 38.4 }
]

const platformData = [
  { name: 'Zoom', value: 45, color: '#3B82F6' },
  { name: 'Teams', value: 30, color: '#8B5CF6' },
  { name: 'Meet', value: 25, color: '#10B981' }
]

const keywordsData = [
  { keyword: 'estratégia', count: 45 },
  { keyword: 'vendas', count: 38 },
  { keyword: 'produto', count: 32 },
  { keyword: 'marketing', count: 28 },
  { keyword: 'orçamento', count: 25 },
  { keyword: 'equipe', count: 22 }
]

const aiInteractions = [
  { day: 'Seg', interactions: 12 },
  { day: 'Ter', interactions: 18 },
  { day: 'Qua', interactions: 15 },
  { day: 'Qui', interactions: 22 },
  { day: 'Sex', interactions: 28 },
  { day: 'Sáb', interactions: 8 },
  { day: 'Dom', interactions: 5 }
]

export default function AnalyticsPage() {
  const totalMeetings = monthlyMeetings.reduce((acc, curr) => acc + curr.meetings, 0)
  const avgDuration = monthlyMeetings.reduce((acc, curr) => acc + curr.duration, 0) / monthlyMeetings.length
  const totalAIInteractions = aiInteractions.reduce((acc, curr) => acc + curr.interactions, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">Insights e métricas das suas reuniões</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total de Reuniões</p>
                  <p className="text-2xl font-bold text-slate-900">{totalMeetings}</p>
                  <p className="text-xs text-green-600">+12% vs mês anterior</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Duração Média</p>
                  <p className="text-2xl font-bold text-slate-900">{avgDuration.toFixed(1)}h</p>
                  <p className="text-xs text-green-600">+5% vs mês anterior</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Interações com IA</p>
                  <p className="text-2xl font-bold text-slate-900">{totalAIInteractions}</p>
                  <p className="text-xs text-green-600">+28% vs semana anterior</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Participantes Únicos</p>
                  <p className="text-2xl font-bold text-slate-900">156</p>
                  <p className="text-xs text-green-600">+8% vs mês anterior</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Meetings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
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

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Distribuição por Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Palavras-chave Mais Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keywordsData.map((item, index) => (
                  <div key={item.keyword} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <span className="font-medium text-slate-900">{item.keyword}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(item.count / keywordsData[0].count) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 w-8">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Interactions by Day */}
          <Card>
            <CardHeader>
              <CardTitle>Interações com IA (Última Semana)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={aiInteractions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Insights Estratégicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Crescimento Consistente</h3>
                  <p className="text-sm text-slate-600">
                    Aumento de 12% no número de reuniões comparado ao mês anterior, indicando maior engajamento da equipe.
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">IA Amplamente Utilizada</h3>
                  <p className="text-sm text-slate-600">
                    28% de aumento nas interações com IA, demonstrando adoção efetiva da ferramenta pelos usuários.
                  </p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Zoom Predominante</h3>
                  <p className="text-sm text-slate-600">
                    45% das reuniões ocorrem via Zoom, seguido por Teams (30%) e Meet (25%).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
