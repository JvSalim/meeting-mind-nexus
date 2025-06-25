
'use client'

import { useState, useEffect } from 'react'
import { Mic, Brain, Zap, Shield, Users, FileText, ArrowRight, Play, Check } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [currentText, setCurrentText] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const dynamicTexts = [
    "Transcrição Inteligente",
    "Análise de Reuniões",
    "Respostas Instantâneas",
    "Produtividade Empresarial",
    "Automação Completa"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length)
    }, 2000)
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center z-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center transform animate-pulse">
                <Brain className="w-10 h-10 text-white animate-bounce" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur opacity-50 animate-glow" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MeetingAI
          </h1>
          <p className="text-slate-300 mb-8 text-lg animate-fade-in">
            Inicializando sistema...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
                Entrar
              </Link>
              <Link href="/auth/register" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg">
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {dynamicTexts[currentText]}
              </span>
              <br />
              <span className="text-slate-200">com IA Avançada</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automatize a transcrição e análise de suas reuniões. Faça perguntas sobre qualquer reunião e obtenha respostas instantâneas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-2">
                <span>Começar Gratuitamente</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 rounded-xl font-semibold text-lg transition-all flex items-center space-x-2 hover:bg-purple-500/10">
                <Play className="w-5 h-5" />
                <span>Ver Demonstração</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Como Funciona
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Nossa IA automatiza todo o processo, desde a detecção até a análise inteligente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Detecção Automática",
                description: "Identifica automaticamente novas gravações de reuniões em suas plataformas favoritas",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Brain,
                title: "Transcrição Inteligente",
                description: "Converte áudio em texto com precisão usando IA avançada e processamento de linguagem natural",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Respostas Instantâneas",
                description: "Faça perguntas sobre qualquer reunião e receba respostas contextualizadas imediatamente",
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-100">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Vantagens Exclusivas
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Desenvolvido especialmente para empresas que valorizam produtividade e segurança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Segurança Empresarial",
                description: "Dados segmentados por empresa com criptografia de ponta a ponta"
              },
              {
                icon: Users,
                title: "Colaboração Eficiente",
                description: "Compartilhe insights e resumos com sua equipe facilmente"
              },
              {
                icon: FileText,
                title: "Relatórios Detalhados",
                description: "Gere relatórios completos e resumos executivos automaticamente"
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-100">{benefit.title}</h3>
                  <p className="text-slate-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Pronto para Revolucionar suas Reuniões?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Junte-se a centenas de empresas que já automatizaram suas reuniões com nossa IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl">
                Começar Agora - Grátis
              </Link>
              <Link href="/auth/login" className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 rounded-xl font-semibold text-lg transition-all hover:bg-purple-500/10">
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
          <p className="text-slate-400">
            © 2024 MeetingAI. Transformando reuniões em insights valiosos.
          </p>
        </div>
      </footer>
    </div>
  )
}
