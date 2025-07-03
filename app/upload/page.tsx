
'use client'

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { EnhancedButton } from "../../components/ui/enhanced-button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { 
  Upload, 
  FileAudio, 
  FileVideo, 
  File, 
  Check, 
  AlertCircle, 
  Clock,
  Trash2,
  Play,
  Pause,
  Download,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeInSection, StaggerContainer, StaggerItem } from "../../components/ui/page-animations";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  transcript?: string;
  summary?: string;
  uploadedAt: Date;
}

const UploadPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  }, []);

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date()
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (file.status === 'uploading' && file.progress < 100) {
            return { ...file, progress: Math.min(file.progress + 10, 100) };
          } else if (file.status === 'uploading' && file.progress === 100) {
            return { 
              ...file, 
              status: 'processing', 
              progress: 0 
            };
          } else if (file.status === 'processing' && file.progress < 100) {
            return { ...file, progress: Math.min(file.progress + 5, 100) };
          } else if (file.status === 'processing' && file.progress === 100) {
            return { 
              ...file, 
              status: 'completed',
              transcript: "Esta é uma transcrição de exemplo gerada automaticamente pela IA. O conteúdo real seria baseado no arquivo de áudio ou vídeo enviado.",
              summary: "Resumo: Reunião de planejamento semanal com discussão sobre metas e objetivos do projeto."
            };
          }
        }
        return file;
      }));
    }, 1000);

    setTimeout(() => clearInterval(interval), 15000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('audio')) return FileAudio;
    if (type.includes('video')) return FileVideo;
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
      case 'uploading': return Upload;
      case 'processing': return Clock;
      case 'completed': return Check;
      case 'error': return AlertCircle;
      default: return File;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <FadeInSection>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Upload de Arquivos
              </h1>
              <p className="text-slate-300 text-lg">
                Faça upload de arquivos de áudio ou vídeo para transcrição automática
              </p>
            </div>
          </FadeInSection>

          {/* Upload Area */}
          <FadeInSection>
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-8">
              <CardContent className="p-8">
                <div
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
                    ${dragActive 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/30'
                    }
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="audio/*,video/*"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Arraste arquivos aqui ou clique para selecionar
                      </h3>
                      <p className="text-slate-300">
                        Suportamos arquivos de áudio e vídeo (MP3, MP4, WAV, M4A, MOV)
                      </p>
                    </div>
                    
                    <EnhancedButton variant="outline">
                      Selecionar Arquivos
                    </EnhancedButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Files List */}
          {files.length > 0 && (
            <FadeInSection>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileAudio className="w-5 h-5 mr-2" />
                    Arquivos Enviados ({files.length})
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Acompanhe o progresso de upload e processamento dos seus arquivos
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <StaggerContainer staggerDelay={0.1}>
                    <div className="space-y-4">
                      <AnimatePresence>
                        {files.map((file) => {
                          const FileIcon = getFileIcon(file.type);
                          const StatusIcon = getStatusIcon(file.status);
                          
                          return (
                            <StaggerItem key={file.id}>
                              <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4 hover:bg-slate-700/50 transition-all duration-300"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <FileIcon className="w-6 h-6 text-white" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-white font-medium truncate">
                                        {file.name}
                                      </h4>
                                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                                        <span>{formatFileSize(file.size)}</span>
                                        <span>•</span>
                                        <span>{file.uploadedAt.toLocaleTimeString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-4">
                                    <Badge variant="outline" className={getStatusColor(file.status)}>
                                      <StatusIcon className="w-3 h-3 mr-1" />
                                      {file.status === 'uploading' && 'Enviando'}
                                      {file.status === 'processing' && 'Processando'}
                                      {file.status === 'completed' && 'Concluído'}
                                      {file.status === 'error' && 'Erro'}
                                    </Badge>
                                    
                                    {file.status === 'completed' && (
                                      <div className="flex space-x-2">
                                        <EnhancedButton
                                          variant="ghost"
                                          size="sm"
                                          className="text-blue-400 hover:text-blue-300"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </EnhancedButton>
                                        
                                        <EnhancedButton
                                          variant="ghost"
                                          size="sm"
                                          className="text-green-400 hover:text-green-300"
                                        >
                                          <Download className="w-4 h-4" />
                                        </EnhancedButton>
                                      </div>
                                    )}
                                    
                                    <EnhancedButton
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile(file.id)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </EnhancedButton>
                                  </div>
                                </div>
                                
                                {(file.status === 'uploading' || file.status === 'processing') && (
                                  <div className="mt-4">
                                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                                      <span>
                                        {file.status === 'uploading' ? 'Enviando' : 'Processando'}...
                                      </span>
                                      <span>{file.progress}%</span>
                                    </div>
                                    <Progress 
                                      value={file.progress} 
                                      className="h-2 bg-slate-600/50"
                                    />
                                  </div>
                                )}
                                
                                {file.status === 'completed' && file.transcript && (
                                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                                    <h5 className="text-white font-medium mb-2">Transcrição:</h5>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                      {file.transcript}
                                    </p>
                                    
                                    {file.summary && (
                                      <div className="mt-3 pt-3 border-t border-slate-600/30">
                                        <h5 className="text-white font-medium mb-2">Resumo:</h5>
                                        <p className="text-slate-300 text-sm">
                                          {file.summary}
                                        </p>
                                      </div>
                                    )}
                                  </div>
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
        </div>
      </div>
    </PageTransition>
  );
};

export default UploadPage;
