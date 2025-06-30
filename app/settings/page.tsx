
'use client'

import { useState } from 'react'
import { User, Globe, Palette, Moon, Sun, RotateCcw, Save, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Settings {
  name: string
  email: string
  language: string
  theme: 'light' | 'dark' | 'auto'
  colorScheme: string
  notifications: {
    email: boolean
    push: boolean
    transcription: boolean
  }
}

const initialSettings: Settings = {
  name: 'João Silva',
  email: 'joao.silva@empresa.com',
  language: 'pt-BR',
  theme: 'light',
  colorScheme: 'blue',
  notifications: {
    email: true,
    push: true,
    transcription: true
  }
}

const languages = [
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Español' }
]

const colorSchemes = [
  { id: 'blue', name: 'Azul', color: 'bg-blue-600' },
  { id: 'purple', name: 'Roxo', color: 'bg-purple-600' },
  { id: 'green', name: 'Verde', color: 'bg-green-600' },
  { id: 'orange', name: 'Laranja', color: 'bg-orange-600' },
  { id: 'red', name: 'Vermelho', color: 'bg-red-600' }
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Simulate saving
    console.log('Saving settings:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setSettings(initialSettings)
  }

  const updateSettings = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateNotifications = (key: keyof Settings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Configurações</h1>
          <p className="text-slate-600">Personalize sua experiência no MeetingMind Nexus</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => updateSettings('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSettings('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Idioma e Região
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Idioma da Interface
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSettings('language', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tema e Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Modo de Tema
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'light', label: 'Claro', icon: Sun },
                    { value: 'dark', label: 'Escuro', icon: Moon },
                    { value: 'auto', label: 'Automático', icon: RotateCcw }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings('theme', value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        settings.theme === value
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Esquema de Cores
                </label>
                <div className="flex gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => updateSettings('colorScheme', scheme.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        settings.colorScheme === scheme.id
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${scheme.color}`}></div>
                      {scheme.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'email' as const,
                  label: 'Notificações por Email',
                  description: 'Receber atualizações sobre transcrições e resumos por email'
                },
                {
                  key: 'push' as const,
                  label: 'Notificações Push',
                  description: 'Receber notificações push no navegador'
                },
                {
                  key: 'transcription' as const,
                  label: 'Alertas de Transcrição',
                  description: 'Ser notificado quando uma transcrição for concluída'
                }
              ].map((notification) => (
                <div key={notification.key} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900">{notification.label}</h3>
                    <p className="text-sm text-slate-600 mt-1">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={settings.notifications[notification.key]}
                      onChange={(e) => updateNotifications(notification.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between p-6 bg-white rounded-lg border border-slate-200">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrões
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Configurações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
