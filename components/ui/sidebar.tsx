
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
    { id: "business", label: "Empresa", icon: Building2, href: "/business" },
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
          className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50"
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 z-50 lg:relative lg:translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-slate-800/50">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-6 flex-1">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.href)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-800/50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg mb-4 border border-slate-700/50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || user?.companyName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user?.name || user?.companyName || 'Usuário'}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.accountType === 'company' ? 'Empresa' : 'Usuário'}
                </p>
              </div>
            </div>
          </motion.div>
          
          <EnhancedButton
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </EnhancedButton>
        </div>
      </motion.div>
    </>
  )
}
