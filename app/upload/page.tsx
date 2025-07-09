
'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Brain, Sparkles, Zap, Clock, Activity, ArrowRight, FileAudio, Waveform } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../../components/ui/card'
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
    { name: 'Upload', description: 'Enviando arquivo', icon: Upload },
    { name: 'Análise', description: 'Analisando áudio', icon: Activity },
    { name: 'Transcrição', description: 'Convertendo em texto', icon: Brain },
    { name: 'Processamento', description: 'Extraindo insights', icon: Sparkles },
    { name: 'Finalização', description: 'Preparando resultados', icon: Zap }
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

    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(processingStages[i].name);
      
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setIsUploading(false);
    setTranscriptionStatus('completed');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-300 text-lg">Carregando...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-indigo-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          
          <div className="relative px-8 py-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Processamento Inteligente
                </h1>
              </div>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Transforme suas gravações em insights valiosos com nossa tecnologia de IA avançada
              </p>
              
              <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>97% de precisão</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Processamento rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Insights automáticos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-8 pb-16 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Upload Card */}
            <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"></div>
              
              <div className="relative p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Envio de Arquivo</h2>
                  </div>
                  <p className="text-slate-300">Selecione sua gravação de áudio para processamento automático</p>
                </div>

                <input
                  type="file"
                  accept="audio/*,video/*"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="mb-8"
                >
                  <div
                    onClick={handleFileSelect}
                    className="relative cursor-pointer group"
                  >
                    <div className="w-full h-48 border-2 border-dashed border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 flex flex-col items-center justify-center space-y-4 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl"
                      >
                        <FileAudio className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-lg mb-2">Clique para selecionar arquivo</p>
                        <p className="text-slate-400">Suporte para MP3, WAV, MP4 e outros formatos</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Arraste e solte ou</span>
                        <span className="text-purple-400 font-medium">navegue pelos arquivos</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {file && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{file.name}</p>
                            <p className="text-purple-300 text-sm">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-green-400"
                        >
                          <CheckCircle className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <EnhancedButton
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processando com IA...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Brain className="w-5 h-5" />
                        <span>Iniciar Processamento IA</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </EnhancedButton>
                </motion.div>
              </div>
            </Card>

            {/* Processing Status */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl mb-8">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                        >
                          <Activity className="w-4 h-4 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Processamento em Andamento</h3>
                          <p className="text-slate-300">Estágio atual: {processingStage}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Progresso</span>
                            <span className="text-white font-semibold">{uploadProgress}%</span>
                          </div>
                          <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                              initial={{ width: "0%" }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-4">
                          {processingStages.map((stage, index) => {
                            const isActive = stage.name === processingStage;
                            const isCompleted = processingStages.findIndex(s => s.name === processingStage) > index;
                            
                            return (
                              <motion.div
                                key={stage.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 rounded-xl border transition-all duration-500 ${
                                  isActive 
                                    ? 'bg-blue-500/20 border-blue-400/50 text-blue-300 scale-105 shadow-lg shadow-blue-500/20' 
                                    : isCompleted
                                    ? 'bg-green-500/20 border-green-400/50 text-green-300'
                                    : 'bg-slate-800/30 border-slate-600/30 text-slate-400'
                                }`}
                              >
                                <div className="flex flex-col items-center space-y-2 text-center">
                                  <motion.div
                                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  >
                                    <stage.icon className="w-5 h-5" />
                                  </motion.div>
                                  <span className="font-medium text-sm">{stage.name}</span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Status */}
            <AnimatePresence>
              {transcriptionStatus === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl shadow-2xl">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                          className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Processamento Concluído</h3>
                          <p className="text-green-200">Seu arquivo foi processado com sucesso!</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-400/20">
                          <div className="flex items-center space-x-3">
                            <Brain className="w-6 h-6 text-green-400" />
                            <div>
                              <p className="font-semibold text-white">Transcrição</p>
                              <p className="text-sm text-green-200">97% precisão</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                          <div className="flex items-center space-x-3">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                            <div>
                              <p className="font-semibold text-white">Insights</p>
                              <p className="text-sm text-blue-200">12 pontos</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-400/20">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-6 h-6 text-purple-400" />
                            <div>
                              <p className="font-semibold text-white">Duração</p>
                              <p className="text-sm text-purple-200">45 min</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <EnhancedButton className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                          Ver Resultados
                        </EnhancedButton>
                        <EnhancedButton 
                          variant="outline" 
                          className="flex-1 bg-green-500/10 border-green-500/30 text-green-300 hover:bg-green-500/20"
                        >
                          Baixar Transcrição
                        </EnhancedButton>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
