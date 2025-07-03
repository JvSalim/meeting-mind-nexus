
'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Lock, 
  MapPin,
  FileText,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition, FadeInSection } from "../../components/ui/page-animations";

const Register = () => {
  const [accountType, setAccountType] = useState<'user' | 'company' | null>(null);
  const [userForm, setUserForm] = useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [companyForm, setCompanyForm] = useState({
    email: '',
    companyName: '',
    cnpj: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });

  const [cnpjError, setCnpjError] = useState('');

  const validateCNPJ = (cnpj: string) => {
    // Remove non-numeric characters
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Basic CNPJ validation
    if (cleanCNPJ.length !== 14) {
      setCnpjError('CNPJ deve ter 14 dígitos');
      return false;
    }
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cleanCNPJ)) {
      setCnpjError('CNPJ inválido');
      return false;
    }
    
    setCnpjError('');
    return true;
  };

  const formatCNPJ = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleUserFormChange = (field: string, value: string) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyFormChange = (field: string, value: string) => {
    if (field === 'cnpj') {
      const formattedValue = formatCNPJ(value);
      setCompanyForm(prev => ({ ...prev, [field]: formattedValue }));
      validateCNPJ(value);
    } else {
      setCompanyForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User registration:', userForm);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCNPJ(companyForm.cnpj)) {
      console.log('Company registration:', companyForm);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {!accountType ? (
            <FadeInSection>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Criar Conta
                </h1>
                <p className="text-slate-300 text-lg">
                  Escolha o tipo de conta que deseja criar
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm cursor-pointer hover:bg-slate-700/50 transition-all duration-300 h-full"
                    onClick={() => setAccountType('user')}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-white">
                        Usuário
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-base">
                        Para profissionais individuais que desejam usar o Meeting Mind Nexus
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          Transcrições ilimitadas
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          Análise com IA
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          Dashboard pessoal
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm cursor-pointer hover:bg-slate-700/50 transition-all duration-300 h-full"
                    onClick={() => setAccountType('company')}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-white">
                        Empresa
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-base">
                        Para empresas que precisam gerenciar equipes e projetos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Gerenciamento de equipes
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Relatórios avançados
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          Controle de acesso
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </FadeInSection>
          ) : (
            <FadeInSection>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {accountType === 'user' ? 'Criar Conta - Usuário' : 'Criar Conta - Empresa'}
                    </h1>
                    <p className="text-slate-300">
                      Preencha os dados para criar sua conta
                    </p>
                  </div>
                  
                  <EnhancedButton
                    variant="ghost"
                    onClick={() => setAccountType(null)}
                    className="text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </EnhancedButton>
                </div>

                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {accountType === 'user' ? (
                      <form onSubmit={handleUserSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <div className="relative">
                              <Input
                                id="email"
                                type="email"
                                value={userForm.email}
                                onChange={(e) => handleUserFormChange('email', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="seu@email.com"
                                required
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-white">Nome Completo</Label>
                            <div className="relative">
                              <Input
                                id="fullName"
                                value={userForm.fullName}
                                onChange={(e) => handleUserFormChange('fullName', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="Seu nome completo"
                                required
                              />
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">Telefone</Label>
                            <div className="relative">
                              <Input
                                id="phone"
                                value={userForm.phone}
                                onChange={(e) => handleUserFormChange('phone', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="(11) 99999-9999"
                                required
                              />
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">Senha</Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type="password"
                                value={userForm.password}
                                onChange={(e) => handleUserFormChange('password', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="••••••••"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                type="password"
                                value={userForm.confirmPassword}
                                onChange={(e) => handleUserFormChange('confirmPassword', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="••••••••"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <EnhancedButton
                          type="submit"
                          className="w-full"
                        >
                          Criar Conta
                        </EnhancedButton>
                      </form>
                    ) : (
                      <form onSubmit={handleCompanySubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="companyEmail" className="text-white">Email Corporativo</Label>
                            <div className="relative">
                              <Input
                                id="companyEmail"
                                type="email"
                                value={companyForm.email}
                                onChange={(e) => handleCompanyFormChange('email', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="contato@empresa.com"
                                required
                              />
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-white">Razão Social</Label>
                            <div className="relative">
                              <Input
                                id="companyName"
                                value={companyForm.companyName}
                                onChange={(e) => handleCompanyFormChange('companyName', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="Nome da empresa"
                                required
                              />
                              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cnpj" className="text-white">CNPJ</Label>
                            <div className="relative">
                              <Input
                                id="cnpj"
                                value={companyForm.cnpj}
                                onChange={(e) => handleCompanyFormChange('cnpj', e.target.value)}
                                className={`pl-10 bg-slate-700/50 border-slate-600/50 text-white ${cnpjError ? 'border-red-500' : ''}`}
                                placeholder="00.000.000/0000-00"
                                required
                              />
                              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                            {cnpjError && (
                              <p className="text-red-400 text-sm">{cnpjError}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companyPhone" className="text-white">Telefone</Label>
                            <div className="relative">
                              <Input
                                id="companyPhone"
                                value={companyForm.phone}
                                onChange={(e) => handleCompanyFormChange('phone', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="(11) 3333-3333"
                                required
                              />
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-white">Endereço Completo</Label>
                            <div className="relative">
                              <Input
                                id="address"
                                value={companyForm.address}
                                onChange={(e) => handleCompanyFormChange('address', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="Rua, número, bairro"
                                required
                              />
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-white">Cidade</Label>
                            <Input
                              id="city"
                              value={companyForm.city}
                              onChange={(e) => handleCompanyFormChange('city', e.target.value)}
                              className="bg-slate-700/50 border-slate-600/50 text-white"
                              placeholder="São Paulo"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-white">Estado</Label>
                            <Input
                              id="state"
                              value={companyForm.state}
                              onChange={(e) => handleCompanyFormChange('state', e.target.value)}
                              className="bg-slate-700/50 border-slate-600/50 text-white"
                              placeholder="SP"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="zipCode" className="text-white">CEP</Label>
                            <Input
                              id="zipCode"
                              value={companyForm.zipCode}
                              onChange={(e) => handleCompanyFormChange('zipCode', e.target.value)}
                              className="bg-slate-700/50 border-slate-600/50 text-white"
                              placeholder="00000-000"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companyPassword" className="text-white">Senha</Label>
                            <div className="relative">
                              <Input
                                id="companyPassword"
                                type="password"
                                value={companyForm.password}
                                onChange={(e) => handleCompanyFormChange('password', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="••••••••"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companyConfirmPassword" className="text-white">Confirmar Senha</Label>
                            <div className="relative">
                              <Input
                                id="companyConfirmPassword"
                                type="password"
                                value={companyForm.confirmPassword}
                                onChange={(e) => handleCompanyFormChange('confirmPassword', e.target.value)}
                                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                                placeholder="••••••••"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <EnhancedButton
                          type="submit"
                          className="w-full"
                          disabled={!!cnpjError}
                        >
                          Criar Conta Empresarial
                        </EnhancedButton>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
