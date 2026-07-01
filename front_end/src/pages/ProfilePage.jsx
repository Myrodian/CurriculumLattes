import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserById, getUserActivities, getFollowing, followUser, unfollowUser } from '../api/api'
import './ProfilePage.css'

/* ── Ícones reutilizáveis ── */
const IconUser = () => (
  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4
    7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
)
const IconEmail = () => (
  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
    2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
)
const IconId = () => (
  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
    2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 13H6v-2h2v2zm0-4H6V7h2v2zm10
    4H10v-2h8v2zm0-4h-8V7h8v2z"/></svg>
)
const IconBuilding = () => (
  <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4
    12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0
    4h-2v2h2v-2z"/></svg>
)
const IconArticle = () => (
  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9
    2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
)
const IconGrad = () => (
  <svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12
    3zm-5 8.18V15c0 1.66 3 3 5 3s5-1.34 5-3v-3.82l-5 2.73-5-2.73z"/></svg>
)
const IconWork = () => (
  <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1
    0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9
    2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/></svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
)
const IconLattes = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
    10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
)
const IconOverview = () => (
  <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4
    4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
)

const TIPO_LABEL = {
  APRESENTACAO: 'Apresentação de trabalho',
  PRODUTO: 'Produto técnico',
  PROJETO_ENSINO: 'Projeto de ensino',
  TRABALHO_TECNICO: 'Trabalho técnico',
}

