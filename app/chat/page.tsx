
'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, MessageSquare, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastMessage: Date
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Análise da reunião de planejamento Q4',
    messages: [
      {
        id: '1',
        type: 'user',
        content: 'Pode me fazer um resumo dos pontos principais da reunião de planejamento estratégico?',
        timestamp: new Date('2024-01-15T15:30:00')
      },
      {
        id: '2',
        type: 'assistant',
        content: 'Com base na transcrição da reunião de planejamento estratégico Q4 2024, aqui estão os pontos principais:\n\n**Resultados Q3:**\n• Vendas superaram meta em 5% (105% de atingimento)\n• ROI de marketing atingiu 380%\n• Todas as features do roadmap foram entregues\n• Margem EBITDA melhorou 12%\n\n**Planos Q4:**\n• Expansão para Rio de Janeiro, Belo Horizonte e Porto Alegre\n• Projeção de crescimento de receita de 25%\n• 5 novas contratações estratégicas\n• Lançamento da funcionalidade de analytics avançado\n\nA reunião demonstrou resultados consistentes e um plano ambicioso para o último trimestre.',
        timestamp: new Date('2024-01-15T15:30:30')
      }
    ],
    lastMessage: new Date('2024-01-15T15:30:30')
  }
]

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversations[0]?.id || null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    }

    // Add user message
    if (activeConversationId) {
      setConversations(prev => prev.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, messages: [...conv.messages, userMessage], lastMessage: new Date() }
          : conv
      ))
    } else {
      // Create new conversation
      const newConversation: Conversation = {
        id: Math.random().toString(36).substr(2, 9),
        title: message.trim().slice(0, 50) + (message.trim().length > 50 ? '...' : ''),
        messages: [userMessage],
        lastMessage: new Date()
      }
      setConversations(prev => [newConversation, ...prev])
      setActiveConversationId(newConversation.id)
    }

    setMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      }

      setConversations(prev => prev.map(conv => 
        conv.id === (activeConversationId || prev[0]?.id)
          ? { ...conv, messages: [...conv.messages, aiMessage], lastMessage: new Date() }
          : conv
      ))
      setIsLoading(false)
    }, 1500 + Math.random() * 1000)
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'Com base nas transcrições das suas reuniões, posso identificar que este tópico foi discutido principalmente na reunião de planejamento estratégico. Aqui está o que encontrei...',
      'Analisando o histórico de conversas das suas reuniões, identifiquei alguns pontos relevantes sobre essa questão...',
      'Baseado no conteúdo das reuniões transcritas, posso fornecer insights sobre este assunto...',
      'Consultando a base de conhecimento das suas reuniões, encontrei informações pertinentes...'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const createNewConversation = () => {
    setActiveConversationId(null)
    setMessage('')
  }

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId))
    if (activeConversationId === conversationId) {
      const remaining = conversations.filter(c => c.id !== conversationId)
      setActiveConversationId(remaining[0]?.id || null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={createNewConversation}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Nova Conversa
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-slate-500 mb-3">Conversas Recentes</h3>
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group p-3 rounded-lg cursor-pointer transition-colors relative ${
                  activeConversationId === conversation.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <h4 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">
                  {conversation.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {conversation.lastMessage.toLocaleDateString()} às{' '}
                  {conversation.lastMessage.toLocaleTimeString().slice(0, 5)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conversation.id)
                  }}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-bold text-slate-900">Chat com IA</h1>
          <p className="text-slate-600">Faça perguntas sobre suas reuniões e obtenha insights inteligentes</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeConversation ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 max-w-3xl ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-4 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-slate-200 text-slate-900'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {msg.timestamp.toLocaleTimeString().slice(0, 5)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block p-4 bg-white border border-slate-200 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-slate-600">Pensando...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Comece uma nova conversa</h3>
                <p className="text-slate-600 mb-4">Faça perguntas sobre suas reuniões e obtenha insights inteligentes</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua pergunta sobre as reuniões..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
