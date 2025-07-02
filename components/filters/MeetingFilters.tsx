'use client'

import { useState } from 'react'
import { Search, Filter, X, Calendar, Clock, Users, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

interface MeetingFiltersProps {
  onFilter: (filters: any) => void
  onSearch: (keyword: string) => void
}

const MeetingFilters = ({ onFilter, onSearch }: MeetingFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [platforms, setPlatforms] = useState<string[]>([])
  const [duration, setDuration] = useState({ min: 0, max: 200 })
  const [participants, setParticipants] = useState({ min: 0, max: 20 })
  const [keywords, setKeywords] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const newDateRange = { ...dateRange, [type]: value }
    setDateRange(newDateRange)
    onFilter({ searchTerm, dateRange: newDateRange, platforms, duration, participants, keywords })
  }

  const handlePlatformChange = (platform: string) => {
    let newPlatforms = [...platforms]
    if (platforms.includes(platform)) {
      newPlatforms = platforms.filter(p => p !== platform)
    } else {
      newPlatforms.push(platform)
    }
    setPlatforms(newPlatforms)
    onFilter({ searchTerm, dateRange, platforms: newPlatforms, duration, participants, keywords })
  }

  const handleDurationChange = (type: 'min' | 'max', value: number) => {
    const newDuration = { ...duration, [type]: value }
    setDuration(newDuration)
    onFilter({ searchTerm, dateRange, platforms, duration: newDuration, participants, keywords })
  }

  const handleParticipantsChange = (type: 'min' | 'max', value: number) => {
    const newParticipants = { ...participants, [type]: value }
    setParticipants(newParticipants)
    onFilter({ searchTerm, dateRange, platforms, duration, participants: newParticipants, keywords })
  }

  const handleKeywordChange = (keyword: string) => {
    let newKeywords = [...keywords]
    if (keywords.includes(keyword)) {
      newKeywords = keywords.filter(k => k !== keyword)
    } else {
      newKeywords.push(keyword)
    }
    setKeywords(newKeywords)
    onFilter({ searchTerm, dateRange, platforms, duration, participants, keywords: newKeywords })
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setDateRange({ start: '', end: '' })
    setPlatforms([])
    setDuration({ min: 0, max: 200 })
    setParticipants({ min: 0, max: 20 })
    setKeywords([])
    onFilter({ searchTerm: '', dateRange: { start: '', end: '' }, platforms: [], duration: { min: 0, max: 200 }, participants: { min: 0, max: 20 }, keywords: [] })
  }

  const commonKeywords = ['estratégia', 'vendas', 'produto', 'marketing', 'revisão', 'projeto']

  return (
    <Card className="bg-white border-slate-200 shadow-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtros
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Buscar por título, conteúdo..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <Button
            onClick={toggleFilter}
            className="w-full justify-start gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            <Filter className="w-4 h-4" />
            Mais Filtros
          </Button>

          {isFilterOpen && (
            <div className="border-t border-slate-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 inline-block mr-1" />
                    Data
                  </h4>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => handleDateChange('start', e.target.value)}
                      className="w-1/2"
                    />
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => handleDateChange('end', e.target.value)}
                      className="w-1/2"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Plataformas</h4>
                  <div className="flex flex-wrap gap-2">
                    {['zoom', 'teams', 'meet', 'webex'].map((platform) => (
                      <Button
                        key={platform}
                        variant="outline"
                        className={`text-xs ${platforms.includes(platform) ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-slate-600 border-slate-300'}`}
                        onClick={() => handlePlatformChange(platform)}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Duração (min)</h4>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={duration.min}
                      onChange={(e) => handleDurationChange('min', Number(e.target.value))}
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={duration.max}
                      onChange={(e) => handleDurationChange('max', Number(e.target.value))}
                      className="w-1/2"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Participantes</h4>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={participants.min}
                      onChange={(e) => handleParticipantsChange('min', Number(e.target.value))}
                      className="w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={participants.max}
                      onChange={(e) => handleParticipantsChange('max', Number(e.target.value))}
                      className="w-1/2"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    <Tag className="w-4 h-4 inline-block mr-1" />
                    Palavras-chave
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {commonKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className={`text-xs cursor-pointer ${keywords.includes(keyword) ? 'bg-blue-100 text-blue-700 border-blue-300' : 'text-slate-600 border-slate-300'}`}
                        onClick={() => handleKeywordChange(keyword)}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={clearFilters}
                className="w-full mt-4 justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-4 h-4" />
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MeetingFilters
