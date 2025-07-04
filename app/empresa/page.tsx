
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Sidebar } from "../../components/ui/sidebar";
import { 
  Search, 
  Users, 
  UserPlus,
  UserCheck,
  UserX,
  Building2,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Crown,
  Filter,
  Download,
  Settings,
  Check,
  X,
  Clock,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";

const Empresa = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'settings'>('requests');
  const router = useRouter();

  // Dados mockados para solicitações pendentes
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@empresa.com",
      requestDate: "2024-01-15",
      department: "Marketing",
      role: "Analista",
      avatar: null,
      status: 'pending'
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@empresa.com", 
      requestDate: "2024-01-14",
      department: "Vendas",
      role: "Consultor",
      avatar: null,
      status: 'pending'
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria.oliveira@empresa.com",
      requestDate: "2024-01-13",
      department: "RH",
      role: "Coordenadora",
      avatar: null,
      status: 'pending'
    }
  ]);

  // Dados mockados para usuários ativos
  const [activeUsers, setActiveUsers] = useState([
    {
      id: 1,
      name: "João Pedro",
      email: "joao.pedro@empresa.com",
      joinDate: "2023-12-01",
      department: "Tecnologia",
      role: "Desenvolvedor",
      avatar: null,
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
      avatar: null,
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
      avatar: null,
      lastAccess: "2024-01-12",
      meetingsCount: 67,
      status: 'active'
    }
  ]);

  const companyStats = [
    { title: "Membros Ativos", value: "24", icon: Users, color: "from-blue-600 to-cyan-600" },
    { title: "Solicitações Pendentes", value: "3", icon: UserPlus, color: "from-yellow-600 to-orange-600" },
    { title: "Departamentos", value: "8", icon: Building2, color: "from-green-600 to-emerald-600" },
    { title: "Reuniões Este Mês", value: "156", icon: Calendar, color: "from-purple-600 to-violet-600" }
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
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
        <Sidebar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 lg:ml-0 overflow-hidden">
          {/* Header */}
          <FadeInSection>
            <header className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                    <Building2 className="w-8 h-8 mr-3 text-purple-400" />
                    Gestão Empresarial
                  </h1>
                  <p className="text-slate-300">
                    Gerencie sua equipe e administre solicitações de acesso
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-80 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                  <EnhancedButton variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </EnhancedButton>
                </div>
              </div>
            </header>
          </FadeInSection>

          <main className="p-6 space-y-8">
            {/* Stats Cards */}
            <FadeInSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {stat.value}
                            </h3>
                            <p className="text-slate-400 text-sm">
                              {stat.title}
                            </p>
                          </div>
                          <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>

            {/* Tabs */}
            <FadeInSection>
              <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 mb-8 w-fit">
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'requests'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Solicitações</span>
                    {pendingRequests.length > 0 && (
                      <Badge variant="outline" className="bg-red-600/20 text-red-300 border-red-500/30">
                        {pendingRequests.length}
                      </Badge>
                    )}
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'users'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Usuários Ativos</span>
                    <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-500/30">
                      {activeUsers.length}
                    </Badge>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </div>
                </button>
              </div>
            </FadeInSection>

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
                  <StaggerContainer staggerDelay={0.1}>
                    {filteredRequests.length === 0 ? (
                      <StaggerItem>
                        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                          <CardContent className="text-center py-12">
                            <UserPlus className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                              Nenhuma solicitação pendente
                            </h3>
                            <p className="text-slate-300">
                              Todas as solicitações de acesso foram processadas.
                            </p>
                          </CardContent>
                        </Card>
                      </StaggerItem>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRequests.map((request, index) => (
                          <StaggerItem key={request.id}>
                            <motion.div
                              whileHover={{ scale: 1.02, y: -4 }}
                              className="h-full"
                            >
                              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm h-full hover:bg-slate-700/50 transition-all duration-300">
                                <CardHeader className="pb-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        {request.name.charAt(0)}
                                      </div>
                                      <div>
                                        <CardTitle className="text-lg text-white">
                                          {request.name}
                                        </CardTitle>
                                        <CardDescription className="text-slate-300">
                                          {request.role} • {request.department}
                                        </CardDescription>
                                      </div>
                                    </div>
                                    
                                    <Badge variant="outline" className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Pendente
                                    </Badge>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="space-y-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center text-slate-300 text-sm">
                                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                      {request.email}
                                    </div>
                                    <div className="flex items-center text-slate-300 text-sm">
                                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                      Solicitado em {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-2 pt-4">
                                    <EnhancedButton
                                      onClick={() => handleApproveRequest(request.id)}
                                      size="sm"
                                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      Aprovar
                                    </EnhancedButton>
                                    
                                    <EnhancedButton
                                      onClick={() => handleRejectRequest(request.id)}
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 bg-red-600/10 border-red-500/30 text-red-300 hover:bg-red-600/20"
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Rejeitar
                                    </EnhancedButton>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </StaggerItem>
                        ))}
                      </div>
                    )}
                  </StaggerContainer>
                </motion.div>
              ) : activeTab === 'users' ? (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StaggerContainer staggerDelay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUsers.map((user, index) => (
                        <StaggerItem key={user.id}>
                          <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="h-full"
                          >
                            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm h-full hover:bg-slate-700/50 transition-all duration-300">
                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                      {user.name.charAt(0)}
                                    </div>
                                    <div>
                                      <CardTitle className="text-lg text-white">
                                        {user.name}
                                      </CardTitle>
                                      <CardDescription className="text-slate-300">
                                        {user.role} • {user.department}
                                      </CardDescription>
                                    </div>
                                  </div>
                                  
                                  <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-500/30">
                                    <UserCheck className="w-3 h-3 mr-1" />
                                    Ativo
                                  </Badge>
                                </div>
                              </CardHeader>
                              
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex items-center text-slate-300 text-sm">
                                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                    {user.email}
                                  </div>
                                  <div className="flex items-center text-slate-300 text-sm">
                                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                    Desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                                  </div>
                                  <div className="flex items-center text-slate-300 text-sm">
                                    <Users className="w-4 h-4 mr-2 text-slate-400" />
                                    {user.meetingsCount} reuniões
                                  </div>
                                </div>
                                
                                <div className="text-xs text-slate-400">
                                  Último acesso: {new Date(user.lastAccess).toLocaleDateString('pt-BR')}
                                </div>
                                
                                <div className="flex space-x-2 pt-4">
                                  <EnhancedButton
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                                  >
                                    <Edit className="w-4 h-4 mr-1" />
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
                              </CardContent>
                            </Card>
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerContainer>
                </motion.div>
              ) : (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-purple-400" />
                        Configurações da Empresa
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        Gerencie as configurações e informações da sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-6 border border-slate-700/50 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-4">Informações da Empresa</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Nome da Empresa
                              </label>
                              <Input
                                value={user.companyName}
                                className="bg-slate-700/50 border-slate-600/50 text-white"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                CNPJ
                              </label>
                              <Input
                                value={user.cnpj}
                                className="bg-slate-700/50 border-slate-600/50 text-white"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Corporativo
                              </label>
                              <Input
                                value={user.email}
                                className="bg-slate-700/50 border-slate-600/50 text-white"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                Telefone
                              </label>
                              <Input
                                value={user.phone}
                                className="bg-slate-700/50 border-slate-600/50 text-white"
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mt-6">
                            <EnhancedButton variant="outline" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar Informações
                            </EnhancedButton>
                          </div>
                        </div>

                        <div className="p-6 border border-slate-700/50 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-4">Permissões e Segurança</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Aprovação Automática</h4>
                                <p className="text-sm text-slate-400">Aprovar automaticamente solicitações de domínio corporativo</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Notificações por Email</h4>
                                <p className="text-sm text-slate-400">Receber notificações sobre novas solicitações</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">Backup Automático</h4>
                                <p className="text-sm text-slate-400">Fazer backup automático dos dados da empresa</p>
                              </div>
                              <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Empresa;
