
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MeetingAI - Transcrição Inteligente de Reuniões',
  description: 'Automatize a transcrição e análise de suas reuniões com IA avançada. Faça perguntas sobre qualquer reunião e obtenha respostas instantâneas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
