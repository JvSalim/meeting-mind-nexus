
'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Play, Pause, Volume2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
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
  const router = useRouter()

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

    // Mock upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    // Simulate upload and transcription process
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50 p-6 sticky top-0 z-30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <Upload className="w-8 h-8 mr-3 text-green-400" />
                Upload de Áudio
              </h1>
              <p className="text-slate-300">
                Envie seus arquivos de áudio para transcrição inteligente
              </p>
            </div>
          </div>
        </motion.header>

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-green-400" />
                  Envio de Arquivo
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Selecione o arquivo de áudio para iniciar a transcrição
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  accept="audio/*"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <EnhancedButton
                  variant="secondary"
                  onClick={handleFileSelect}
                  className="w-full justify-center bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Selecionar Arquivo
                </EnhancedButton>

                {file && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-md bg-slate-700/20 border border-slate-600/50 text-slate-300"
                  >
                    Arquivo selecionado: {file.name}
                  </motion.div>
                )}

                <EnhancedButton
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Enviar para Transcrição</span>
                    </div>
                  )}
                </EnhancedButton>

                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-slate-400 text-sm mb-2">Progresso do envio:</p>
                    <Progress value={uploadProgress} className="bg-slate-700/50 border-slate-600/50" />
                    <p className="text-slate-400 text-sm mt-1">{uploadProgress}%</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {transcriptionStatus === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Transcrição Concluída
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    A transcrição do seu arquivo de áudio foi concluída com sucesso!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Sua transcrição está pronta para ser visualizada e editada.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {transcriptionStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                    Erro na Transcrição
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Ocorreu um erro ao processar a transcrição do seu arquivo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Por favor, tente novamente ou entre em contato com o suporte.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
