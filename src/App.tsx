
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Meetings from '@/pages/Meetings'
import Profile from '@/pages/Profile'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
