
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
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <EnhancedButton
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white hover:bg-white/20"
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Full height with fixed positioning */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen || typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 z-50 lg:relative lg:translate-x-0 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-center p-8 border-b border-white/10 flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              MeetingAI
            </span>
          </Link>
        </div>

        {/* Navigation - Flexible grow */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
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
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                        active
                          ? 'bg-white/10 text-white border border-white/20 shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        active 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
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

        {/* User Profile - Fixed at bottom */}
        <div className="p-6 border-t border-white/10 flex-shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl mb-4 border border-white/10 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.charAt(0) || user?.companyName?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-base font-semibold text-white">
                  {user?.name || user?.companyName || 'Usuário'}
                </p>
                <p className="text-sm text-white/60">
                  {user?.accountType === 'company' ? 'Empresa' : 'Usuário'}
                </p>
              </div>
            </div>
          </motion.div>
          
          <EnhancedButton
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair
          </EnhancedButton>
        </div>
      </motion.div>
    </>
  )
}
