
'use client'

import { useState } from 'react'
import { User, Mail, Building, Phone, Settings, Camera, Save, ArrowLeft, Brain, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    company: 'TechCorp Solutions',
    phone: '+55 11 99999-9999',
    role: 'Gerente de Projetos',
    department: 'Tecnologia'
  })

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Settings, current: false },
    { name: 'Reuniões', href: '/meetings', icon: User, current: false },
    { name: 'Perfil', href: '/profile', icon: User, current: true },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Aqui seria feita a integração com a API para salvar os dados
    console.log('Dados salvos:', userData)
  }

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                item.current 
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
                <p className="text-slate-300">Gerencie suas informações pessoais e preferências</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{userData.name}</h2>
                  <p className="text-xl text-slate-300 mb-1">{userData.role}</p>
                  <p className="text-lg text-slate-400">{userData.company}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Informações Pessoais</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Nome Completo</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>E-mail</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Empresa</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.company}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Telefone</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.phone}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Cargo</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.role}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Departamento</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-lg text-white">
                      {userData.department}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24</div>
                <div className="text-slate-300">Reuniões este mês</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">156</div>
                <div className="text-slate-300">Total de reuniões</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">48h</div>
                <div className="text-slate-300">Tempo economizado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
