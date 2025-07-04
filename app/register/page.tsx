
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
  FileText
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Register = () => {
  const [accountType, setAccountType] = useState<'user' | 'company'>('user');
  const [formData, setFormData] = useState({
    // Campos de usuário
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Campos de empresa
    companyName: "",
    cnpj: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.email.includes("@")) newErrors.email = "Email deve ser válido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem";
    }
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório";

    if (accountType === 'user') {
      if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    } else {
      if (!formData.companyName.trim()) newErrors.companyName = "Nome da empresa é obrigatório";
      if (!formData.cnpj.trim()) newErrors.cnpj = "CNPJ é obrigatório";
      if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório";
      if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";
      if (!formData.state.trim()) newErrors.state = "Estado é obrigatório";
      if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = accountType === 'user' 
        ? {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            accountType: 'user'
          }
        : {
            companyName: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            cnpj: formData.cnpj,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            accountType: 'company'
          };
      
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            Criar Conta
          </h1>
          <p className="text-slate-300 text-lg">
            Junte-se à revolução da IA em reuniões
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-2xl text-center text-white">
                Tipo de Conta
              </CardTitle>
              <CardDescription className="text-center text-slate-300">
                Selecione o tipo de conta que deseja criar
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Account Type Selector */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAccountType('user')}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                    accountType === 'user'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <User className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold">Usuário</div>
                  <div className="text-sm opacity-75">Conta pessoal</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAccountType('company')}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                    accountType === 'company'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold">Empresa</div>
                  <div className="text-sm opacity-75">Conta corporativa</div>
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {accountType === 'user' ? (
                  // User Form Fields
                  <>
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
                      {errors.phone && (
                        <p className="text-red-400 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </>
                ) : (
                  // Company Form Fields
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-slate-200 flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        Nome da Empresa
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Nome da sua empresa"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.companyName && (
                        <p className="text-red-400 text-sm">{errors.companyName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200 flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Corporativo
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="empresa@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cnpj" className="text-slate-200 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          CNPJ
                        </Label>
                        <Input
                          id="cnpj"
                          name="cnpj"
                          type="text"
                          placeholder="00.000.000/0001-00"
                          value={formData.cnpj}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        {errors.cnpj && (
                          <p className="text-red-400 text-sm">{errors.cnpj}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-200 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 3333-3333"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-slate-200 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Endereço Completo
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Rua, número, bairro"
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-slate-200">Cidade</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Cidade"
                          value={formData.city}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        {errors.city && (
                          <p className="text-red-400 text-sm">{errors.city}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-slate-200">Estado</Label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          placeholder="UF"
                          value={formData.state}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        {errors.state && (
                          <p className="text-red-400 text-sm">{errors.state}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-slate-200">CEP</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          placeholder="00000-000"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                        />
                        {errors.zipCode && (
                          <p className="text-red-400 text-sm">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
