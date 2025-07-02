
'use client'

import Link from "next/link";
import { Button } from "../components/ui/button";
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
  Upload
} from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedText from "../components/ui/animated-text";
import { InteractiveButton } from "../components/ui/interactive-button";
import { PageTransition, FadeInSection, SlideInSection } from "../components/ui/page-transition";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "IA Avançada",
      description: "Transcrição precisa com reconhecimento de voz de última geração"
    },
    {
      icon: MessageSquare,
      title: "Chat Inteligente",
      description: "Faça perguntas sobre suas reuniões e obtenha respostas instantâneas"
    },
    {
      icon: Calendar,
      title: "Gestão Completa",
      description: "Organize, busque e analise todas as suas reuniões em um só lugar"
    },
    {
      icon: TrendingUp,
      title: "Analytics Avançado",
      description: "Insights sobre produtividade e padrões de comunicação"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechCorp",
      content: "Revolucionou como nossa equipe gerencia reuniões. Economia de 3h por semana!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Product Manager",
      content: "A busca inteligente me permite encontrar qualquer decisão em segundos.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Consultora",
      content: "Ferramenta essencial para minha produtividade. Não consigo mais trabalhar sem ela.",
      rating: 5
    }
  ];

  const aiTexts = [
    "Transcreva reuniões automaticamente",
    "Encontre informações instantaneamente", 
    "Analise padrões de comunicação",
    "Otimize sua produtividade"
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000" />
      </div>

      <PageTransition>
        {/* Header */}
        <header className="relative z-20 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Recursos</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Depoimentos</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Preços</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <InteractiveButton variant="primary">
                Começar Grátis
              </InteractiveButton>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <FadeInSection className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-center space-x-2">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium text-purple-300 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  IA Avançada para Reuniões
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transforme suas{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                reuniões
              </span>
              <br />
              em insights
            </h1>
            
            <div className="text-xl md:text-2xl text-slate-300 mb-4 h-8">
              <AnimatedText 
                texts={aiTexts}
                className="font-medium bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent"
              />
            </div>
            
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Plataforma completa de IA para transcrever, analisar e otimizar suas reuniões. 
              Economize tempo e nunca perca informações importantes novamente.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/register">
                <InteractiveButton size="lg" className="w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </InteractiveButton>
              </Link>
              
              <Link href="/login">
                <InteractiveButton variant="outline" size="lg" className="w-full sm:w-auto">
                  <Upload className="w-5 h-5 mr-2" />
                  Fazer Upload de Reunião
                </InteractiveButton>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Grátis para começar</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Setup em 2 minutos</span>
              </div>
            </div>
          </FadeInSection>
        </main>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Recursos{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Inteligentes
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Tecnologia de ponta para revolucionar como você gerencia reuniões
            </p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <SlideInSection
                key={index}
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SlideInSection>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 bg-slate-800/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto">
            <FadeInSection className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                O que nossos{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  usuários dizem
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Histórias reais de transformação e produtividade
              </p>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <FadeInSection key={index} delay={index * 0.2}>
                  <div className="p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-slate-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInSection>
              <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Pronto para{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    revolucionar
                  </span>
                  {" "}suas reuniões?
                </h2>
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                  Junte-se a milhares de profissionais que já transformaram sua produtividade
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/register">
                    <InteractiveButton size="lg">
                      <Zap className="w-5 h-5 mr-2" />
                      Começar Agora - Grátis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </InteractiveButton>
                  </Link>
                  <Link href="/login">
                    <InteractiveButton variant="outline" size="lg">
                      <Users className="w-5 h-5 mr-2" />
                      Fazer Login
                    </InteractiveButton>
                  </Link>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-800/50 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 MeetingAI. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
}
