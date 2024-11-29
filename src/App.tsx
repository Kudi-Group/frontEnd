import './index.css'
import Login from './auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
