
'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Play, Pause, Volume2, Brain, Sparkles, Zap, Clock, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { EnhancedButton } from '../../components/ui/enhanced-button'
import { Progress } from '../../components/ui/progress'
import { Sidebar } from '../../components/ui/sidebar'

export default function UploadPage() {
  const [user, setUser] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle')
  const [processingStage, setProcessingStage] = useState('')
  const router = useRouter()

  const processingStages = [
    { name: 'Upload', description: 'Enviando arquivo para o servidor', icon: Upload },
    { name: 'Análise', description: 'Analisando qualidade do áudio', icon: Activity },
    { name: 'Transcrição', description: 'Convertendo fala em texto', icon: Brain },
    { name: 'Processamento', description: 'Extraindo insights e ações', icon: Sparkles },
    { name: 'Finalização', description: 'Organizando resultados', icon: Zap }
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleFileSelect = () => {
    const input = document.getElementById('upload') as HTMLInputElement;
    input?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    setIsUploading(true);
    setTranscriptionStatus('processing');

    // Simulate detailed processing stages
    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(processingStages[i].name);
      
      // Simulate stage-specific progress
      const stageProgress = (i + 1) * 20;
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const newProgress = Math.min(prevProgress + 2, stageProgress);
          if (newProgress >= stageProgress) {
            clearInterval(interval);
            return stageProgress;
          }
          return newProgress;
        });
      }, 100);

      // Wait for this stage to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsUploading(false);
    setTranscriptionStatus('completed');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0 overflow-hidden">
        {/* Header inovador */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-r from-slate-900/90 via-emerald-900/30 to-slate-900/90 backdrop-blur-xl border-b border-emerald-500/20 p-8 sticky top-0 z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-teal-600/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-3 flex items-center"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                Processamento Inteligente
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-slate-300 text-lg"
              >
                Transforme suas gravações em insights valiosos com IA avançada
              </motion.p>
            </div>
          </div>
        </motion.header>

        <main className="p-8 space-y-8">
          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-white flex items-center text-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  Envio de Arquivo
                </CardTitle>
                <CardDescription className="text-slate-300 text-base">
                  Selecione sua gravação de áudio para processamento automático
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <input
                  type="file"
                  accept="audio/*,video/*"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    onClick={handleFileSelect}
                    className="relative cursor-pointer group"
                  >
                    <div className="w-full h-40 border-2 border-dashed border-emerald-500/30 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex flex-col items-center justify-center space-y-4 hover:border-emerald-400/50 hover:bg-emerald-500/20 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-lg mb-1">Clique para selecionar arquivo</p>
                        <p className="text-slate-400 text-sm">Suporte para MP3, WAV, MP4 e outros formatos</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {file && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">{file.name}</p>
                          <p className="text-emerald-300 text-sm">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <EnhancedButton
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Brain className="w-5 h-5" />
                        <span>Iniciar Processamento IA</span>
                      </div>
                    )}
                  </EnhancedButton>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Processing Status */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-xl">
                      <Activity className="w-6 h-6 mr-3 text-blue-400" />
                      Processamento em Andamento
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Estágio atual: {processingStage}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Progresso do processamento</span>
                        <span className="text-white font-semibold">{uploadProgress}%</span>
                      </div>
                      <Progress 
                        value={uploadProgress} 
                        className="h-3 bg-slate-700/50 border border-slate-600/50" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {processingStages.map((stage, index) => {
                        const isActive = stage.name === processingStage;
                        const isCompleted = processingStages.findIndex(s => s.name === processingStage) > index;
                        
                        return (
                          <motion.div
                            key={stage.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              isActive 
                                ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' 
                                : isCompleted
                                ? 'bg-green-500/20 border-green-400/50 text-green-300'
                                : 'bg-slate-700/30 border-slate-600/30 text-slate-400'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-2 text-center">
                              <stage.icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                              <span className="font-medium text-sm">{stage.name}</span>
                              <span className="text-xs opacity-80">{stage.description}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Status */}
          <AnimatePresence>
            {transcriptionStatus === 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-emerald-800/40 to-teal-800/40 border-emerald-500/30 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-xl">
                      <CheckCircle className="w-6 h-6 mr-3 text-emerald-400" />
                      Processamento Concluído
                    </CardTitle>
                    <CardDescription className="text-emerald-200">
                      Seu arquivo foi processado com sucesso e está pronto para análise!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                        <div className="flex items-center space-x-3">
                          <Brain className="w-8 h-8 text-emerald-400" />
                          <div>
                            <p className="font-semibold text-white">Transcrição</p>
                            <p className="text-sm text-emerald-200">97% de precisão</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-teal-500/20 rounded-lg border border-teal-400/30">
                        <div className="flex items-center space-x-3">
                          <Sparkles className="w-8 h-8 text-teal-400" />
                          <div>
                            <p className="font-semibold text-white">Insights</p>
                            <p className="text-sm text-teal-200">12 pontos identificados</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-8 h-8 text-cyan-400" />
                          <div>
                            <p className="font-semibold text-white">Duração</p>
                            <p className="text-sm text-cyan-200">45 minutos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <EnhancedButton 
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      >
                        Ver Resultados
                      </EnhancedButton>
                      <EnhancedButton 
                        variant="outline" 
                        className="flex-1 bg-slate-700/50 border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/20"
                      >
                        Baixar Transcrição
                      </EnhancedButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Status */}
          <AnimatePresence>
            {transcriptionStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-red-800/40 to-orange-800/40 border-red-500/30 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-xl">
                      <AlertCircle className="w-6 h-6 mr-3 text-red-400" />
                      Erro no Processamento
                    </CardTitle>
                    <CardDescription className="text-red-200">
                      Ocorreu um erro ao processar seu arquivo. Tente novamente ou contate o suporte.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedButton 
                      onClick={() => {
                        setTranscriptionStatus('idle');
                        setUploadProgress(0);
                        setProcessingStage('');
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    >
                      Tentar Novamente
                    </EnhancedButton>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
