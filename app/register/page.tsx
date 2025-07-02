
'use client'

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Mic, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "../../components/ui/page-transition";
import { InteractiveButton } from "../../components/ui/interactive-button";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Empresa é obrigatória";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company
      }));
      router.push("/dashboard");
      setIsLoading(false);
    }, 2000);
  };

  const benefits = [
    "Transcrição automática com IA",
    "Busca inteligente em reuniões",
    "Analytics avançado",
    "Integração com ferramentas populares",
    "Suporte 24/7"
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center p-4">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        </div>

        <div className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Bem-vindo ao futuro das reuniões
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Junte-se a milhares de profissionais que já transformaram sua produtividade com nossa plataforma de IA.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">O que você terá acesso:</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="text-center mb-8 lg:hidden">
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
            </div>

            <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">Criar Conta Gratuita</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete o cadastro e comece a usar em menos de 2 minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">Nome Completo *</Label>
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
                      <Label htmlFor="company" className="text-slate-200">Empresa *</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nome da empresa"
                        className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                      {errors.company && <p className="text-red-400 text-sm">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">E-mail Profissional *</Label>
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

                  <InteractiveButton
                    type="submit"
                    className="w-full h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta Gratuita"}
                  </InteractiveButton>
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
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
