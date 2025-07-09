
'use client'

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Key,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [user, setUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();

  const [settings, setSettings] = useState({
    profile: {
      name: '',
      email: '',
      phone: '',
      company: '',
      position: ''
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: false,
      loginAlerts: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      meetingReminders: true,
      soundEnabled: true
    },
    appearance: {
      theme: 'dark',
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo'
    },
    privacy: {
      dataSharing: false,
      analyticsOptOut: false,
      autoBackup: true
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Initialize settings with user data
    setSettings(prev => ({
      ...prev,
      profile: {
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        company: parsedUser.companyName || '',
        position: parsedUser.position || ''
      }
    }));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    const updatedUser = {
      ...user,
      name: settings.profile.name,
      email: settings.profile.email,
      phone: settings.profile.phone,
      companyName: settings.profile.company,
      position: settings.profile.position
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const settingsTabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'appearance', label: 'Aparência', icon: Palette }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Configurações
                  </h1>
                  <p className="text-xl text-slate-400">
                    Personalize sua experiência e gerencie suas preferências
                  </p>
                </div>
              </div>
              
              <EnhancedButton
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </EnhancedButton>
            </div>
          </div>
        </motion.header>

        <div className="px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-64 flex-shrink-0"
              >
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Configurações</h3>
                    <nav className="space-y-2">
                      {settingsTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm'
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <tab.icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </Card>
              </motion.div>

              {/* Settings Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-1"
              >
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl">
                  <div className="p-8">
                    {activeTab === 'profile' && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">Informações do Perfil</h2>
                          <p className="text-slate-400">Gerencie suas informações pessoais e profissionais</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-300 font-medium">Nome Completo</Label>
                            <Input
                              id="name"
                              value={settings.profile.name}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                profile: { ...prev.profile, name: e.target.value }
                              }))}
                              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300 font-medium">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={settings.profile.email}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                profile: { ...prev.profile, email: e.target.value }
                              }))}
                              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-300 font-medium">Telefone</Label>
                            <Input
                              id="phone"
                              value={settings.profile.phone}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                profile: { ...prev.profile, phone: e.target.value }
                              }))}
                              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="company" className="text-slate-300 font-medium">Empresa</Label>
                            <Input
                              id="company"
                              value={settings.profile.company}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                profile: { ...prev.profile, company: e.target.value }
                              }))}
                              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">Segurança da Conta</h2>
                          <p className="text-slate-400">Mantenha sua conta protegida com configurações de segurança avançadas</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword" className="text-slate-300 font-medium">Senha Atual</Label>
                              <div className="relative">
                                <Input
                                  id="currentPassword"
                                  type={showPassword ? "text" : "password"}
                                  value={settings.security.currentPassword}
                                  onChange={(e) => setSettings(prev => ({
                                    ...prev,
                                    security: { ...prev.security, currentPassword: e.target.value }
                                  }))}
                                  className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="newPassword" className="text-slate-300 font-medium">Nova Senha</Label>
                              <Input
                                id="newPassword"
                                type="password"
                                value={settings.security.newPassword}
                                onChange={(e) => setSettings(prev => ({
                                  ...prev,
                                  security: { ...prev.security, newPassword: e.target.value }
                                }))}
                                className="bg-slate-700 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20"
                              />
                            </div>
                          </div>
                          
                          <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Key className="w-5 h-5 text-purple-400" />
                                <div>
                                  <h3 className="font-semibold text-white">Autenticação de Dois Fatores</h3>
                                  <p className="text-sm text-slate-400">Adicione uma camada extra de segurança</p>
                                </div>
                              </div>
                              <Switch
                                checked={settings.security.twoFactor}
                                onCheckedChange={(checked) => setSettings(prev => ({
                                  ...prev,
                                  security: { ...prev.security, twoFactor: checked }
                                }))}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">Notificações</h2>
                          <p className="text-slate-400">Configure como e quando você quer ser notificado</p>
                        </div>
                        
                        <div className="space-y-6">
                          {[
                            { key: 'emailNotifications', title: 'Notificações por Email', desc: 'Receba atualizações importantes por email', icon: Mail },
                            { key: 'pushNotifications', title: 'Notificações Push', desc: 'Notificações instantâneas no navegador', icon: Smartphone },
                            { key: 'meetingReminders', title: 'Lembretes de Reunião', desc: 'Seja lembrado antes das reuniões', icon: Bell },
                            { key: 'soundEnabled', title: 'Sons de Notificação', desc: 'Reproduzir sons para alertas', icon: Volume2 }
                          ].map((notification) => (
                            <div key={notification.key} className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <notification.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-white">{notification.title}</h3>
                                    <p className="text-sm text-slate-400">{notification.desc}</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={settings.notifications[notification.key as keyof typeof settings.notifications] as boolean}
                                  onCheckedChange={(checked) => setSettings(prev => ({
                                    ...prev,
                                    notifications: { ...prev.notifications, [notification.key]: checked }
                                  }))}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'appearance' && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">Aparência</h2>
                          <p className="text-slate-400">Personalize a interface de acordo com suas preferências</p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                              <Sun className="w-5 h-5 text-purple-400" />
                              Tema da Interface
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                { key: 'light', title: 'Claro', icon: Sun },
                                { key: 'dark', title: 'Escuro', icon: Moon },
                                { key: 'system', title: 'Sistema', icon: Monitor }
                              ].map((theme) => (
                                <button
                                  key={theme.key}
                                  onClick={() => setSettings(prev => ({
                                    ...prev,
                                    appearance: { ...prev.appearance, theme: theme.key }
                                  }))}
                                  className={`p-4 rounded-lg border transition-all duration-200 ${
                                    settings.appearance.theme === theme.key
                                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                                      : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                                  }`}
                                >
                                  <theme.icon className="w-6 h-6 mx-auto mb-2" />
                                  <span className="text-sm font-medium">{theme.title}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-slate-300 font-medium flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Idioma
                              </Label>
                              <select
                                value={settings.appearance.language}
                                onChange={(e) => setSettings(prev => ({
                                  ...prev,
                                  appearance: { ...prev.appearance, language: e.target.value }
                                }))}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500/20"
                              >
                                <option value="pt-BR">Português (Brasil)</option>
                                <option value="en-US">English (US)</option>
                                <option value="es-ES">Español</option>
                              </select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300 font-medium">Fuso Horário</Label>
                              <select
                                value={settings.appearance.timezone}
                                onChange={(e) => setSettings(prev => ({
                                  ...prev,
                                  appearance: { ...prev.appearance, timezone: e.target.value }
                                }))}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:ring-purple-500/20"
                              >
                                <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                                <option value="America/New_York">New York (GMT-5)</option>
                                <option value="Europe/London">London (GMT+0)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
