
'use client'

import { ArrowLeft, TrendingUp, Users, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AnalyticsPage() {
  const stats = [
    { title: 'Total de Reuniões', value: '247', change: '+12%', icon: MessageSquare },
    { title: 'Horas Transcritas', value: '184.5h', change: '+8%', icon: Clock },
    { title: 'Participantes Únicos', value: '89', change: '+15%', icon: Users },
    { title: 'Taxa de Engajamento', value: '94%', change: '+3%', icon: TrendingUp }
  ]

  const monthlyData = [
    { month: 'Jan', meetings: 18, hours: 24.5 },
    { month: 'Fev', meetings: 22, hours: 31.2 },
    { month: 'Mar', meetings: 28, hours: 39.8 },
    { month: 'Abr', meetings: 25, hours: 33.4 },
    { month: 'Mai', meetings: 32, hours: 42.1 },
    { month: 'Jun', meetings: 29, hours: 38.7 }
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border-slate-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Meetings Chart */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Reuniões por Mês</CardTitle>
              <CardDescription>Evolução mensal das reuniões transcritas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(data.meetings / 35) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 w-8">{data.meetings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hours Chart */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Horas Transcritas</CardTitle>
              <CardDescription>Total de horas processadas mensalmente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(data.hours / 45) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-900 w-12">{data.hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900">Insights Principais</CardTitle>
            <CardDescription>Descobertas importantes sobre suas reuniões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Pico de Atividade</h3>
                <p className="text-sm text-blue-700">Terças-feiras às 14h são seus horários mais produtivos para reuniões</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Palavras-chave Frequentes</h3>
                <p className="text-sm text-green-700">"Projeto", "deadline" e "orçamento" são os temas mais discutidos</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Duração Média</h3>
                <p className="text-sm text-purple-700">Suas reuniões duram em média 1h 12min, 8% acima da média geral</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
