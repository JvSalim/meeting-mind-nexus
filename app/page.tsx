
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Upload, MessageSquare, BarChart3, Calendar, Settings, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            MeetingAI
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Transforme suas reuniões em insights valiosos com inteligência artificial avançada
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg">
              Acessar Plataforma
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Link href="/dashboard">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Dashboard</CardTitle>
                <CardDescription className="text-slate-400">
                  Visão geral das suas reuniões
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/upload">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Upload</CardTitle>
                <CardDescription className="text-slate-400">
                  Envie arquivos de reunião
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/meetings">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Reuniões</CardTitle>
                <CardDescription className="text-slate-400">
                  Gerencie suas reuniões
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Chat IA</CardTitle>
                <CardDescription className="text-slate-400">
                  Converse com a IA sobre reuniões
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Analytics</CardTitle>
                <CardDescription className="text-slate-400">
                  Insights e relatórios
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Configurações</CardTitle>
                <CardDescription className="text-slate-400">
                  Personalize sua experiência
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Features */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">IA Avançada</h3>
              <p className="text-slate-400">Transcrição e análise automática com precisão máxima</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Simples</h3>
              <p className="text-slate-400">Suporte a múltiplos formatos de áudio e vídeo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Chat Inteligente</h3>
              <p className="text-slate-400">Faça perguntas sobre suas reuniões em linguagem natural</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
