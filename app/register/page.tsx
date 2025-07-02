
'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Eye, EyeOff, ArrowLeft, User, Building, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { InteractiveButton } from "@/components/ui/interactive-button";

type AccountType = 'user' | 'company' | null;

const Register = () => {
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [formData, setFormData] = useState({
    // Campos comuns
    email: "",
    password: "",
    confirmPassword: "",
    
    // Campos de usuário
    name: "",
    phone: "",
    
    // Campos de empresa
    companyName: "",
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
  const [cnpjError, setCnpjError] = useState("");
  const router = useRouter();

  const validateCNPJ = (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) {
      setCnpjError("CNPJ deve ter 14 dígitos");
      return false;
    }
    setCnpjError("");
    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'cnpj') {
      validateCNPJ(value);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (accountType === 'company' && !validateCNPJ(formData.cnpj)) {
      return;
    }

    setIsLoading(true);

    // Simular registro
    setTimeout(() => {
      const userData = accountType === 'user' ? {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        type: 'user'
      } : {
        email: formData.email,
        companyName: formData.companyName,
        cnpj: formData.cnpj,
        phone: formData.companyPhone,
        address: formData.address,
        type: 'company'
      };

      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
        />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {accountType === null ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white">Tipo de Conta</CardTitle>
                  <CardDescription className="text-slate-300">
                    Escolha o tipo de conta que melhor se adequa ao seu perfil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAccountType('user')}
                      className="cursor-pointer"
                    >
                      <div className="p-8 border-2 border-slate-600 hover:border-purple-400 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 text-center">
                        <User className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                        <h3 className="text-xl font-bold text-white mb-2">Usuário</h3>
                        <p className="text-slate-300 text-sm">
                          Para profissionais e uso pessoal
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAccountType('company')}
                      className="cursor-pointer"
                    >
                      <div className="p-8 border-2 border-slate-600 hover:border-blue-400 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 text-center">
                        <Building className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="text-xl font-bold text-white mb-2">Empresa</h3>
                        <p className="text-slate-300 text-sm">
                          Para organizações e equipes
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {accountType === 'user' ? (
                      <User className="w-6 h-6 text-purple-400" />
                    ) : (
                      <Building className="w-6 h-6 text-blue-400" />
                    )}
                    <CardTitle className="text-2xl font-bold text-white">
                      Criar Conta {accountType === 'user' ? 'Usuário' : 'Empresa'}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-300">
                    Preencha os dados para criar sua conta
                  </CardDescription>
                  <button
                    onClick={() => setAccountType(null)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    ← Voltar à seleção
                  </button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    {accountType === 'user' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-200">Nome Completo</Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                            required
                            className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-200">Telefone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                            placeholder="(11) 99999-9999"
                            required
                            className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-slate-200">Razão Social</Label>
                          <Input
                            id="companyName"
                            type="text"
                            value={formData.companyName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('companyName', e.target.value)}
                            placeholder="Nome da empresa"
                            required
                            className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cnpj" className="text-slate-200">CNPJ</Label>
                          <Input
                            id="cnpj"
                            type="text"
                            value={formData.cnpj}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('cnpj', e.target.value)}
                            placeholder="00.000.000/0000-00"
                            required
                            className={`h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 ${cnpjError ? 'border-red-500' : ''}`}
                          />
                          {cnpjError && (
                            <p className="text-red-400 text-sm">{cnpjError}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyPhone" className="text-slate-200">Telefone</Label>
                          <Input
                            id="companyPhone"
                            type="tel"
                            value={formData.companyPhone}
                            onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                            placeholder="(11) 99999-9999"
                            required
                            className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-slate-200">Endereço</Label>
                            <Input
                              id="address"
                              type="text"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              placeholder="Rua, número"
                              required
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-slate-200">Cidade</Label>
                            <Input
                              id="city"
                              type="text"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              placeholder="Cidade"
                              required
                              className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className={`h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 ${accountType === 'user' ? 'focus:border-purple-400 focus:ring-purple-400/20' : 'focus:border-blue-400 focus:ring-blue-400/20'}`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                          placeholder="Sua senha"
                          required
                          className={`h-12 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 ${accountType === 'user' ? 'focus:border-purple-400 focus:ring-purple-400/20' : 'focus:border-blue-400 focus:ring-blue-400/20'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-200">Confirmar Senha</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirme sua senha"
                          required
                          className={`h-12 pr-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 ${accountType === 'user' ? 'focus:border-purple-400 focus:ring-purple-400/20' : 'focus:border-blue-400 focus:ring-blue-400/20'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <InteractiveButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </InteractiveButton>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-slate-300">
                      Já tem uma conta?{" "}
                      <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                        Fazer login
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Register;
