
'use client'

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Badge } from "../../components/ui/badge";
import { 
  Upload as UploadIcon, 
  FileAudio, 
  FileVideo,
  File,
  X,
  Check,
  Clock,
  Brain,
  Download,
  Play,
  Pause,
  Volume2,
  Settings,
  Sparkles,
  AlertCircle,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";
import { useRouter } from "next/navigation";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  transcription?: string;
  uploadedAt: Date;
}

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('audio/') || 
      file.type.startsWith('video/') ||
      file.type === 'application/pdf'
    );

    validFiles.forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date()
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = async (fileId: string) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress }
            : file
        )
      );
    }

    // Change to processing
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, status: 'processing', progress: 0 }
          : file
      )
    );

    // Simulate processing
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress }
            : file
        )
      );
    }

    // Complete processing
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              status: 'completed', 
              progress: 100,
              transcription: `Transcrição completa do arquivo ${file.name}. Esta é uma simulação da transcrição que seria gerada pela IA após o processamento do arquivo de áudio ou vídeo.`
            }
          : file
      )
    );
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('audio/')) return FileAudio;
    if (type.startsWith('video/')) return FileVideo;
    return File;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'processing': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      case 'completed': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'error': return 'bg-red-600/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-600/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'processing': return <Brain className="w-3 h-3" />;
      case 'completed': return <Check className="w-3 h-3" />;
      case 'error': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Upload de Arquivos
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Faça upload de arquivos de áudio, vídeo ou documentos para transcrição e análise com IA
              </p>
            </div>
          </FadeInSection>

          {/* Upload Area */}
          <FadeInSection>
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragActive
                      ? 'border-purple-400 bg-purple-600/10'
                      : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/20'
                  }`}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="audio/*,video/*,.pdf"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <motion.div
                    animate={{ 
                      scale: isDragActive ? 1.05 : 1,
                      rotate: isDragActive ? 5 : 0 
                    }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <UploadIcon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {isDragActive ? 'Solte os arquivos aqui' : 'Faça upload dos seus arquivos'}
                      </h3>
                      <p className="text-slate-300 mb-4">
                        Arraste e solte ou clique para selecionar arquivos
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                          <FileAudio className="w-3 h-3 mr-1" />
                          Áudio
                        </Badge>
                        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                          <FileVideo className="w-3 h-3 mr-1" />
                          Vídeo
                        </Badge>
                        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                          <File className="w-3 h-3 mr-1" />
                          PDF
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <FadeInSection>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    Arquivos Enviados
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Acompanhe o progresso da transcrição dos seus arquivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StaggerContainer staggerDelay={0.1}>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {uploadedFiles.map((file) => {
                          const FileIcon = getFileIcon(file.type);
                          return (
                            <StaggerItem key={file.id}>
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileHover={{ scale: 1.01 }}
                                className="p-6 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-all duration-300"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                      <FileIcon className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-white truncate">
                                        {file.name}
                                      </h4>
                                      <div className="flex items-center space-x-4 text-sm text-slate-300">
                                        <span>{formatFileSize(file.size)}</span>
                                        <span>•</span>
                                        <span>{new Date(file.uploadedAt).toLocaleTimeString('pt-BR')}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-4">
                                    <Badge variant="outline" className={getStatusColor(file.status)}>
                                      {getStatusIcon(file.status)}
                                      <span className="ml-1 capitalize">
                                        {file.status === 'uploading' && 'Enviando'}
                                        {file.status === 'processing' && 'Processando'}
                                        {file.status === 'completed' && 'Concluído'}
                                        {file.status === 'error' && 'Erro'}
                                      </span>
                                    </Badge>

                                    {file.status === 'completed' && (
                                      <EnhancedButton
                                        variant="outline"
                                        size="sm"
                                        className="bg-slate-600/50 border-slate-500/50 text-slate-300"
                                      >
                                        <Download className="w-4 h-4 mr-1" />
                                        Baixar
                                      </EnhancedButton>
                                    )}

                                    <EnhancedButton
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile(file.id)}
                                      className="text-slate-400 hover:text-red-400"
                                    >
                                      <X className="w-4 h-4" />
                                    </EnhancedButton>
                                  </div>
                                </div>

                                {/* Progress Bar */}
                                {(file.status === 'uploading' || file.status === 'processing') && (
                                  <div className="mt-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm text-slate-300">
                                        {file.status === 'uploading' ? 'Enviando...' : 'Processando com IA...'}
                                      </span>
                                      <span className="text-sm text-slate-300">
                                        {file.progress}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-slate-600/50 rounded-full h-2">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${file.progress}%` }}
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                        transition={{ duration: 0.3 }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Transcription Preview */}
                                {file.status === 'completed' && file.transcription && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <h5 className="font-medium text-white flex items-center">
                                        <Brain className="w-4 h-4 mr-2 text-purple-400" />
                                        Transcrição
                                      </h5>
                                      <EnhancedButton
                                        variant="outline"
                                        size="sm"
                                        className="bg-slate-700/50 border-slate-600/50 text-slate-300"
                                      >
                                        Ver Completa
                                      </EnhancedButton>
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-3">
                                      {file.transcription}
                                    </p>
                                  </motion.div>
                                )}
                              </motion.div>
                            </StaggerItem>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </StaggerContainer>
                </CardContent>
              </Card>
            </FadeInSection>
          )}

          {/* Quick Actions */}
          <FadeInSection>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Configurações</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Ajuste as preferências de transcrição
                  </p>
                  <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                    Configurar
                  </EnhancedButton>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">IA Analytics</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Análise inteligente dos arquivos
                  </p>
                  <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                    Ver Análises
                  </EnhancedButton>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Exportar Tudo</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Baixe todas as transcrições
                  </p>
                  <EnhancedButton variant="outline" size="sm" className="bg-slate-700/50 border-slate-600/50 text-slate-300">
                    Exportar
                  </EnhancedButton>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </div>
    </PageTransition>
  );
};

export default Upload;
