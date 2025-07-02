
'use client'

import Link from "next/link";
import { 
  Mic, 
  Play, 
  FileText, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Brain,
  Sparkles,
  MessageSquare,
  Calendar,
  Upload,
  Shield,
  Clock,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedText from "../components/ui/animated-text";
import { EnhancedButton } from "../components/ui/enhanced-button";
import { PageTransition, FadeInSection, SlideInSection, ScaleInSection, StaggerContainer, StaggerItem } from "../components/ui/page-animations";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "IA Avançada",
      description: "Transcrição precisa com reconhecimento de voz de última geração e análise contextual",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "Chat Inteligente",
      description: "Faça perguntas sobre suas reuniões e obtenha respostas instantâneas com contexto completo",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Gestão Completa",
      description: "Organize, busque e analise todas as suas reuniões em um só lugar com ferramentas avançadas",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Insights sobre produtividade, padrões de comunicação e métricas de engajamento",
      color: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechCorp",
      content: "Revolucionou como nossa equipe gerencia reuniões. Economia de 3h por semana e 40% mais produtividade!",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Product Manager, StartupX",
      content: "A busca inteligente me permite encontrar qualquer decisão em segundos. Game changer absoluto.",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Consultora Sênior",
      content: "Ferramenta essencial para minha produtividade. Não consigo mais trabalhar sem ela. Recomendo!",
      rating: 5,
      avatar: "AC"
    }
  ];

  const aiTexts = [
    "Transcreva reuniões automaticamente",
    "Encontre informações instantaneamente", 
    "Analise padrões de comunicação",
    "Otimize sua produtividade",
    "Gere resumos inteligentes",
    "Identifique action items"
  ];

  const stats = [
    { number: "10k+", label: "Reuniões Transcritas" },
    { number: "500+", label: "Empresas Ativas" },
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "50h", label: "Economizadas/Mês" }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/10 rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <PageTransition>
        {/* Enhanced Header */}
        <header className="relative z-20 flex items-center justify-between p-8 max-w-7xl mx-auto">
          <SlideInSection direction="left">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </Link>
          </SlideInSection>
          
          <SlideInSection direction="down" delay={0.2}>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Recursos</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Depoimentos</a>
              <a href="#stats" className="text-slate-300 hover:text-white transition-colors duration-300 font-medium">Resultados</a>
            </nav>
          </SlideInSection>
          
          <SlideInSection direction="right" delay={0.3}>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <EnhancedButton variant="ghost" size="md" className="text-slate-300 hover:text-white">
                  Entrar
                </EnhancedButton>
              </Link>
              <Link href="/register">
                <EnhancedButton variant="primary" size="md">
                  Começar Grátis
                </EnhancedButton>
              </Link>
            </div>
          </SlideInSection>
        </header>

        {/* Hero Section with Eonix-inspired design */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-8 text-center">
          <FadeInSection className="max-w-6xl mx-auto">
            <ScaleInSection delay={0.2}>
              <div className="mb-12 flex items-center justify-center space-x-2">
                <div className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
                  <span className="text-sm font-medium text-purple-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    IA Avançada para Reuniões
                  </span>
                </div>
              </div>
            </ScaleInSection>
            
            <FadeInSection delay={0.4}>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
                Transforme suas{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  reuniões
                </span>
                <br />
                em <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">insights</span>
              </h1>
            </FadeInSection>
            
            <FadeInSection delay={0.6}>
              <div className="text-2xl md:text-3xl text-slate-300 mb-6 h-12 flex items-center justify-center">
                <AnimatedText 
                  texts={aiTexts}
                  className="font-medium bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent"
                  typingSpeed={60}
                  deletingSpeed={30}
                  pauseDuration={2500}
                />
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.8}>
              <p className="text-xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
                Plataforma completa de IA para transcrever, analisar e otimizar suas reuniões. 
                Economize tempo e nunca perca informações importantes novamente.
              </p>
            </FadeInSection>
            
            <StaggerContainer delay={1} staggerDelay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-16">
                <StaggerItem>
                  <Link href="/register">
                    <EnhancedButton size="lg" className="w-full sm:w-auto min-w-[200px] h-16 text-lg">
                      <Play className="w-6 h-6 mr-3" />
                      Começar Gratuitamente
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </EnhancedButton>
                  </Link>
                </StaggerItem>
                
                <StaggerItem>
                  <Link href="/upload">
                    <EnhancedButton variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-16 text-lg">
                      <Upload className="w-6 h-6 mr-3" />
                      Testar Agora
                    </EnhancedButton>
                  </Link>
                </StaggerItem>
              </div>
            </StaggerContainer>
            
            <StaggerContainer delay={1.2} staggerDelay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
                <StaggerItem>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Grátis para começar</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>Sem cartão de crédito</span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span>Setup em 2 minutos</span>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </FadeInSection>
        </main>

        {/* Stats Section */}
        <section id="stats" className="py-24 px-8 max-w-7xl mx-auto relative z-10">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados que{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                impressionam
              </span>
            </h2>
          </FadeInSection>
          
          <StaggerContainer staggerDelay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <div className="text-center p-8 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 font-medium">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-24 px-8 max-w-7xl mx-auto relative z-10">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Recursos{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Inteligentes
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Tecnologia de ponta para revolucionar como você gerencia reuniões e acelera sua produtividade
            </p>
          </FadeInSection>
          
          <StaggerContainer staggerDelay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <div className="group p-10 rounded-3xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Enhanced Testimonials */}
        <section id="testimonials" className="py-24 px-8 bg-slate-800/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto">
            <FadeInSection className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                O que nossos{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  usuários dizem
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Histórias reais de transformação e produtividade
              </p>
            </FadeInSection>
            
            <StaggerContainer staggerDelay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <StaggerItem key={index}>
                    <div className="p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105 group">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{testimonial.name}</p>
                          <p className="text-slate-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-300 italic leading-relaxed group-hover:text-slate-200 transition-colors">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <FadeInSection>
              <div className="p-16 rounded-3xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30">
                <h2 className="text-5xl md:text-6xl font-bold mb-8">
                  Pronto para{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    revolucionar
                  </span>
                  <br />suas reuniões?
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Junte-se a milhares de profissionais que já transformaram sua produtividade com nossa plataforma de IA avançada
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                  <Link href="/register">
                    <EnhancedButton size="lg" className="min-w-[220px] h-16 text-lg">
                      <Zap className="w-6 h-6 mr-3" />
                      Começar Agora - Grátis
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </EnhancedButton>
                  </Link>
                  <Link href="/login">
                    <EnhancedButton variant="outline" size="lg" className="min-w-[220px] h-16 text-lg">
                      <Users className="w-6 h-6 mr-3" />
                      Fazer Login
                    </EnhancedButton>
                  </Link>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-16 px-8 border-t border-slate-800/50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <SlideInSection direction="left">
                <Link href="/" className="flex items-center space-x-3 mb-8 md:mb-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    MeetingAI
                  </span>
                </Link>
              </SlideInSection>
              <SlideInSection direction="right">
                <div className="text-slate-400 text-sm">
                  © 2024 MeetingAI. Todos os direitos reservados.
                </div>
              </SlideInSection>
            </div>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
}
