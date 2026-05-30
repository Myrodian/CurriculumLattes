import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../api/api'
import './CadastroPage.css'

const formatCpf = (value) => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export default function CadastroPage() {
  const [form, setForm] = useState({ name: '', email: '', cpf: '', password: '', confirmPassword: '', perfilId: '2' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'cpf' ? formatCpf(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      await createUser({
        name: form.name,
        email: form.email,
        cpf: form.cpf,
        password: form.password,
        perfils: [{ id: Number(form.perfilId) }],
      })
      setSuccess(true)
    } catch (err) {
      const status = err.response?.status
      if (status === 409) {
        setError('E-mail ou CPF já cadastrado.')
      } else if (status === 400 || status === 422) {
        setError('Dados inválidos. Verifique os campos e tente novamente.')
      } else {
        setError('Não foi possível conectar ao servidor. Tente novamente em instantes.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cadastro-root">

      {/* ── Header ── */}
      <header className="cadastro-header">
        <div className="cadastro-header-logo">
          <div className="cadastro-header-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48
                10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <div className="cadastro-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="cadastro-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
          <a href="#acessibilidade">Acessibilidade</a>
        </nav>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="cadastro-subheader">
        <span>Início</span>
        <span>Cadastro de Usuário</span>
      </div>

      {/* ── Main ── */}
      <main className="cadastro-main">

        {/* ── Painel lateral informativo ── */}
        <aside className="cadastro-info-panel">
          <div className="cadastro-info-card">
            <h3>Novo Cadastro</h3>
            <p>
              Preencha os dados ao lado para criar sua conta na Plataforma Lattes
              e ter acesso ao seu currículo.
            </p>
            <p>
              Após o cadastro, utilize seu <strong>e-mail</strong> e <strong>senha</strong> para acessar.
            </p>
          </div>

          <div className="cadastro-info-card">
            <h3>Já possui conta?</h3>
            <Link to="/login" className="cadastro-info-link-btn">Fazer login</Link>
          </div>

          <div className="cadastro-info-card">
            <h3>Links Úteis</h3>
            <a href="#busca">Buscar currículo</a>
            <a href="#faq">Perguntas frequentes</a>
            <a href="#privacidade">Política de Privacidade</a>
          </div>
        </aside>

        {/* ── Formulário de cadastro ── */}
        <div className="cadastro-form-wrapper">
          <div className="cadastro-form-card">

            <div className="cadastro-form-title-bar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4
                  7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2
                  0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span>Cadastro de Usuário</span>
            </div>

            <div className="cadastro-form-body">

              {success ? (
                <div className="cadastro-success">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                      10-4.48 10-10S17.52 2 12 2zm-2
                      14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18
                      8.5l-8 8z"/>
                  </svg>
                  <div>
                    <strong>Cadastro realizado com sucesso!</strong>
                    <p>Você já pode acessar a plataforma com seu e-mail e senha.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="cadastro-form-intro">
                    Preencha todos os campos obrigatórios para criar sua conta na Plataforma Lattes.
                  </p>

                  {error && (
                    <div className="cadastro-alert error" role="alert">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10
                          10 10-4.48 10-10S17.52 2 12 2zm1
                          15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="cadastro-field">
                      <label htmlFor="name">Nome completo <span>*</span></label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        autoComplete="name"
                        autoFocus
                        required
                      />
                    </div>

                    <div className="cadastro-field">
                      <label htmlFor="cpf">CPF <span>*</span></label>
                      <input
                        id="cpf"
                        name="cpf"
                        type="text"
                        value={form.cpf}
                        onChange={handleChange}
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        required
                      />
                    </div>

                    <div className="cadastro-field">
                      <label htmlFor="email">E-mail <span>*</span></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="cadastro-field">
                      <label htmlFor="perfilId">Tipo de usuário <span>*</span></label>
                      <select
                        id="perfilId"
                        name="perfilId"
                        value={form.perfilId}
                        onChange={handleChange}
                        required
                      >
                        <option value="2">Pesquisador</option>
                        <option value="3">Estudante</option>
                      </select>
                    </div>

                    <div className="cadastro-field-row">
                      <div className="cadastro-field">
                        <label htmlFor="password">Senha <span>*</span></label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Mínimo 6 caracteres"
                          autoComplete="new-password"
                          minLength={6}
                          maxLength={32}
                          required
                        />
                      </div>

                      <div className="cadastro-field">
                        <label htmlFor="confirmPassword">Confirmar senha <span>*</span></label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="Repita a senha"
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>

                    <div className="cadastro-actions">
                      <button type="submit" className="cadastro-btn-primary" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="cadastro-spinner" />
                            Cadastrando...
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9
                                19 21 7l-1.41-1.41z"/>
                            </svg>
                            Cadastrar
                          </>
                        )}
                      </button>
                      <Link to="/login" className="cadastro-btn-secondary">Cancelar</Link>
                    </div>
                  </form>
                </>
              )}

            </div>

            {success && (
              <div className="cadastro-success-bar">
                <Link to="/login" className="cadastro-btn-primary">
                  <svg viewBox="0 0 24 24">
                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6
                      2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0
                      2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                  </svg>
                  Fazer login
                </Link>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="cadastro-footer">
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
