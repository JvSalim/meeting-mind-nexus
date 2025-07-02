'use client'

import { useState } from 'react'
import { ArrowLeft, User, Globe, Palette, RotateCcw, Save } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@meetingmind.com'
  })
  const [language, setLanguage] = useState('pt')
  const [darkMode, setDarkMode] = useState(true)
  const [colorScheme, setColorScheme] = useState('purple')
  const [notifications, setNotifications] = useState(true)

  const handleSave = () => {
    // Simular salvamento
    console.log('Configurações salvas:', {
      profile,
      language,
      darkMode,
      colorScheme,
      notifications
    })
  }

  const handleReset = () => {
    setProfile({
      name: 'João Silva',
      email: 'joao@meetingmind.com'
    })
    setLanguage('pt')
    setDarkMode(true)
    setColorScheme('purple')
    setNotifications(true)
  }

  const colorSchemes = [
    { value: 'purple', label: 'Roxo & Azul', colors: 'from-purple-500 to-blue-500' },
    { value: 'green', label: 'Verde & Esmeralda', colors: 'from-green-500 to-emerald-500' },
    { value: 'orange', label: 'Laranja & Vermelho', colors: 'from-orange-500 to-red-500' },
    { value: 'blue', label: 'Azul & Ciano', colors: 'from-blue-500 to-cyan-500' }
  ]

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
          <p className="text-slate-600">Personalize sua experiência no MeetingMind</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Perfil do Usuário */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Perfil do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({...profile, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({...profile, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Idioma */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Idioma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Português (BR)</SelectItem>
                  <SelectItem value="en">English (US)</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="darkMode" className="text-slate-700">Modo Escuro</Label>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div>
                <Label className="text-slate-700 mb-2 block">Esquema de Cores</Label>
                <div className="grid grid-cols-2 gap-2">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.value}
                      onClick={() => setColorScheme(scheme.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        colorScheme === scheme.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-full h-4 rounded bg-gradient-to-r ${scheme.colors} mb-2`} />
                      <span className="text-sm text-slate-700">{scheme.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-slate-700">Receber Notificações</Label>
                  <p className="text-sm text-slate-500">Seja notificado sobre novas transcrições</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4 mt-8 justify-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Redefinir
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}
