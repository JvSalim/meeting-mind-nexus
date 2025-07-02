'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, Download, FileText, ArrowLeft, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

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
  participants: ['Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Costa', 'Fernanda Lima', 'Pedro Souza', 'Lucia Castro', 'Roberto Alves'],
  transcript: `[14:30] Ana Silva: Boa tarde pessoal, vamos começar nossa reunião de planejamento estratégico para o Q4 2024. Primeiro, gostaria de revisar onde estamos em relação às nossas metas do Q3.

[14:32] Carlos Santos: Obrigado Ana. Em relação às vendas, conseguimos atingir 105% da meta no Q3, o que é um resultado excelente. Nosso pipeline para Q4 está bem robusto com aproximadamente R$ 2.3 milhões em oportunidades qualificadas.

[14:35] Maria Oliveira: Complementando o Carlos, do ponto de vista de marketing, nossas campanhas digitais tiveram um ROI de 380% no último trimestre. Para Q4, estamos planejando intensificar os investimentos em marketing de conteúdo e SEO.

[14:38] João Costa: Perfeito. Do lado de produto, finalizamos todas as features planejadas para Q3 e já estamos com 60% do roadmap do Q4 em desenvolvimento. A nova funcionalidade de analytics avançado deve estar pronta até novembro.

[14:42] Fernanda Lima: Excelente trabalho, João. Em termos de recursos humanos, contratamos 8 novos colaboradores no Q3 e estamos com processos em andamento para mais 5 posições estratégicas que devem ser preenchidas até dezembro.

[14:45] Pedro Souza: Sobre a parte financeira, nossa margem EBITDA melhorou 12% comparado ao mesmo período do ano passado. Para Q4, estamos projetando um crescimento de receita de 25% em relação ao Q3.

[14:48] Ana Silva: Ótimos números, Pedro. Agora vamos discutir nossas prioridades estratégicas para Q4. Lucia, pode nos falar sobre as iniciativas de expansão?

[14:50] Lucia Castro: Claro, Ana. Identificamos três mercados prioritários para expansão: Rio de Janeiro, Belo Horizonte e Porto Alegre. Nossa análise de mercado mostra um potencial de crescimento de 40% nessas regiões.

[14:55] Roberto Alves: Do ponto de vista operacional, precisaremos ajustar nossa infraestrutura para suportar essa expansão. Já estamos negociando com fornecedores locais e parceiros logísticos nessas cidades.

[15:00] Ana Silva: Perfeito. Vamos agora definir nossas metas específicas para Q4...`,
  summary: `Esta reunião de planejamento estratégico para Q4 2024 apresentou resultados excepcionais do Q3, com vendas superando a meta em 5% e ROI de marketing de 380%. Os principais pontos discutidos incluem:

• **Desempenho Q3**: Todas as áreas superaram expectativas, com crescimento consistente em vendas, marketing e desenvolvimento de produto.

• **Expansão geográfica**: Aprovada expansão para Rio de Janeiro, Belo Horizonte e Porto Alegre, com potencial de crescimento de 40%.

• **Recursos humanos**: 8 novas contratações realizadas, com 5 posições estratégicas em processo para Q4.

• **Perspectivas financeiras**: Projeção de crescimento de receita de 25% no Q4, com melhoria de 12% na margem EBITDA.

• **Roadmap de produto**: 60% do roadmap Q4 já em desenvolvimento, com funcionalidade de analytics avançado prevista para novembro.`,
  keywords: ['estratégia', 'Q4', 'metas', 'vendas', 'expansão', 'crescimento', 'ROI', 'EBITDA', 'roadmap']
}

export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = (format: 'pdf' | 'word') => {
    // Implementação futura da exportação
    console.log(`Exportando para ${format}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/meetings" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar para reuniões
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{mockMeetingDetail.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
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

        {/* Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resumo Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                {mockMeetingDetail.summary}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Palavras-chave principais:</p>
              <div className="flex flex-wrap gap-2">
                {mockMeetingDetail.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockMeetingDetail.participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {participant.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{participant}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Transcrição Completa
              </CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(mockMeetingDetail.transcript)}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono leading-relaxed">
                {mockMeetingDetail.transcript}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Reunião
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Exportar como PDF
              </button>
              <button
                onClick={() => handleExport('word')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Exportar como Word
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
