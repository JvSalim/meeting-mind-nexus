
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
      <body className={`${inter.className} h-full w-full m-0 p-0 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
