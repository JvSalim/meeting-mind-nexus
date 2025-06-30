
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  X,
  ChevronDown,
  Video
} from 'lucide-react'

interface FilterOptions {
  searchTerm: string
  dateRange: {
    start: string
    end: string
  }
  platforms: string[]
  duration: {
    min: number
    max: number
  }
  participants: {
    min: number
    max: number
  }
  keywords: string[]
}

interface MeetingFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  totalMeetings: number
  filteredCount: number
}

const platforms = [
  { id: 'zoom', name: 'Zoom', icon: '🔵', color: 'bg-blue-100 text-blue-800' },
  { id: 'teams', name: 'Microsoft Teams', icon: '🟣', color: 'bg-purple-100 text-purple-800' },
  { id: 'meet', name: 'Google Meet', icon: '🟢', color: 'bg-green-100 text-green-800' },
  { id: 'webex', name: 'Cisco Webex', icon: '🟠', color: 'bg-orange-100 text-orange-800' }
]

const commonKeywords = [
  'planejamento', 'estratégia', 'orçamento', 'vendas', 'marketing', 
  'desenvolvimento', 'produto', 'cliente', 'projeto', 'timeline',
  'metas', 'resultados', 'análise', 'retrospectiva', 'revisão'
]

export default function MeetingFilters({ onFiltersChange, totalMeetings, filteredCount }: MeetingFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    dateRange: { start: '', end: '' },
    platforms: [],
    duration: { min: 0, max: 300 },
    participants: { min: 1, max: 50 },
    keywords: []
  })

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      searchTerm: '',
      dateRange: { start: '', end: '' },
      platforms: [],
      duration: { min: 0, max: 300 },
      participants: { min: 1, max: 50 },
      keywords: []
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const togglePlatform = (platformId: string) => {
    const newPlatforms = filters.platforms.includes(platformId)
      ? filters.platforms.filter(p => p !== platformId)
      : [...filters.platforms, platformId]
    updateFilters({ platforms: newPlatforms })
  }

  const toggleKeyword = (keyword: string) => {
    const newKeywords = filters.keywords.includes(keyword)
      ? filters.keywords.filter(k => k !== keyword)
      : [...filters.keywords, keyword]
    updateFilters({ keywords: newKeywords })
  }

  const hasActiveFilters = 
    filters.searchTerm || 
    filters.dateRange.start || 
    filters.dateRange.end ||
    filters.platforms.length > 0 ||
    filters.keywords.length > 0 ||
    filters.duration.min > 0 ||
    filters.duration.max < 300 ||
    filters.participants.min > 1 ||
    filters.participants.max < 50

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Buscar por título, conteúdo ou participantes..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="pl-10 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
              />
            </div>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-purple-500 rounded-full ml-2"></div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtros Avançados
              </CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  {filteredCount} de {totalMeetings} reuniões
                </span>
                {hasActiveFilters && (
                  <Button
                    onClick={clearAllFilters}
                    variant="outline"
                    size="sm"
                    className="bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Período
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Data início</label>
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, start: e.target.value }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Data fim</label>
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => updateFilters({ 
                      dateRange: { ...filters.dateRange, end: e.target.value }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                <Video className="w-4 h-4 inline mr-2" />
                Plataformas
              </label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      filters.platforms.includes(platform.id)
                        ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50'
                    }`}
                  >
                    <span className="text-lg">{platform.icon}</span>
                    <span className="text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                <Clock className="w-4 h-4 inline mr-2" />
                Duração (minutos)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mínimo</label>
                  <Input
                    type="number"
                    min="0"
                    max="600"
                    value={filters.duration.min}
                    onChange={(e) => updateFilters({ 
                      duration: { ...filters.duration, min: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Máximo</label>
                  <Input
                    type="number"
                    min="0"
                    max="600"
                    value={filters.duration.max}
                    onChange={(e) => updateFilters({ 
                      duration: { ...filters.duration, max: parseInt(e.target.value) || 300 }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                <Users className="w-4 h-4 inline mr-2" />
                Número de Participantes
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mínimo</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={filters.participants.min}
                    onChange={(e) => updateFilters({ 
                      participants: { ...filters.participants, min: parseInt(e.target.value) || 1 }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Máximo</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={filters.participants.max}
                    onChange={(e) => updateFilters({ 
                      participants: { ...filters.participants, max: parseInt(e.target.value) || 50 }
                    })}
                    className="bg-slate-700/50 border-slate-600/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Palavras-chave Comuns
              </label>
              <div className="flex flex-wrap gap-2">
                {commonKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors border ${
                      filters.keywords.includes(keyword)
                        ? 'bg-purple-600/20 border-purple-500/50 text-purple-300'
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-600/50'
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-300">Filtros ativos:</span>
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Limpar todos
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <Badge variant="outline" className="bg-purple-600/10 text-purple-300 border-purple-500/30">
                  Busca: "{filters.searchTerm}"
                  <button
                    onClick={() => updateFilters({ searchTerm: '' })}
                    className="ml-2 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.platforms.map((platformId) => {
                const platform = platforms.find(p => p.id === platformId)
                return platform ? (
                  <Badge key={platformId} variant="outline" className="bg-purple-600/10 text-purple-300 border-purple-500/30">
                    {platform.icon} {platform.name}
                    <button
                      onClick={() => togglePlatform(platformId)}
                      className="ml-2 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null
              })}
              {filters.keywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="bg-purple-600/10 text-purple-300 border-purple-500/30">
                  {keyword}
                  <button
                    onClick={() => toggleKeyword(keyword)}
                    className="ml-2 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
