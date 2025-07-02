
'use client'

import Link from 'next/link'
import {
  Mic,
  Brain,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Play,
  Check,
  Star,
  ChevronDown,
  Calendar,
  Bot,
  Sparkles
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/animated-text'
import { InteractiveButton } from '@/components/ui/interactive-button'
import { PageTransition, FadeInSection, SlideInSection } from '@/components/ui/page-transition'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const dynamicTexts = [
    'Produtividade Empresarial',
    'Inovação Colaborativa', 
    'Eficiência Operacional',
    'Inteligência Artificial',
    'Automação Inteligente'
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            MeetingAI
          </h1>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-300"
          >
            Inicializando sistema...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
          <div className="flex space-x-4">
            <InteractiveButton variant="secondary" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </InteractiveButton>
            <InteractiveButton variant="primary" size="sm" asChild>
              <Link href="/register">Começar Agora</Link>
            </InteractiveButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Estilo Eonix */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
              >
                <Sparkles className="w-5 h-5 text-purple-400 mr-3" />
                <span className="text-sm font-medium text-slate-300">Nova versão com IA avançada</span>
              </motion.div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block text-white mb-2">Revolucione sua</span>
                  <AnimatedText
                    texts={dynamicTexts}
                    className="block min-h-[1.2em] bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={2500}
                  />
                  <span className="block text-white mt-2">com IA Avançada</span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                  Automatize a transcrição e análise de suas reuniões. Pergunte sobre qualquer reunião e receba respostas instantâneas com nossa inteligência artificial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <InteractiveButton variant="primary" size="lg" asChild>
                  <Link href="/register">
                    Começar Gratuitamente
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </InteractiveButton>
                <InteractiveButton variant="outline" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </InteractiveButton>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">4.9/5 avaliação</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">1000+ empresas</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="font-medium">100% seguro</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Reunião detectada</h3>
                        <p className="text-sm text-slate-400">Processando áudio...</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Transcrevendo...</span>
                        <span>87%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <FadeInSection className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Como Revolucionamos suas Reuniões
            </h2>
            <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Nossa IA automatiza todo o processo, desde a detecção até a análise inteligente
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: Mic,
                title: "Detecção Automática",
                description: "Identifica automaticamente novas gravações de reuniões em suas plataformas favoritas com precisão absoluta",
                color: "from-purple-500 to-pink-500",
                delay: 0
              },
              {
                icon: Brain,
                title: "Transcrição Inteligente",
                description: "Converte áudio em texto com precisão usando IA avançada e processamento de linguagem natural",
                color: "from-blue-500 to-cyan-500",
                delay: 0.2
              },
              {
                icon: Zap,
                title: "Respostas Instantâneas",
                description: "Faça perguntas sobre qualquer reunião e receba respostas contextualizadas imediatamente",
                color: "from-green-500 to-emerald-500",
                delay: 0.4
              }
            ].map((feature, index) => (
              <SlideInSection
                key={index}
                delay={feature.delay}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </SlideInSection>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Stats Section */}
      <FadeInSection className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50k+", label: "Reuniões Processadas", icon: Calendar },
              { number: "98%", label: "Precisão na Transcrição", icon: Bot },
              { number: "75%", label: "Tempo Economizado", icon: Zap },
              { number: "1000+", label: "Empresas Ativas", icon: Users }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-6 text-purple-400" />
                <div className="text-4xl lg:text-5xl font-black text-white mb-3">{stat.number}</div>
                <div className="text-lg text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl p-16 border border-purple-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Pronto para Revolucionar suas Reuniões?
              </h2>
              <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Junte-se a milhares de empresas que já automatizaram suas reuniões com nossa IA
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <InteractiveButton variant="primary" size="lg" asChild>
                  <Link href="/register">
                    Começar Agora - Grátis
                  </Link>
                </InteractiveButton>
                <InteractiveButton variant="outline" size="lg" asChild>
                  <Link href="/login">
                    Já tenho conta
                  </Link>
                </InteractiveButton>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Teste grátis por 14 dias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Sem cartão de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Suporte 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MeetingAI
                </span>
              </div>
              <p className="text-lg text-slate-400 mb-6 max-w-md leading-relaxed">
                Transformando reuniões em insights valiosos através da inteligência artificial avançada.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Produto</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-150">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Suporte</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-150">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-150">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2024 MeetingAI. Todos os direitos reservados.
            </p>
            <div className="flex space-x-8 text-slate-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-150">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors duration-150">Termos</a>
              <a href="#" className="hover:text-white transition-colors duration-150">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </PageTransition>
  )
}
