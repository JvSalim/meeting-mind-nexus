
'use client'

import { useState, useRef } from 'react'
import { Upload, File, X, Check, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UploadFile {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedFormats = ['.mp3', '.mp4', '.wav', '.m4a', '.mov', '.avi']

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading' as const
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Simular upload
    newFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100)
          const newStatus = newProgress >= 100 ? 'completed' : 'uploading'
          return { ...file, progress: newProgress, status: newStatus }
        }
        return file
      }))
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, progress: 100, status: 'completed' } : file
      ))
    }, 3000 + Math.random() * 2000)
  }

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const completedFiles = files.filter(f => f.status === 'completed').length
  const totalFiles = files.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload de Arquivos</h1>
          <p className="text-slate-600">Envie arquivos de áudio ou vídeo para transcrição automática</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Arraste arquivos aqui ou clique para selecionar
              </h3>
              <p className="text-slate-600 mb-4">
                Suporte para MP3, MP4, WAV, M4A, MOV, AVI
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Selecionar Arquivos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFormats.join(',')}
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Accepted Formats */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Formatos aceitos:</p>
                  <p className="text-sm text-blue-700">
                    {acceptedFormats.join(', ')} • Tamanho máximo: 500MB por arquivo
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        {files.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Progresso do Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">
                  {completedFiles} de {totalFiles} arquivos processados
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File List */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Arquivos em Processamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((uploadFile) => (
                  <div key={uploadFile.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {uploadFile.file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {uploadFile.status === 'completed' && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                          <button
                            onClick={() => removeFile(uploadFile.id)}
                            className="p-1 hover:bg-slate-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                uploadFile.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${uploadFile.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{formatFileSize(uploadFile.file.size)}</span>
                          <span>•</span>
                          <span>
                            {uploadFile.status === 'completed' ? 'Concluído' : 
                             uploadFile.status === 'uploading' ? 'Enviando...' : 'Erro'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {completedFiles > 0 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">
                        {completedFiles} arquivo{completedFiles > 1 ? 's' : ''} enviado{completedFiles > 1 ? 's' : ''} com sucesso!
                      </p>
                      <p className="text-sm text-green-700">
                        A transcrição será processada automaticamente. Você receberá uma notificação quando estiver pronta.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
