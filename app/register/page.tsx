'use client'

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  FileText,
  X,
  Check,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";

const Register = () => {
  const [accountType, setAccountType] = useState<'user' | 'company' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Company fields
    companyEmail: '',
    companyName: '',
    cnpj: '',
    companyPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateCNPJ = (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
    // Basic CNPJ validation logic
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ[i]) * weights1[i];
    }
    
    const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCNPJ[12]) !== digit1) return false;
    
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ[i]) * weights2[i];
    }
    
    const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCNPJ[13]) === digit2;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Real-time CNPJ validation
    if (field === 'cnpj' && value) {
      const isValid = validateCNPJ(value);
      setErrors(prev => ({
        ...prev,
        cnpj: isValid ? '' : 'CNPJ inválido'
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (accountType === 'user') {
      if (!formData.email) newErrors.email = 'Email é obrigatório';
      if (!formData.name) newErrors.name = 'Nome é obrigatório';
      if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.password) newErrors.password = 'Senha é obrigatória';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    } else if (accountType === 'company') {
      if (!formData.companyEmail) newErrors.companyEmail = 'Email corporativo é obrigatório';
      if (!formData.companyName) newErrors.companyName = 'Razão social é obrigatória';
      if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
      if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
        newErrors.cnpj = 'CNPJ inválido';
      }
      if (!formData.companyPhone) newErrors.companyPhone = 'Telefone é obrigatório';
      if (!formData.address) newErrors.address = 'Endereço é obrigatório';
      if (!formData.password) newErrors.password = 'Senha é obrigatória';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        type: accountType,
        ...formData,
        id: Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/dashboard');
    }, 2000);
  };

  if (!accountType) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Criar Nova Conta
              </h1>
              <p className="text-slate-300 text-lg">
                Escolha o tipo de conta que você deseja criar
              </p>
            </div>
            
            <StaggerContainer staggerDelay={0.2}>
              <div className="grid md:grid-cols-2 gap-8">
                <StaggerItem>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAccountType('user')}
                    className="cursor-pointer"
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 h-full">
                      <CardHeader className="text-center pb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-white">Usuário Individual</CardTitle>
                        <CardDescription className="text-slate-300 text-base">
                          Para profissionais e usuários pessoais
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <ul className="space-y-3 text-slate-300">
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Transcrições ilimitadas
                          </li>
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Chat com IA
                          </li>
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Relatórios básicos
                          </li>
                        </ul>
                        <EnhancedButton 
                          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Escolher Plano Individual
                        </EnhancedButton>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>

                <StaggerItem>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAccountType('company')}
                    className="cursor-pointer"
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300 h-full">
                      <CardHeader className="text-center pb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-white">Empresa</CardTitle>
                        <CardDescription className="text-slate-300 text-base">
                          Para empresas e organizações
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <ul className="space-y-3 text-slate-300">
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Gestão de equipes
                          </li>
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Analytics avançados
                          </li>
                          <li className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-400 mr-2" />
                            Integração com APIs
                          </li>
                        </ul>
                        <EnhancedButton 
                          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Escolher Plano Empresarial
                        </EnhancedButton>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setAccountType(null)}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="flex items-center space-x-2 text-slate-300">
              {accountType === 'user' ? (
                <>
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Conta Individual</span>
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <span>Conta Empresarial</span>
                </>
              )}
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {accountType === 'user' ? 'Criar Conta Individual' : 'Criar Conta Empresarial'}
              </CardTitle>
              <CardDescription className="text-slate-300">
                {accountType === 'user' 
                  ? 'Preencha seus dados pessoais para começar'
                  : 'Preencha os dados da sua empresa para começar'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {accountType === 'user' ? (
                  <FadeInSection className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                          placeholder="seu@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </FadeInSection>
                ) : (
                  <FadeInSection className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail" className="text-white">Email Corporativo</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="companyEmail"
                            type="email"
                            value={formData.companyEmail}
                            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="contato@empresa.com"
                          />
                        </div>
                        {errors.companyEmail && <p className="text-red-400 text-sm">{errors.companyEmail}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-white">Razão Social</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="Nome da Empresa Ltda"
                          />
                        </div>
                        {errors.companyName && <p className="text-red-400 text-sm">{errors.companyName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cnpj" className="text-white">CNPJ</Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="cnpj"
                            value={formData.cnpj}
                            onChange={(e) => handleInputChange('cnpj', e.target.value)}
                            className={`pl-10 bg-slate-700/50 border-slate-600/50 text-white ${
                              formData.cnpj && !errors.cnpj ? 'border-green-500' : 
                              errors.cnpj ? 'border-red-500' : ''
                            }`}
                            placeholder="00.000.000/0000-00"
                          />
                          {formData.cnpj && !errors.cnpj && (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                          )}
                        </div>
                        {errors.cnpj && <p className="text-red-400 text-sm">{errors.cnpj}</p>}
                        {formData.cnpj && !errors.cnpj && (
                          <p className="text-green-400 text-sm">CNPJ válido</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyPhone" className="text-white">Telefone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="companyPhone"
                            value={formData.companyPhone}
                            onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="(11) 3333-3333"
                          />
                        </div>
                        {errors.companyPhone && <p className="text-red-400 text-sm">{errors.companyPhone}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white">Endereço Completo</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                        <textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full pl-10 pt-2 pb-2 pr-4 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows={3}
                          placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                        />
                      </div>
                      {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white"
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </FadeInSection>
                )}

                <div className="flex space-x-4 pt-6">
                  <EnhancedButton
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? 'Criando Conta...' : 'Criar Conta'}
                  </EnhancedButton>
                </div>

                <div className="text-center pt-4">
                  <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
                    Já tem uma conta? Faça login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
