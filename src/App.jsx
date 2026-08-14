import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Future routes will go here: */}
          <Route path="inventory" element={<div className="p-4 text-gray-500">Inventory Page Placeholder</div>} />
          <Route path="categories" element={<div className="p-4 text-gray-500">Categories Page Placeholder</div>} />
          <Route path="settings" element={<div className="p-4 text-gray-500">Settings Page Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
