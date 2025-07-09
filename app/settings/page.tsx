
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
  Shield, 
  Save,
  Eye,
  EyeOff,
  Key,
  Mail
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
      twoFactor: false
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
    { id: 'security', label: 'Segurança', icon: Shield }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-emerald-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <div className="relative px-8 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                      Configurações
                    </h1>
                    <p className="text-xl text-slate-300 mt-2">
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
            </motion.div>
          </div>
        </div>

        <div className="px-8 pb-16 -mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              {/* Sidebar Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-64 flex-shrink-0"
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
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
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
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
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
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
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
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
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
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
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
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
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
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
                                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 pr-10 backdrop-blur-sm"
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
                                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
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

                          <div className="p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">Notificações por Email</h3>
                                <p className="text-sm text-slate-400">Receba atualizações importantes sobre suas reuniões</p>
                              </div>
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
