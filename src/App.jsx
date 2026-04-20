import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'
import ForgetPassword from './pages/ForgetPassword'
import PublicRoute from './components/router/PublicRoute'
import ProtectedRoute from './components/router/ProtectedRoute'

function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/settings' element={<Settings />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>)
}

export default App