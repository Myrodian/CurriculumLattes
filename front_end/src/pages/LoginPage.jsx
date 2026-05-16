import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../api/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginUser(email, password)
      login(data.token, data)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'E-mail ou senha incorretos'
          : 'Erro ao conectar. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Bem-vindo</h1>
        <p>Entre com sua conta</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>E-mail
            <input type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required autoFocus />
          </label>
          <label>Senha
            <input type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}