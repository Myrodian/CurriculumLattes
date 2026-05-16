import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../api/api'
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
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
          ? 'CPF/e-mail ou senha incorretos. Verifique seus dados e tente novamente.'
          : 'Não foi possível conectar ao servidor. Tente novamente em instantes.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-root">

      {/* ── Header ── */}
      <header className="login-header">
        <div className="login-header-logo">
          <div className="login-header-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48
                10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <div className="login-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="login-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
          <a href="#acessibilidade">Acessibilidade</a>
        </nav>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="login-subheader">
        <span>Início</span>
        <span>Entrar na Plataforma</span>
      </div>

      {/* ── Main ── */}
      <main className="login-main">

        {/* ── Painel lateral informativo ── */}
        <aside className="login-info-panel">
          <div className="login-info-card">
            <h3>Acesso à Plataforma</h3>
            <p>
              Para acessar sua conta, utilize o e-mail cadastrado e sua senha pessoal.
            </p>
            <p>
              Caso não possua cadastro, clique em <strong>Cadastre-se</strong> para criar
              seu currículo Lattes.
            </p>
          </div>

          <div className="login-info-card">
            <h3>Links Úteis</h3>
            <a href="#busca">Buscar currículo</a>
            <a href="#institucional">Acesso institucional</a>
            <a href="#recuperar">Recuperar senha</a>
            <a href="#faq">Perguntas frequentes</a>
          </div>

          <div className="login-info-card">
            <h3>Manutenção</h3>
            <p>Sistema disponível 24h por dia.</p>
            <span className="login-badge">Online</span>
          </div>
        </aside>

        {/* ── Formulário de login ── */}
        <div className="login-form-wrapper">
          <div className="login-form-card">

            {/* Título da seção */}
            <div className="login-form-title-bar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1
                  0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9
                  2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2
                  2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71
                  1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <span>Identificação do Usuário</span>
            </div>

            <div className="login-form-body">
              <p className="login-form-intro">
                Informe seu <strong>e-mail</strong> e <strong>senha</strong> cadastrados
                na Plataforma Lattes para acessar sua conta e gerenciar seu currículo.
              </p>

              {/* Mensagem de erro */}
              {error && (
                <div className="login-alert error" role="alert">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10
                      10 10-4.48 10-10S17.52 2 12 2zm1
                      15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="login-field">
                  <label htmlFor="email">
                    E-mail <span>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                </div>

                <div className="login-field">
                  <label htmlFor="password">
                    Senha <span>*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="login-field-row">
                  <label className="login-checkbox-label">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                    Manter-me conectado
                  </label>
                  <a href="#recuperar" className="login-forgot">
                    Esqueci minha senha
                  </a>
                </div>

                <div className="login-actions">
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24">
                          <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6
                            2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0
                            2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                        </svg>
                        Entrar
                      </>
                    )}
                  </button>
                  <a href="#cancelar" className="btn-secondary">
                    Cancelar
                  </a>
                </div>
              </form>
            </div>

            {/* Rodapé do card — Cadastro */}
            <div className="login-register-bar">
              <p>
                <strong>Ainda não possui cadastro?</strong>{' '}
                Crie seu currículo Lattes gratuitamente.
              </p>
              <a href="/cadastro" className="btn-secondary">
                Cadastre-se
              </a>
            </div>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="login-footer">
        <p>
          Plataforma Lattes — Conselho Nacional de Desenvolvimento Científico e
          Tecnológico (CNPq) ·{' '}
          <a href="#privacidade">Política de Privacidade</a> ·{' '}
          <a href="#termos">Termos de Uso</a>
        </p>
      </footer>

    </div>
  )
}