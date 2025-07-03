
'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { EnhancedButton } from "../../../components/ui/enhanced-button";
import { Badge } from "../../../components/ui/badge";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  Building2,
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  UserPlus,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../../components/ui/page-animations";
import { Input } from "../../../components/ui/input";

const Management = () => {
  const [activeTab, setActiveTab] = useState<'requests' | 'users'>('requests');
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleApproveRequest = (id: number) => {
    const request = pendingRequests.find(r => r.id === id);
    if (request) {
      // Move to active users
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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Gerenciamento de Usuários
                </h1>
                <p className="text-slate-300">
                  Gerencie solicitações de acesso e usuários ativos da empresa
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar usuários..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700/50 text-white w-64"
                  />
                </div>
                
                <EnhancedButton variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </EnhancedButton>
              </div>
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
            ) : (
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Management;
