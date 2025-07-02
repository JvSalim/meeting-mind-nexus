
'use client'

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Mic, Eye, EyeOff, ArrowLeft, Check, User, Building2, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition, FadeInSection, SlideInSection } from "../../components/ui/page-animations";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [accountType, setAccountType] = useState<'user' | 'company' | null>(null);
  const [formData, setFormData] = useState({
    // User fields
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Company fields
    companyName: "",
    corporateEmail: "",
    cnpj: "",
    companyPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [cnpjValid, setCnpjValid] = useState<boolean | null>(null);
  const router = useRouter();

  const validateCNPJ = (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
    // Basic CNPJ validation logic
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cleanCNPJ[12]) !== digit1) return false;
    
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCNPJ[13]) === digit2;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cnpj') {
      const cleanValue = value.replace(/[^\d]/g, '');
      const formattedValue = cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      
      if (cleanValue.length === 14) {
        const isValid = validateCNPJ(cleanValue);
        setCnpjValid(isValid);
      } else {
        setCnpjValid(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (accountType === 'user') {
      if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
      if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido";
      if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";
    } else if (accountType === 'company') {
      if (!formData.companyName.trim()) newErrors.companyName = "Razão social é obrigatória";
      if (!formData.corporateEmail.trim()) newErrors.corporateEmail = "E-mail corporativo é obrigatório";
      else if (!/\S+@\S+\.\S+/.test(formData.corporateEmail)) newErrors.corporateEmail = "E-mail inválido";
      if (!formData.cnpj.trim()) newErrors.cnpj = "CNPJ é obrigatório";
      else if (!cnpjValid) newErrors.cnpj = "CNPJ inválido";
      if (!formData.companyPhone.trim()) newErrors.companyPhone = "Telefone é obrigatório";
      if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório";
      if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
      if (!formData.state.trim()) newErrors.state = "Estado é obrigatório";
      if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório";
    }

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const userData = accountType === 'user' 
        ? { name: formData.name, email: formData.email, phone: formData.phone, type: 'user' }
        : { 
            name: formData.companyName, 
            email: formData.corporateEmail, 
            cnpj: formData.cnpj,
            phone: formData.companyPhone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            type: 'company' 
          };
      
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
      setIsLoading(false);
    }, 2000);
  };

  const AccountTypeCard = ({ type, icon: Icon, title, description }: {
    type: 'user' | 'company';
    icon: any;
    title: string;
    description: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setAccountType(type)}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
        accountType === type
          ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
          : 'border-slate-700/50 bg-slate-800/30 hover:border-purple-500/50 hover:bg-slate-800/50'
      }`}
    >
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
          accountType === type 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
            : 'bg-slate-700'
        }`}>
          <Icon className={`w-8 h-8 ${accountType === type ? 'text-white' : 'text-slate-300'}`} />
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${
          accountType === type ? 'text-purple-300' : 'text-white'
        }`}>
          {title}
        </h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center p-4">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        </div>

        <div className="w-full max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MeetingAI
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Criar Conta Gratuita</h1>
            <p className="text-xl text-slate-300">Escolha o tipo de conta que melhor se adequa às suas necessidades</p>
          </div>

          <AnimatePresence mode="wait">
            {!accountType ? (
              <motion.div
                key="account-type"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
              >
                <AccountTypeCard
                  type="user"
                  icon={User}
                  title="Conta Pessoal"
                  description="Para uso individual e projetos pessoais"
                />
                <AccountTypeCard
                  type="company"
                  icon={Building2}
                  title="Conta Empresarial"
                  description="Para empresas e equipes corporativas"
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <EnhancedButton
                        variant="ghost"
                        onClick={() => setAccountType(null)}
                        className="text-slate-400 hover:text-white mr-4"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </EnhancedButton>
                      <div className="flex items-center space-x-2">
                        {accountType === 'user' ? <User className="w-6 h-6 text-purple-400" /> : <Building2 className="w-6 h-6 text-purple-400" />}
                        <span className="text-lg font-semibold">
                          {accountType === 'user' ? 'Conta Pessoal' : 'Conta Empresarial'}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                      {accountType === 'user' ? 'Dados Pessoais' : 'Dados da Empresa'}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Complete as informações para criar sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      {accountType === 'user' ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-200 flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Nome Completo *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Seu nome completo"
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200 flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              E-mail *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="seu@email.com"
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-slate-200 flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              Telefone *
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(11) 99999-9999"
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="companyName" className="text-slate-200 flex items-center">
                                <Building2 className="w-4 h-4 mr-2" />
                                Razão Social *
                              </Label>
                              <Input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Nome da empresa"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.companyName && <p className="text-red-400 text-sm">{errors.companyName}</p>}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cnpj" className="text-slate-200 flex items-center">
                                <span className="mr-2">📄</span>
                                CNPJ *
                              </Label>
                              <div className="relative">
                                <Input
                                  id="cnpj"
                                  name="cnpj"
                                  type="text"
                                  value={formData.cnpj}
                                  onChange={handleInputChange}
                                  placeholder="00.000.000/0000-00"
                                  maxLength={18}
                                  className={`h-12 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 ${
                                    cnpjValid === true ? 'border-green-500' : cnpjValid === false ? 'border-red-500' : ''
                                  }`}
                                />
                                {cnpjValid !== null && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {cnpjValid ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <X className="w-4 h-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                              {errors.cnpj && <p className="text-red-400 text-sm">{errors.cnpj}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="corporateEmail" className="text-slate-200 flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                E-mail Corporativo *
                              </Label>
                              <Input
                                id="corporateEmail"
                                name="corporateEmail"
                                type="email"
                                value={formData.corporateEmail}
                                onChange={handleInputChange}
                                placeholder="contato@empresa.com"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.corporateEmail && <p className="text-red-400 text-sm">{errors.corporateEmail}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="companyPhone" className="text-slate-200 flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                Telefone *
                              </Label>
                              <Input
                                id="companyPhone"
                                name="companyPhone"
                                type="tel"
                                value={formData.companyPhone}
                                onChange={handleInputChange}
                                placeholder="(11) 3333-3333"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.companyPhone && <p className="text-red-400 text-sm">{errors.companyPhone}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-slate-200 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              Endereço Completo *
                            </Label>
                            <Input
                              id="address"
                              name="address"
                              type="text"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Rua, número, complemento"
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city" className="text-slate-200">Cidade *</Label>
                              <Input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="São Paulo"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="state" className="text-slate-200">Estado *</Label>
                              <Input
                                id="state"
                                name="state"
                                type="text"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="SP"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="zipCode" className="text-slate-200">CEP *</Label>
                              <Input
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                placeholder="00000-000"
                                className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                              />
                              {errors.zipCode && <p className="text-red-400 text-sm">{errors.zipCode}</p>}
                            </div>
                          </div>
                        </>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-slate-200">Senha *</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Mínimo 6 caracteres"
                              className="h-12 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-slate-200">Confirmar Senha *</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Confirme sua senha"
                              className="h-12 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg">
                        Ao criar sua conta, você concorda com nossos{" "}
                        <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                          Termos de Uso
                        </Link>{" "}
                        e{" "}
                        <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                          Política de Privacidade
                        </Link>
                        .
                      </div>

                      <EnhancedButton
                        type="submit"
                        className="w-full h-12"
                        disabled={isLoading}
                      >
                        {isLoading ? "Criando conta..." : "Criar Conta Gratuita"}
                      </EnhancedButton>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-slate-300">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                          Faça login aqui
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
