import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  )
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user') || 'null')
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) {
      setReady(true)
      return
    }
    api.post('/auth/login', null, {
      headers: { Authorization: `Basic ${savedToken}` },
    })
      .then(res => {
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      })
      .finally(() => setReady(true))
  }, [])

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = !!token

  if (!ready) return null

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// uso no App.jsx:
// <AuthProvider>
//   <Router> ... </Router>
// </AuthProvider>
//
// rota protegida:
// const { isAuthenticated } = useAuth()
// if (!isAuthenticated) return <Navigate to="/login" />