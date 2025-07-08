
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Calendar,
  Upload,
  MessageSquare,
  BarChart3,
  Settings,
  Building2,
  LogOut,
  Menu,
  X,
  Brain
} from 'lucide-react'
import { useState } from 'react'
import { EnhancedButton } from './enhanced-button'

interface SidebarProps {
  user: any
  onLogout: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "meetings", label: "Reuniões", icon: Calendar, href: "/meetings" },
    { id: "upload", label: "Upload", icon: Upload, href: "/upload" },
    { id: "chat", label: "Chat IA", icon: MessageSquare, href: "/chat" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
    { id: "empresa", label: "Empresa", icon: Building2, href: "/empresa" },
    { id: "settings", label: "Configurações", icon: Settings, href: "/settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <EnhancedButton
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/30 shadow-2xl"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </EnhancedButton>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Full height */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-800/95 backdrop-blur-2xl border-r border-slate-700/20 z-50 lg:relative lg:translate-x-0 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-center p-8 border-b border-slate-700/20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const active = isActive(item.href)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer group ${
                        active
                          ? 'bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 text-violet-300 border border-violet-500/30 shadow-lg shadow-violet-500/10' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40 hover:shadow-lg'
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        active 
                          ? 'bg-violet-500/20 text-violet-300' 
                          : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-white'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-base">{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-700/20 mt-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="p-5 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl mb-4 border border-slate-600/20 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.charAt(0) || user?.companyName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-base font-semibold text-white">
                  {user?.name || user?.companyName || 'Usuário'}
                </p>
                <p className="text-sm text-slate-400">
                  {user?.accountType === 'company' ? 'Empresa' : 'Usuário'}
                </p>
              </div>
            </div>
          </motion.div>
          
          <EnhancedButton
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start bg-slate-800/30 border-slate-600/30 text-slate-300 hover:bg-slate-700/40 hover:text-white hover:border-slate-500/40 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair
          </EnhancedButton>
        </div>
      </motion.div>
    </>
  )
}
