
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Mic, MessageSquare, FileText, Zap, Shield, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transcrição Inteligente de 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {' '}Reuniões
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Automatize a transcrição e análise de suas reuniões com IA avançada. 
              Faça perguntas sobre qualquer reunião e obtenha respostas instantâneas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                  Começar Agora
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transforme suas reuniões em insights acionáveis com nossa tecnologia de IA
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic className="w-8 h-8" />,
                title: "Transcrição Automática",
                description: "Converta áudio em texto com precisão excepcional usando IA avançada"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Chat Inteligente",
                description: "Faça perguntas sobre suas reuniões e obtenha respostas instantâneas"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Resumos Automáticos",
                description: "Gere resumos detalhados e pontos-chave de cada reunião"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Colaboração em Equipe",
                description: "Compartilhe transcrições e insights com sua equipe facilmente"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Segurança Total",
                description: "Seus dados são protegidos com criptografia de ponta a ponta"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Economia de Tempo",
                description: "Economize horas na documentação e revisão de reuniões"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Revolucionar suas Reuniões?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram sua produtividade
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
