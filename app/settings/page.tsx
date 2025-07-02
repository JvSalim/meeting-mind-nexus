
'use client'

import { useState } from 'react'
import { ArrowLeft, User, Bell, Shield, Palette, Globe } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'

export default function SettingsPage() {
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

  const handleProfileSave = () => {
    console.log('Perfil salvo:', profile)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Configurações</h1>
          <p className="text-slate-600">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-slate-200 shadow-lg sticky top-6">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                    <User className="w-4 h-4" />
                    Perfil
                  </a>
                  <a href="#notifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                    <Bell className="w-4 h-4" />
                    Notificações
                  </a>
                  <a href="#appearance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                    <Palette className="w-4 h-4" />
                    Aparência
                  </a>
                  <a href="#language" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                    <Globe className="w-4 h-4" />
                    Idioma e Região
                  </a>
                  <a href="#security" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700">
                    <Shield className="w-4 h-4" />
                    Segurança
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <Card id="profile" className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informações do Perfil
                </CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <Button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card id="notifications" className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure como você quer receber notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Notificações por E-mail</h4>
                    <p className="text-sm text-slate-600">Receba atualizações importantes por e-mail</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Notificações Push</h4>
                    <p className="text-sm text-slate-600">Receba notificações no navegador</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('push', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Relatório Semanal</h4>
                    <p className="text-sm text-slate-600">Resumo das suas reuniões da semana</p>
                  </div>
                  <Switch
                    checked={notifications.weekly}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('weekly', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Lembrete de Reuniões</h4>
                    <p className="text-sm text-slate-600">Notificações antes das reuniões</p>
                  </div>
                  <Switch
                    checked={notifications.meeting}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('meeting', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card id="appearance" className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Aparência
                </CardTitle>
                <CardDescription>Personalize a aparência da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Tema</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card id="language" className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Idioma e Região
                </CardTitle>
                <CardDescription>Configure seu idioma e fuso horário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Idioma</Label>
                  <Select value={profile.language} onValueChange={(value: string) => setProfile(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fuso Horário</Label>
                  <Select value={profile.timezone} onValueChange={(value: string) => setProfile(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card id="security" className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Segurança
                </CardTitle>
                <CardDescription>Gerencie a segurança da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Configurar Autenticação em Duas Etapas
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
