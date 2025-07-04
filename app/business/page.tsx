
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
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Crown,
  Shield,
  Eye,
  Filter,
  Download,
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Business = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<'team' | 'requests' | 'settings'>('team');
  const router = useRouter();

  // Mock data
  const teamMembers = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      phone: "(11) 99999-9999",
      role: "Desenvolvedor Senior",
      department: "Tecnologia",
      status: "active",
      joinDate: "2023-06-15",
      avatar: "JS"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      phone: "(11) 88888-8888",
      role: "Designer UI/UX",
      department: "Design",
      status: "active",
      joinDate: "2023-08-20",
      avatar: "MS"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      phone: "(11) 77777-7777",
      role: "Gerente de Produto",
      department: "Produto",
      status: "inactive",
      joinDate: "2023-04-10",
      avatar: "PC"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "Ana Oliveira",
      email: "ana@email.com",
      phone: "(11) 66666-6666",
      requestedRole: "Desenvolvedora Frontend",
      requestedDepartment: "Tecnologia",
      requestDate: "2024-01-10",
      message: "Gostaria de fazer parte da equipe de desenvolvimento. Tenho 3 anos de experiência com React e TypeScript.",
      avatar: "AO"
    },
    {
      id: 2,
      name: "Carlos Ferreira",
      email: "carlos@email.com",
      phone: "(11) 55555-5555",
      requestedRole: "Analista de Marketing",
      requestedDepartment: "Marketing",
      requestDate: "2024-01-08",
      message: "Especialista em marketing digital com foco em campanhas B2B e growth hacking.",
      avatar: "CF"
    }
  ];

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

  const handleApproveRequest = (requestId: number) => {
    // Lógica para aprovar solicitação
    console.log(`Aprovando solicitação ${requestId}`);
  };

  const handleRejectRequest = (requestId: number) => {
    // Lógica para rejeitar solicitação
    console.log(`Rejeitando solicitação ${requestId}`);
  };

  const handleEditMember = (memberId: number) => {
    // Lógica para editar membro
    console.log(`Editando membro ${memberId}`);
  };

  const handleRemoveMember = (memberId: number) => {
    // Lógica para remover membro
    console.log(`Removendo membro ${memberId}`);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header */}
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
                  placeholder="Buscar membros..."
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

        <main className="p-6 space-y-8">
          {/* Stats Cards */}
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

          {/* Tabs */}
          <div className="flex space-x-2 bg-slate-800/50 rounded-lg p-1 w-fit">
            {[
              { key: 'team', label: 'Equipe', icon: Users },
              { key: 'requests', label: 'Solicitações', icon: UserPlus },
              { key: 'settings', label: 'Configurações', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                  selectedTab === tab.key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-400" />
                      Membros da Equipe
                    </CardTitle>
                    <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </EnhancedButton>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="p-6 border border-slate-700/50 rounded-lg hover:bg-slate-700/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {member.avatar}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    member.status === 'active' 
                                      ? 'bg-green-600/20 text-green-300 border-green-500/30'
                                      : 'bg-red-600/20 text-red-300 border-red-500/30'
                                  }`}
                                >
                                  {member.status === 'active' ? 'Ativo' : 'Inativo'}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2" />
                                  {member.email}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {member.phone}
                                </div>
                                <div className="flex items-center">
                                  <Crown className="w-4 h-4 mr-2" />
                                  {member.role}
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="w-4 h-4 mr-2" />
                                  {member.department}
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-3 text-xs text-slate-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                Ingressou em {new Date(member.joinDate).toLocaleDateString('pt-BR')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <EnhancedButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditMember(member.id)}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10"
                            >
                              <Edit className="w-4 h-4" />
                            </EnhancedButton>
                            <EnhancedButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </EnhancedButton>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 'requests' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-yellow-400" />
                    Solicitações Pendentes
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Analise e aprove novos membros para sua equipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pendingRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        whileHover={{ scale: 1.01, y: -2 }}
                        className="p-6 border border-slate-700/50 rounded-lg bg-slate-700/20 hover:bg-slate-700/40 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {request.avatar}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="font-semibold text-white text-lg">{request.name}</h3>
                                <Badge variant="outline" className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">
                                  Pendente
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-2" />
                                  {request.email}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {request.phone}
                                </div>
                                <div className="flex items-center">
                                  <Crown className="w-4 h-4 mr-2" />
                                  {request.requestedRole}
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="w-4 h-4 mr-2" />
                                  {request.requestedDepartment}
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <p className="text-slate-300 text-sm bg-slate-800/50 p-3 rounded-lg">
                                  <strong>Mensagem:</strong> {request.message}
                                </p>
                              </div>
                              
                              <div className="flex items-center text-xs text-slate-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                Solicitado em {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 ml-6">
                            <EnhancedButton
                              size="sm"
                              onClick={() => handleApproveRequest(request.id)}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Aprovar
                            </EnhancedButton>
                            <EnhancedButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectRequest(request.id)}
                              className="border-red-500/50 text-red-400 hover:bg-red-600/10 hover:border-red-500"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Rejeitar
                            </EnhancedButton>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
        </main>
      </div>
    </div>
  );
};

export default Business;