export default function ProfilePage() {
  const { id } = useParams()
  const { user: authUser, isAuthenticated } = useAuth()
  const targetId = id || authUser?.id

  const [user, setUser]           = useState(null)
  const [producoes, setProducoes] = useState([])
  const [isFollowing, setFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  useEffect(() => {
    if (!targetId) return
    setLoading(true)
    setError('')
    Promise.all([
      getUserById(targetId).catch(() => null),
      getUserActivities(targetId).catch(() => []),
    ])
      .then(([u, acts]) => {
        if (!u) setError('Não foi possível carregar o currículo.')
        setUser(u)
        setProducoes(acts || [])
      })
      .finally(() => setLoading(false))
  }, [targetId])

  useEffect(() => {
    if (!isAuthenticated || !targetId) return
    getFollowing()
      .then(list => setFollowing((list || []).some(f => String(f.id) === String(targetId))))
      .catch(() => {})
  }, [isAuthenticated, targetId])

  if (!targetId) return <Navigate to="/login" />

  const isOwn = isAuthenticated && authUser?.id != null && String(authUser.id) === String(targetId)

  const toggleFollow = async () => {
    try {
      if (isFollowing) await unfollowUser(targetId)
      else await followUser(targetId)
      setFollowing(v => !v)
    } catch { /* silencioso */ }
  }

  const displayName  = user?.name || (loading ? 'Carregando…' : 'Currículo')
  const email        = user?.email || ''
  const username     = email ? email.split('@')[0] : ''
  const institution  = user?.address?.institutionName || ''
  const profileLabel = user?.perfils?.[0]?.nome || 'Pesquisador'

  const TABS = [
    { id: 'overview',  label: 'Visão Geral', icon: <IconOverview />, badge: null },
    { id: 'producoes', label: 'Produções',   icon: <IconArticle />,  badge: producoes.length },
    { id: 'formacao',  label: 'Formação',     icon: <IconGrad />,     badge: 0 },
    { id: 'projetos',  label: 'Projetos',     icon: <IconWork />,     badge: 0 },
  ]

  return (
    <div className="profile-root">

      {/* ── Header ── */}
      <header className="profile-header">
        <Link to={isAuthenticated ? '/feed' : '/login'} className="profile-header-logo" style={{ textDecoration: 'none' }}>
          <div className="profile-header-icon"><IconLattes /></div>
          <div className="profile-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </Link>
        <nav className="profile-header-links">
          {isAuthenticated && <Link to="/feed">Feed</Link>}
          <Link to="/busca">Buscar</Link>
          <a href="#ajuda">Ajuda</a>
        </nav>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="profile-subheader">
        <span>Início</span>
        <span>Currículo</span>
        {user?.name && <span>{user.name}</span>}
      </div>

      {/* ── Main ── */}
      <main className="profile-main">

        {/* ── Coluna lateral ── */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-placeholder"><IconUser /></div>
            </div>

            <span className="profile-user-name">{displayName}</span>
            {username && <span className="profile-user-username">@{username}</span>}

            {isAuthenticated && !isOwn && (
              <button
                className={isFollowing ? 'profile-btn-secondary' : 'profile-btn-primary'}
                onClick={toggleFollow}
                style={{ marginTop: '0.85rem', width: '100%', justifyContent: 'center', cursor: 'pointer' }}
              >
                {isFollowing ? <><IconCheck /> Seguindo</> : <><IconPlus /> Seguir</>}
              </button>
            )}
            {/* {isOwn && (
              <Link
                to="/apresentacao"
                className="profile-btn-edit-profile"
                style={{ marginTop: '0.85rem' }}
              >
                <IconPlus /> Nova produção
              </Link>
            )} */}

            <ul className="profile-meta-list">
              {email && (
                <li className="profile-meta-item">
                  <IconEmail />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {institution && (
                <li className="profile-meta-item">
                  <IconBuilding />
                  <span>{institution}</span>
                </li>
              )}
              {isOwn && user?.cpf && (
                <li className="profile-meta-item">
                  <IconId />
                  <span>CPF: <strong>{user.cpf}</strong></span>
                </li>
              )}
              <li className="profile-meta-item">
                <IconUser />
                <span><span className="profile-badge active">{profileLabel}</span></span>
              </li>
            </ul>
          </div>

          {/* Links úteis */}
          <div className="profile-side-card">
            <h3>Links Úteis</h3>
            <Link to="/busca">Buscar currículo</Link>
            {isAuthenticated && <Link to="/feed">Voltar ao feed</Link>}
            <a href="#privacidade">Política de Privacidade</a>
          </div>
        </aside>

        {/* ── Conteúdo principal ── */}
        <div className="profile-content">

          {error && (
            <div className="profile-section-card">
              <div className="profile-section-body">
                <div className="profile-empty-state">
                  <IconUser />
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Abas */}
          <nav className="profile-tabs" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`profile-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== null && <span className="profile-tab-badge">{tab.badge}</span>}
              </button>
            ))}
          </nav>

          {/* ── Visão Geral ── */}
          {activeTab === 'overview' && (
            <>
              <div className="profile-section-card">
                <div className="profile-section-title-bar">
                  <IconLattes />
                  <span>Dados do Currículo</span>
                </div>
                <div className="profile-section-body">
                  <div className="profile-cv-info-grid">
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Nome completo</span>
                      <span className="profile-cv-info-value">{user?.name || '—'}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">E-mail</span>
                      <span className="profile-cv-info-value">
                        {email ? <a href={`mailto:${email}`}>{email}</a> : '—'}
                      </span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Instituição</span>
                      <span className="profile-cv-info-value">{institution || '—'}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Tipo de usuário</span>
                      <span className="profile-cv-info-value">{profileLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-section-card">
                <div className="profile-section-title-bar">
                  <IconArticle />
                  <span>Últimas Produções</span>
                  <div className="profile-section-actions">
                    <button className="profile-btn-action" onClick={() => setActiveTab('producoes')}>
                      Ver todas
                    </button>
                  </div>
                </div>
                <div className="profile-section-body">
                  {producoes.length === 0 ? (
                    <div className="profile-empty-state">
                      <IconArticle />
                      <p>{loading ? 'Carregando produções…' : 'Nenhuma produção cadastrada ainda.'}</p>
                    </div>
                  ) : (
                    <div className="profile-item-list">
                      {producoes.slice(0, 3).map(p => (
                        <div key={`${p.type}-${p.id}`} className="profile-item-entry">
                          <div className="profile-item-icon"><IconArticle /></div>
                          <div className="profile-item-body">
                            <div className="profile-item-title">{p.titulo}</div>
                            <div className="profile-item-sub">{TIPO_LABEL[p.type] || 'Produção'}</div>
                          </div>
                          <span className="profile-item-year">{p.ano}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── Produções ── */}
          {activeTab === 'producoes' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconArticle />
                <span>Produções Acadêmicas</span>
              </div>
              <div className="profile-section-body">
                {producoes.length === 0 ? (
                  <div className="profile-empty-state">
                    <IconArticle />
                    <p>{loading ? 'Carregando produções…' : 'Nenhuma produção cadastrada.'}</p>
                  </div>
                ) : (
                  <div className="profile-item-list">
                    {producoes.map(p => (
                      <div key={`${p.type}-${p.id}`} className="profile-item-entry">
                        <div className="profile-item-icon"><IconArticle /></div>
                        <div className="profile-item-body">
                          <div className="profile-item-title">{p.titulo}</div>
                          <div className="profile-item-sub">{TIPO_LABEL[p.type] || 'Produção'}</div>
                        </div>
                        <span className="profile-item-year">{p.ano}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Formação ── */}
          {activeTab === 'formacao' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconGrad />
                <span>Formação Acadêmica</span>
              </div>
              <div className="profile-section-body">
                <div className="profile-empty-state">
                  <IconGrad />
                  <p>Formação acadêmica ainda não disponível nesta versão.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Projetos ── */}
          {activeTab === 'projetos' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconWork />
                <span>Projetos de Pesquisa</span>
              </div>
              <div className="profile-section-body">
                <div className="profile-empty-state">
                  <IconWork />
                  <p>Projetos de pesquisa ainda não disponíveis nesta versão.</p>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', paddingBottom: '0.5rem' }}>
            <Link to={isAuthenticated ? '/feed' : '/busca'} className="profile-btn-secondary">
              ← Voltar
            </Link>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="profile-footer">
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
