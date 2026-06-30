import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'

import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'

import './App.css'

function App() {

  return (
    <body className='bg-background'>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </body>
  )
}

export default App
