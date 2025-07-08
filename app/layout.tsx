
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MeetingAI - Transcrição Inteligente com IA',
  description: 'Automatize a transcrição e análise de suas reuniões com inteligência artificial avançada.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} h-full w-full m-0 p-0 overflow-x-hidden antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
