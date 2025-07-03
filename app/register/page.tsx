
'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  Phone, 
  MapPin,
  CheckCircle,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PageTransition, FadeInSection } from "../../components/ui/page-animations";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    position: "",
    city: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.email.includes("@")) newErrors.email = "Email deve ser válido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem";
    }
    if (!formData.company.trim()) newErrors.company = "Empresa é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data (mock)
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        position: formData.position,
        city: formData.city
      }));
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <FadeInSection>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-white mb-2">
                Criar Conta
              </h1>
              <p className="text-slate-300 text-lg">
                Junte-se à revolução da IA em reuniões
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <CardHeader className="space-y-1 pb-8">
                <CardTitle className="text-2xl text-center text-white">
                  Informações Pessoais
                </CardTitle>
                <CardDescription className="text-center text-slate-300">
                  Preencha seus dados para começar
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Senha
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 6 caracteres"
                          value={formData.password}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirmar Senha */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-200 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirmar Senha
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Digite a senha novamente"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Empresa */}
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-200 flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        Empresa
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Nome da sua empresa"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.company && (
                        <p className="text-red-400 text-sm">{errors.company}</p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-200 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cargo */}
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-slate-200 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Cargo
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="Seu cargo na empresa"
                        value={formData.position}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>

                    {/* Cidade */}
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-200 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Cidade
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Sua cidade"
                        value={formData.city}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>

                  <EnhancedButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </EnhancedButton>

                  <div className="text-center">
                    <p className="text-slate-300">
                      Já tem uma conta?{" "}
                      <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                        Fazer login
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
