
'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Search, Filter, Calendar, Users, Clock, X } from 'lucide-react'

interface MeetingFiltersProps {
  onSearch: (keyword: string) => void
  onFilter: (filters: any) => void
}

export function MeetingFilters({ onSearch, onFilter }: MeetingFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filterOptions = [
    { id: 'today', label: 'Hoje', icon: Calendar },
    { id: 'week', label: 'Esta Semana', icon: Calendar },
    { id: 'month', label: 'Este Mês', icon: Calendar },
    { id: 'large', label: 'Grandes (10+ pessoas)', icon: Users },
    { id: 'long', label: 'Longas (2h+)', icon: Clock },
  ]

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleFilterToggle = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId]
    
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchTerm('')
    onFilter([])
    onSearch('')
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Filter className="w-5 h-5 mr-2 text-purple-400" />
          Filtros e Busca
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="flex space-x-3">
            <Input
              placeholder="Buscar por título, participantes, tópicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
            />
            <Button onClick={handleSearch} variant="outline" className="bg-slate-700/50 border-slate-600/50">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const isActive = activeFilters.includes(filter.id)
              return (
                <Button
                  key={filter.id}
                  variant={isActive ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleFilterToggle(filter.id)}
                  className={isActive 
                    ? "bg-purple-600 hover:bg-purple-700 text-white" 
                    : "bg-slate-700/50 border-slate-600/50 text-slate-300"
                  }
                >
                  <filter.icon className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              )
            })}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/50">
              <span className="text-sm text-slate-400">Filtros ativos:</span>
              {activeFilters.map((filterId) => {
                const filter = filterOptions.find(f => f.id === filterId)
                return (
                  <Badge
                    key={filterId}
                    variant="outline"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/50"
                  >
                    {filter?.label}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterToggle(filterId)}
                    />
                  </Badge>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-400 hover:text-white"
              >
                Limpar tudo
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
