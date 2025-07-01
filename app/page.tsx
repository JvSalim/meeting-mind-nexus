'use client'

import { useState, useEffect } from 'react'
import { Mic, Brain, Zap, Shield, Users, FileText, ArrowRight, Play, Check, Star, ChevronDown, Calendar, BarChart3, Bot, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [currentText, setCurrentText] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  
  const dynamicTexts = [
    "Produtividade Empresarial",
    "Colaboração Remota",
    "Gestão Inteligente"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length)
    }, 2500)
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center z-50">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white w-full">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-40 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/login" 
                className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border border-slate-500/30 backdrop-blur-sm"
              >
                Entrar
              </Link>
              <Link 
                href="/register" 
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-slate-300">Nova versão com IA avançada</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-500 ease-in-out">
                {dynamicTexts[currentText]}
              </span>
              <br />
              <span className="text-slate-200">com IA Avançada</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automatize a transcrição e análise de suas reuniões. Faça perguntas sobre qualquer reunião e obtenha respostas instantâneas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-md mx-auto sm:max-w-none">
              <Link 
                href="/register" 
                className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 hover:shadow-purple-500/25"
              >
                <span>Começar Gratuitamente</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="w-full sm:w-auto group px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 hover:bg-purple-500/10 glass-effect">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Ver Demonstração</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">4.9/5 avaliação</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+1000 empresas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">100% seguro</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Como Revolucionamos suas Reuniões
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
              <div key={index} className="group relative glass-effect">
                <div className="rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-slate-100 relative z-10">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed relative z-10">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50k+", label: "Reuniões Processadas", icon: Calendar },
              { number: "98%", label: "Precisão na Transcrição", icon: Bot },
              { number: "75%", label: "Tempo Economizado", icon: Zap },
              { number: "1000+", label: "Empresas Ativas", icon: Users }
            ].map((stat, index) => (
              <div key={index} className="glass-effect rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 border border-purple-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Pronto para Revolucionar suas Reuniões?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Junte-se a milhares de empresas que já automatizaram suas reuniões com nossa IA
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
                >
                  Começar Agora - Grátis
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 rounded-xl font-semibold text-lg transition-all hover:bg-purple-500/10 glass-effect"
                >
                  Já tenho conta
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Teste grátis por 14 dias
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Sem cartão de crédito
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  Suporte 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MeetingAI
                </span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Transformando reuniões em insights valiosos através da inteligência artificial avançada.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Suporte</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 MeetingAI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
