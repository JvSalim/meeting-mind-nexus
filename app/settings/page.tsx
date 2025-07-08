
'use client'

import { useState, useEffect } from 'react'
import { User, Bell, Shield, Palette, Globe, Save, Settings, Key, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { EnhancedButton } from '../../components/ui/enhanced-button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'
import { Sidebar } from '../../components/ui/sidebar'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    meeting: true,
    summary: true
  })

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    
    // Definir valores do perfil baseado no usuário
    setProfile({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo'
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleProfileSave = () => {
    console.log('Perfil salvo:', profile)
    // Aqui você salvaria as alterações
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-2xl">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-2xl shadow-2xl border-b border-slate-700/30 p-8 sticky top-0 z-30"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl">
                <Settings className="w-8 h-8 text-violet-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-indigo-200 bg-clip-text text-transparent">
                  Configurações Pessoais
                </h1>
                <p className="text-slate-400 text-lg mt-1">
                  Personalize sua experiência no MeetingAI
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white flex items-center">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl mr-3">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  Informações Pessoais
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  Mantenha seus dados pessoais sempre atualizados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-300 font-medium">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700/30 border-slate-600/40 text-white placeholder-slate-400 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12 text-base"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-slate-300 font-medium">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-slate-700/30 border-slate-600/40 text-white placeholder-slate-400 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12 text-base"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-slate-300 font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-700/30 border-slate-600/40 text-white placeholder-slate-400 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl h-12 text-base"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <EnhancedButton 
                    onClick={handleProfileSave} 
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white flex items-center">
                  <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl mr-3">
                    <Bell className="w-6 h-6 text-amber-400" />
                  </div>
                  Notificações
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  Escolha como deseja receber suas notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'email', title: 'Notificações por E-mail', desc: 'Receba atualizações importantes por e-mail' },
                  { key: 'push', title: 'Notificações Push', desc: 'Notificações instantâneas no navegador' },
                  { key: 'weekly', title: 'Relatório Semanal', desc: 'Resumo semanal das suas atividades' },
                  { key: 'meeting', title: 'Lembrete de Reuniões', desc: 'Avisos antes das reuniões começarem' },
                  { key: 'summary', title: 'Resumos Automáticos', desc: 'Receba resumos das transcrições por e-mail' }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl border border-slate-600/20">
                    <div>
                      <h4 className="font-semibold text-white text-base">{notification.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{notification.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[notification.key as keyof typeof notifications]}
                      onCheckedChange={(checked: boolean) => handleNotificationChange(notification.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Language & Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white flex items-center">
                  <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl mr-3">
                    <Globe className="w-6 h-6 text-emerald-400" />
                  </div>
                  Idioma e Região
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  Configure seu idioma e fuso horário preferidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium">Idioma</Label>
                    <Select value={profile.language} onValueChange={(value: string) => setProfile(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger className="bg-slate-700/30 border-slate-600/40 text-white h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium">Fuso Horário</Label>
                    <Select value={profile.timezone} onValueChange={(value: string) => setProfile(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger className="bg-slate-700/30 border-slate-600/40 text-white h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 rounded-xl">
                        <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white flex items-center">
                  <div className="p-2 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl mr-3">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  Segurança da Conta
                </CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  Mantenha sua conta segura e protegida
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start bg-slate-700/20 border-slate-600/30 text-slate-300 hover:bg-slate-600/30 hover:text-white h-14 text-base rounded-xl"
                >
                  <Key className="w-5 h-5 mr-3" />
                  Alterar Senha
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start bg-slate-700/20 border-slate-600/30 text-slate-300 hover:bg-slate-600/30 hover:text-white h-14 text-base rounded-xl"
                >
                  <Smartphone className="w-5 h-5 mr-3" />
                  Configurar Autenticação em Duas Etapas
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start text-red-400 border-red-600/40 hover:bg-red-600/10 hover:border-red-500 h-14 text-base rounded-xl"
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Excluir Conta
                </EnhancedButton>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
