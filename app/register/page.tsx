'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Key, User, Phone, Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { InteractiveButton } from "@/components/ui/interactive-button";

const Register = () => {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    companyName: "",
    companySize: "",
    companyIndustry: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular registro
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        email: userForm.email, 
        name: userForm.name,
        company: userForm.companyName
      }));
      router.push("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular registro com dados demo
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ 
        email: "demo@example.com", 
        name: "Demo User",
        company: "Demo Corp"
      }));
      router.push("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleRegister = () => {
    // Implementar lógica de registro com Google
    alert("Registro com Google em breve!");
  };

  const handleFacebookRegister = () => {
    // Implementar lógica de registro com Facebook
    alert("Registro com Facebook em breve!");
  };

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
        </div>

        <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Criar sua conta</CardTitle>
            <CardDescription className="text-slate-300">
              Comece a usar MeetingAI agora mesmo!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* User Information */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">E-mail</Label>
                
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={userForm.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, email: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Senha</Label>
                <Input
                  type="password"
                  placeholder="Sua senha segura"
                  value={userForm.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, password: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200">Nome Completo</Label>
                
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={userForm.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, name: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">Telefone</Label>
                
                <Input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={userForm.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, phone: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              {/* Company Information */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-slate-200">Nome da Empresa</Label>
                
                <Input
                  type="text"
                  placeholder="Nome da sua empresa"
                  value={userForm.companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, companyName: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize" className="text-slate-200">Tamanho da Empresa</Label>
                
                <Input
                  type="text"
                  placeholder="Número de funcionários"
                  value={userForm.companySize}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, companySize: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyIndustry" className="text-slate-200">Setor da Empresa</Label>
                
                <Input
                  type="text"
                  placeholder="Setor de atuação"
                  value={userForm.companyIndustry}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserForm({...userForm, companyIndustry: e.target.value})}
                  className="h-12 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Fazer login
                </Link>
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center space-y-3">
              <p className="text-slate-300">Ou registre-se com:</p>
              <div className="flex space-x-4">
                <InteractiveButton variant="secondary" size="md" onClick={handleGoogleRegister}>
                  Google
                </InteractiveButton>
                <InteractiveButton variant="secondary" size="md" onClick={handleFacebookRegister}>
                  Facebook
                </InteractiveButton>
              </div>
              <InteractiveButton variant="ghost" size="md" onClick={handleDemoRegister}>
                Entrar com dados Demo
              </InteractiveButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Register;
