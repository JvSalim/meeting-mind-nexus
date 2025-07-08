
'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Brain, Sparkles, Zap, Clock, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <p className="text-white/60">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 pb-0"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-light text-white mb-2 flex items-center"
            >
              <Brain className="w-10 h-10 mr-4 text-blue-400" />
              Processamento Inteligente
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg"
            >
              Transforme suas gravações em insights valiosos com IA avançada
            </motion.p>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            >
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
              >
                <div
                  onClick={handleFileSelect}
                  className="relative cursor-pointer group"
                >
                  <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 flex flex-col items-center justify-center space-y-6 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-xl mb-2">Solte seu arquivo aqui</p>
                      <p className="text-white/60">ou clique para selecionar</p>
                      <p className="text-white/40 text-sm mt-2">Suporte para MP3, WAV, MP4 e outros formatos</p>
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
                    className="mt-6 p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm"
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
                className="mt-6"
              >
                <EnhancedButton
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Brain className="w-6 h-6" />
                      <span>Iniciar Processamento IA</span>
                    </div>
                  )}
                </EnhancedButton>
              </motion.div>
            </motion.div>

            {/* Processing Status */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-2">Processamento em Andamento</h3>
                    <p className="text-white/60">Estágio atual: {processingStage}</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Progresso</span>
                      <span className="text-white font-semibold text-lg">{uploadProgress}%</span>
                    </div>
                    <Progress 
                      value={uploadProgress} 
                      className="h-2 bg-white/10 border-none" 
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                      {processingStages.map((stage, index) => {
                        const isActive = stage.name === processingStage;
                        const isCompleted = processingStages.findIndex(s => s.name === processingStage) > index;
                        
                        return (
                          <motion.div
                            key={stage.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border transition-all duration-300 ${
                              isActive 
                                ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' 
                                : isCompleted
                                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                                : 'bg-white/5 border-white/10 text-white/60'
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-3 text-center">
                              <stage.icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                              <div>
                                <p className="font-medium">{stage.name}</p>
                                <p className="text-xs opacity-80">{stage.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
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
                  className="bg-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20"
                >
                  <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                    <h3 className="text-2xl font-semibold text-white mb-2">Processamento Concluído</h3>
                    <p className="text-emerald-200">Seu arquivo foi processado com sucesso!</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Brain className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                      <p className="font-semibold text-white mb-1">Transcrição</p>
                      <p className="text-emerald-300">97% precisão</p>
                    </div>
                    
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                      <p className="font-semibold text-white mb-1">Insights</p>
                      <p className="text-blue-300">12 identificados</p>
                    </div>
                    
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                      <p className="font-semibold text-white mb-1">Duração</p>
                      <p className="text-purple-300">45 minutos</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <EnhancedButton className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl">
                      Ver Resultados
                    </EnhancedButton>
                    <EnhancedButton 
                      variant="outline" 
                      className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-xl"
                    >
                      Baixar Transcrição
                    </EnhancedButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  )
}
