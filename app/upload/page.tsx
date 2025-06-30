
'use client'

import { useState } from 'react'
import { ArrowLeft, Upload, FileAudio, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        
        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
        }
      }, 200)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload de Reunião</h1>
          <p className="text-slate-600">Envie arquivos de áudio ou vídeo para transcrição automática</p>
        </div>

        {/* Upload Area */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Selecionar Arquivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!uploadComplete ? (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <FileAudio className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Arrastar e soltar ou clique para selecionar
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Formatos suportados: MP3, MP4, WAV, M4A, WEBM
                  </p>
                  <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                      Selecionar Arquivo
                    </Button>
                  </label>
                </div>

                {isUploading && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Enviando arquivo...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Upload Concluído!
                </h3>
                <p className="text-slate-600 mb-6">
                  Seu arquivo foi enviado com sucesso e está sendo processado pela IA.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/meetings">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Ver Reuniões
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadComplete(false)
                      setUploadProgress(0)
                    }}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Enviar Outro
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileAudio className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Transcrição Automática</h3>
              <p className="text-sm text-slate-600">
                Powered by IA avançada para máxima precisão
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Processamento Rápido</h3>
              <p className="text-sm text-slate-600">
                Resultados em poucos minutos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Múltiplos Formatos</h3>
              <p className="text-sm text-slate-600">
                Suporte a áudio e vídeo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
