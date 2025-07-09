
'use client'

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Search, 
  Users, 
  UserPlus,
  UserCheck,
  Building2,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Settings,
  Check,
  X,
  Clock,
  Shield,
  Crown,
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Empresa = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'settings'>('requests');
  const router = useRouter();

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      requestDate: "2024-01-15",
      department: "Marketing",
      role: "Analista",
      status: 'pending'
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com", 
      requestDate: "2024-01-14",
      department: "Vendas",
      role: "Consultor",
      status: 'pending'
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria.oliveira@empresa.com",
      requestDate: "2024-01-13",
      department: "RH",
      role: "Coordenadora",
      status: 'pending'
    }
  ]);

  const [activeUsers, setActiveUsers] = useState([
    {
      id: 1,
      name: "João Pedro",
      email: "joao.pedro@empresa.com",
      joinDate: "2023-12-01",
      department: "Tecnologia",
      role: "Desenvolvedor",
      lastAccess: "2024-01-15",
      meetingsCount: 45,
      status: 'active'
    },
    {
      id: 2,
      name: "Fernanda Costa",
      email: "fernanda.costa@empresa.com",
      joinDate: "2023-11-15",
      department: "Design",
      role: "Designer",
      lastAccess: "2024-01-14",
      meetingsCount: 32,
      status: 'active'
    },
    {
      id: 3,
      name: "Ricardo Lima",
      email: "ricardo.lima@empresa.com",
      joinDate: "2023-10-20",
      department: "Produto",
      role: "Product Manager",
      lastAccess: "2024-01-12",
      meetingsCount: 67,
      status: 'active'
    }
  ]);

  const companyStats = [
    { title: "Membros Ativos", value: "24", icon: Users, color: "from-blue-500 to-cyan-500" },
    { title: "Solicitações Pendentes", value: "3", icon: UserPlus, color: "from-orange-500 to-red-500" },
    { title: "Departamentos", value: "8", icon: Building2, color: "from-emerald-500 to-teal-500" },
    { title: "Reuniões Este Mês", value: "156", icon: Calendar, color: "from-purple-500 to-violet-500" }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.accountType !== 'company') {
      router.push("/dashboard");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleApproveRequest = (id: number) => {
    const request = pendingRequests.find(r => r.id === id);
    if (request) {
      const newUser = {
        ...request,
        joinDate: new Date().toISOString().split('T')[0],
        lastAccess: new Date().toISOString().split('T')[0],
        meetingsCount: 0,
        status: 'active' as const
      };
      
      setActiveUsers(prev => [...prev, newUser]);
      setPendingRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleRejectRequest = (id: number) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleRemoveUser = (id: number) => {
    setActiveUsers(prev => prev.filter(u => u.id !== id));
  };

  const filteredRequests = pendingRequests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = activeUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-emerald-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
          
          <div className="relative px-8 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                      Gestão Empresarial
                    </h1>
                    <p className="text-xl text-slate-300 mt-2">
                      Administre sua equipe e controle acessos com facilidade
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-80 bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-xl"
                    />
                  </div>
                  <EnhancedButton variant="outline" className="bg-white/5 border-white/10 text-slate-300 backdrop-blur-xl">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-8 pb-16 -mt-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                          <p className="text-slate-400 text-sm">{stat.title}</p>
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-2 bg-white/5 backdrop-blur-xl rounded-2xl p-2 w-fit border border-white/10"
            >
              {[
                { key: 'requests', label: 'Solicitações', icon: UserPlus, count: pendingRequests.length },
                { key: 'users', label: 'Usuários Ativos', icon: Users, count: activeUsers.length },
                { key: 'settings', label: 'Configurações', icon: Settings, count: null }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <Badge variant="outline" className={`${
                      activeTab === tab.key 
                        ? 'bg-white/20 text-white border-white/30' 
                        : tab.key === 'requests' && tab.count > 0
                        ? 'bg-red-600/20 text-red-300 border-red-500/30'
                        : 'bg-green-600/20 text-green-300 border-green-500/30'
                    }`}>
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </motion.div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'requests' ? (
                <motion.div
                  key="requests"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredRequests.length === 0 ? (
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <UserPlus className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">Nenhuma solicitação pendente</h3>
                        <p className="text-slate-300 max-w-md mx-auto">Todas as solicitações de acesso foram processadas. Novas solicitações aparecerão aqui.</p>
                      </div>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredRequests.map((request, index) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                        >
                          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                    {request.name.charAt(0)}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-white">{request.name}</h3>
                                    <p className="text-slate-300 text-sm">{request.role} • {request.department}</p>
                                  </div>
                                </div>
                                
                                <Badge variant="outline" className="bg-orange-600/20 text-orange-300 border-orange-500/30">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pendente
                                </Badge>
                              </div>
                              
                              <div className="space-y-3 mb-6">
                                <div className="flex items-center text-slate-300 text-sm">
                                  <Mail className="w-4 h-4 mr-3 text-slate-400" />
                                  {request.email}
                                </div>
                                <div className="flex items-center text-slate-300 text-sm">
                                  <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                                  {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <EnhancedButton
                                  onClick={() => handleApproveRequest(request.id)}
                                  size="sm"
                                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Aprovar
                                </EnhancedButton>
                                
                                <EnhancedButton
                                  onClick={() => handleRejectRequest(request.id)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 bg-red-600/10 border-red-500/30 text-red-300 hover:bg-red-600/20"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Rejeitar
                                </EnhancedButton>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : activeTab === 'users' ? (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                                  <p className="text-slate-300 text-sm">{user.role} • {user.department}</p>
                                </div>
                              </div>
                              
                              <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-500/30">
                                <UserCheck className="w-3 h-3 mr-1" />
                                Ativo
                              </Badge>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                              <div className="flex items-center text-slate-300 text-sm">
                                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                                {user.email}
                              </div>
                              <div className="flex items-center text-slate-300 text-sm">
                                <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                                Desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                              </div>
                              <div className="flex items-center text-slate-300 text-sm">
                                <Users className="w-4 h-4 mr-3 text-slate-400" />
                                {user.meetingsCount} reuniões
                              </div>
                            </div>
                            
                            <div className="text-xs text-slate-400 mb-4">
                              Último acesso: {new Date(user.lastAccess).toLocaleDateString('pt-BR')}
                            </div>
                            
                            <div className="flex gap-3">
                              <EnhancedButton
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </EnhancedButton>
                              
                              <EnhancedButton
                                onClick={() => handleRemoveUser(user.id)}
                                variant="outline"
                                size="sm"
                                className="bg-red-600/10 border-red-500/30 text-red-300 hover:bg-red-600/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </EnhancedButton>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white">Configurações da Empresa</h3>
                          <p className="text-slate-300">Gerencie as configurações e informações da sua empresa</p>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        {/* Company Info */}
                        <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
                          <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-400" />
                            Informações da Empresa
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Nome da Empresa</label>
                              <Input value={user.companyName} className="bg-white/5 border-white/10 text-white" readOnly />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">CNPJ</label>
                              <Input value={user.cnpj} className="bg-white/5 border-white/10 text-white" readOnly />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Email Corporativo</label>
                              <Input value={user.email} className="bg-white/5 border-white/10 text-white" readOnly />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
                              <Input value={user.phone} className="bg-white/5 border-white/10 text-white" readOnly />
                            </div>
                          </div>
                          <div className="mt-6">
                            <EnhancedButton variant="outline" className="bg-white/5 border-white/10 text-slate-300">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar Informações
                            </EnhancedButton>
                          </div>
                        </div>

                        {/* Security Settings */}
                        <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
                          <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-emerald-400" />
                            Permissões e Segurança
                          </h4>
                          <div className="space-y-6">
                            {[
                              { title: "Aprovação Automática", desc: "Aprovar automaticamente solicitações de domínio corporativo", checked: false },
                              { title: "Notificações por Email", desc: "Receber notificações sobre novas solicitações", checked: true },
                              { title: "Backup Automático", desc: "Fazer backup automático dos dados da empresa", checked: true }
                            ].map((setting, index) => (
                              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                  <h5 className="text-white font-medium">{setting.title}</h5>
                                  <p className="text-sm text-slate-400">{setting.desc}</p>
                                </div>
                                <input 
                                  type="checkbox" 
                                  defaultChecked={setting.checked}
                                  className="w-5 h-5 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empresa;
