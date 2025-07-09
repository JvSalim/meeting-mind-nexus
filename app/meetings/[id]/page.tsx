
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Download, FileText, ArrowLeft, Copy, Check, Play, Pause } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { EnhancedButton } from '../../../components/ui/enhanced-button'
import { motion } from 'framer-motion'

interface MeetingDetail {
  id: string
  title: string
  date: string
  time: string
  duration: string
  platform: string
  participants: string[]
  transcript: string
  summary: string
  keywords: string[]
}

const mockMeetingDetail: MeetingDetail = {
  id: '1',
  title: 'Planejamento Estratégico Q4 2024',
  date: '2024-01-15',
  time: '14:30',
  duration: '2h 15min',
  platform: 'Zoom',
  participants: ['Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima', 'Pedro Souza'],
  transcript: `[14:30] Ana Silva: Boa tarde pessoal, vamos começar nossa reunião de planejamento estratégico para o Q4 2024. Primeiro, gostaria de revisar onde estamos em relação às nossas metas do Q3.

[14:32] Carlos Santos: Obrigado Ana. Em relação às vendas, conseguimos atingir 105% da meta no Q3, o que é um resultado excelente. Nosso pipeline para Q4 está bem robusto com aproximadamente R$ 2.3 milhões em oportunidades qualificadas.

[14:35] Maria Oliveira: Complementando o Carlos, do ponto de vista de marketing, nossas campanhas digitais tiveram um ROI de 380% no último trimestre. Para Q4, estamos planejando intensificar os investimentos em marketing de conteúdo e SEO.

[14:38] João Costa: Perfeito. Do lado de produto, finalizamos todas as features planejadas para Q3 e já estamos com 60% do roadmap do Q4 em desenvolvimento. A nova funcionalidade de analytics avançado deve estar pronta até novembro.

[14:42] Fernanda Lima: Excelente trabalho, João. Em termos de recursos humanos, contratamos 8 novos colaboradores no Q3 e estamos com processos em andamento para mais 5 posições estratégicas que devem ser preenchidas até dezembro.

[14:45] Pedro Souza: Sobre a parte financeira, nossa margem EBITDA melhorou 12% comparado ao mesmo período do ano passado. Para Q4, estamos projetando um crescimento de receita de 25% em relação ao Q3.`,
  summary: `Esta reunião de planejamento estratégico para Q4 2024 apresentou resultados excepcionais do Q3, com vendas superando a meta em 5% e ROI de marketing de 380%. Os principais pontos discutidos incluem:

• **Desempenho Q3**: Todas as áreas superaram expectativas, com crescimento consistente em vendas, marketing e desenvolvimento de produto.

• **Expansão geográfica**: Aprovada expansão para Rio de Janeiro, Belo Horizonte e Porto Alegre, com potencial de crescimento de 40%.

• **Recursos humanos**: 8 novas contratações realizadas, com 5 posições estratégicas em processo para Q4.

• **Perspectivas financeiras**: Projeção de crescimento de receita de 25% no Q4, com melhoria de 12% na margem EBITDA.

• **Roadmap de produto**: 60% do roadmap Q4 já em desenvolvimento, com funcionalidade de analytics avançado prevista para novembro.`,
  keywords: ['estratégia', 'Q4', 'metas', 'vendas', 'expansão', 'crescimento', 'ROI', 'EBITDA', 'roadmap']
}

export default function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [copied, setCopied] = useState(false)
  const [meetingId, setMeetingId] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setMeetingId(resolvedParams.id)
    }
    getParams()
  }, [params])

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = (format: 'pdf' | 'word') => {
    console.log(`Exportando para ${format}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-emerald-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <Link href="/meetings" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar para reuniões
            </Link>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  {mockMeetingDetail.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {mockMeetingDetail.date} às {mockMeetingDetail.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {mockMeetingDetail.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {mockMeetingDetail.participants.length} participantes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-8 pb-16 -mt-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Resumo Inteligente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-line text-slate-300 leading-relaxed">
                    {mockMeetingDetail.summary}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm font-medium text-slate-300 mb-2">Palavras-chave principais:</p>
                  <div className="flex flex-wrap gap-2">
                    {mockMeetingDetail.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Participants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-purple-400" />
                  Participantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockMeetingDetail.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {participant.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-300">{participant}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Transcrição Completa
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <EnhancedButton
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-slate-300 hover:bg-white/10"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Pausar' : 'Reproduzir'}
                    </EnhancedButton>
                    <EnhancedButton
                      onClick={() => handleCopy(mockMeetingDetail.transcript)}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-slate-300 hover:bg-white/10"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiado!' : 'Copiar'}
                    </EnhancedButton>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto backdrop-blur-sm">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono leading-relaxed">
                    {mockMeetingDetail.transcript}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Export Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Download className="w-5 h-5 text-purple-400" />
                  Exportar Reunião
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <EnhancedButton
                    onClick={() => handleExport('pdf')}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar como PDF
                  </EnhancedButton>
                  <EnhancedButton
                    onClick={() => handleExport('word')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar como Word
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
