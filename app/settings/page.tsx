
'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, User, Bell, Shield, Palette, Globe, Save } from 'lucide-react'
import Link from 'next/link'
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
    name: 'João Silva',
    email: 'joao@empresa.com',
    company: 'TechCorp',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    meeting: true
  })

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleProfileSave = () => {
    console.log('Perfil salvo:', profile)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-purple-400" />
                Configurações
              </h1>
              <p className="text-slate-300">
                Gerencie suas preferências e configurações da conta
              </p>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  Informações do Perfil
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Atualize suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-300">Empresa</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <EnhancedButton 
                  onClick={handleProfileSave} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </EnhancedButton>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                  Notificações
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure como você quer receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Notificações por E-mail</h4>
                    <p className="text-sm text-slate-400">Receba atualizações importantes por e-mail</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Notificações Push</h4>
                    <p className="text-sm text-slate-400">Receba notificações no navegador</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('push', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Relatório Semanal</h4>
                    <p className="text-sm text-slate-400">Resumo das suas reuniões da semana</p>
                  </div>
                  <Switch
                    checked={notifications.weekly}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('weekly', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Lembrete de Reuniões</h4>
                    <p className="text-sm text-slate-400">Notificações antes das reuniões</p>
                  </div>
                  <Switch
                    checked={notifications.meeting}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('meeting', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-green-400" />
                  Aparência
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Personalize a aparência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Tema</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-full mt-2 bg-slate-700/50 border-slate-600/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Language & Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-400" />
                  Idioma e Região
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Configure seu idioma e fuso horário
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Idioma</Label>
                  <Select value={profile.language} onValueChange={(value: string) => setProfile(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="w-full mt-2 bg-slate-700/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Fuso Horário</Label>
                  <Select value={profile.timezone} onValueChange={(value: string) => setProfile(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="w-full mt-2 bg-slate-700/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-400" />
                  Segurança
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Gerencie a segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                >
                  Alterar Senha
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                >
                  Configurar Autenticação em Duas Etapas
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  className="w-full justify-start text-red-400 border-red-600/50 hover:bg-red-600/10 hover:border-red-500"
                >
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
