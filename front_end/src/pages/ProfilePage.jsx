import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserById, getUserActivities, getFollowing, followUser, unfollowUser } from '../api/api'
import './ProfilePage.css'
import { IconDoc, IconUser, IconEmail, IconId, IconBuilding, IconArticle, IconGrad, IconWork, IconPlus, IconCheck, IconLattes, IconOverview } from '../components/Icons'

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
  const [formacao, setFormacao]   = useState([])
  const [projetos, setProjetos]   = useState([])
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
        setFormacao(u?.formacao || [])
        setProjetos(u?.projetos || [])
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
    { id: 'formacao',  label: 'Formação',     icon: <IconGrad />,     badge: formacao.length },
    { id: 'projetos',  label: 'Projetos',     icon: <IconWork />,     badge: projetos.length },
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
                <Link to="/apresentacao" className="feed-shortcut-btn"><IconDoc /> Nova apresentação</Link>
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
