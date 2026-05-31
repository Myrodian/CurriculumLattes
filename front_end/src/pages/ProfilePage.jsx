import { useState, useEffect } from 'react'
import { Link, useParams, Navigate} from 'react-router-dom'
import { getUserById } from '../api/api'
import './ProfilePage.css'

/* ── Ícones reutilizáveis ── */
const IconUser = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4
      7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2
      0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
)

const IconEdit = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3
      17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1
      1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
)

const IconEmail = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
      2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0
      4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const IconId = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
      2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8
      13H6v-2h2v2zm0-4H6V7h2v2zm10
      4H10v-2h8v2zm0-4h-8V7h8v2z"/>
  </svg>
)

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1
      0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0
      2-.9 2-2V5c0-1.1-.9-2-2-2zm0
      16H5V8h14v11zm-7-9h-2v2h2v-2zm4
      0h-2v2h2v-2zm-8 4h-2v2h2v-2zm4
      0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
  </svg>
)

const IconBook = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9
      2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0
      18H6V4h2v8l2.5-1.5L13 12V4h5v16z"/>
  </svg>
)

const IconArticle = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9
      2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5
      14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
)

const IconGrad = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12
      3zm-5 8.18V15c0 1.66 3 3 5 3s5-1.34
      5-3v-3.82l-5 2.73-5-2.73z"/>
  </svg>
)

const IconPlus = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
)

const IconLattes = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
      10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4
      0h-2V8h2v8z"/>
  </svg>
)

const IconOverview = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4
      4h14v-2H7v2zm0 4h14v-2H7v2zM7
      7v2h14V7H7z"/>
  </svg>
)

const IconWork = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18
      2.99 16.5 1.5 14.8 1.5c-1.04 0-1.96.5-2.55
      1.26L12 3.54l-.25-.78C11.16 2
      10.24 1.5 9.2 1.5 7.5 1.5 6 2.99 6
      4.7c0 .44.11.86.18 1.3H4c-1.1
      0-2 .9-2 2v11c0 1.1.9 2 2
      2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM14.8
      3.5c.94 0 1.7.77 1.7 1.7 0
      .45-.22.84-.47 1.3H12.6c.02-.07.06-.14.08-.21l.65-2.1c.26-.44.86-.69
      1.47-.69zM8 4.7c0-.93.77-1.7 1.7-1.7.59
      0 1.17.25 1.46.69l.65 2.1c.02.07.06.14.08.21H8.47C8.22
      5.54 8 5.15 8 4.7zM20 19H4V8h16v11z"/>
  </svg>
)

/* ── Dados mock para preview (substituir por chamada de API) ── */
const MOCK_USER = {
  id: 1,
  name: 'Maria da Silva Santos',
  username: 'mariasilva',
  email: 'maria.santos@universidade.edu.br',
  cpf: '123.456.789-00',
  lattesId: 'K123456789',
  memberSince: '2018',
  bio: 'Pesquisadora nas áreas de Computação e Inteligência Artificial. Docente na Universidade Federal.',
  profiles: [{ id: 2, name: 'Pesquisador' }],
  followers: 24,
  following: 8,
  active: true,
}

const MOCK_FORMACOES = [
  {
    id: 1,
    titulo: 'Doutorado em Ciência da Computação',
    instituicao: 'Universidade de São Paulo (USP)',
    ano: '2015',
  },
  {
    id: 2,
    titulo: 'Mestrado em Ciência da Computação',
    instituicao: 'Universidade Estadual de Campinas (UNICAMP)',
    ano: '2011',
  },
  {
    id: 3,
    titulo: 'Bacharelado em Sistemas de Informação',
    instituicao: 'Universidade Federal de Minas Gerais (UFMG)',
    ano: '2008',
  },
]

const MOCK_PRODUCOES = [
  {
    id: 1,
    titulo: 'Deep Learning aplicado à análise de imagens médicas',
    tipo: 'Artigo em periódico',
    publicacao: 'Journal of Biomedical Informatics',
    ano: '2023',
  },
  {
    id: 2,
    titulo: 'Redes neurais recorrentes para processamento de linguagem natural em português',
    tipo: 'Artigo em conferência',
    publicacao: 'SBSI 2022 — Simpósio Brasileiro de Sistemas de Informação',
    ano: '2022',
  },
  {
    id: 3,
    titulo: 'Algoritmos de otimização para aprendizado de máquina em ambientes distribuídos',
    tipo: 'Capítulo de livro',
    publicacao: 'Avanços em Inteligência Artificial — Editora Acadêmica',
    ano: '2021',
  },
  {
    id: 4,
    titulo: 'Transfer Learning em domínios de baixo recurso: um estudo comparativo',
    tipo: 'Artigo em periódico',
    publicacao: 'Revista Brasileira de Computação Aplicada',
    ano: '2020',
  },
]

/* ── Abas ── */
const TABS = [
  { id: 'overview',  label: 'Visão Geral',  icon: <IconOverview />,  badge: null },
  { id: 'producoes', label: 'Produções',    icon: <IconArticle />,   badge: MOCK_PRODUCOES.length },
  { id: 'formacao',  label: 'Formação',     icon: <IconGrad />,      badge: MOCK_FORMACOES.length },
  { id: 'projetos',  label: 'Projetos',     icon: <IconWork />,      badge: 0 },
]

export default function ProfilePage() {
  const { id } = useParams()
  const [user, setUser]           = useState(MOCK_USER)
  const [formacoes]               = useState(MOCK_FORMACOES)
  const [producoes]               = useState(MOCK_PRODUCOES)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getUserById(id)
      .then(data => setUser(data))
      .catch(() => setError('Não foi possível carregar o profile.'))
      .finally(() => setLoading(false))
  }, [id])

  const profileLabel = user?.profiles?.[0]?.name ?? 'Usuário'

  return (
    <div className="profile-root">

      {/* ── Header ── */}
      <header className="profile-header">
        <div className="profile-header-logo">
          <div className="profile-header-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48
                10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <div className="profile-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="profile-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
          <a href="#acessibilidade">Acessibilidade</a>
        </nav>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="profile-subheader">
        <span>Início</span>
        <span>Profile</span>
        {user?.name && <span>{user.name}</span>}
      </div>

      {/* ── Main ── */}
      <main className="profile-main">

        {/* ── Coluna lateral ── */}
        <aside className="profile-sidebar">

          {/* Avatar + dados pessoais */}
          <div className="profile-avatar-card">

            <div className="profile-avatar-wrap">
              <div className="profile-avatar-placeholder">
                <IconUser />
              </div>
              <button className="profile-avatar-edit-btn" title="Alterar foto">
                <IconEdit />
              </button>
            </div>

            <span className="profile-user-name">{user.name}</span>
            <span className="profile-user-username">@{user.username}</span>

            {user.bio && (
              <p className="profile-user-bio">{user.bio}</p>
            )}

            <Link to={`/profile/${user.id}/editar`} className="profile-btn-edit-profile">
              <IconEdit />
              Editar profile
            </Link>

            <ul className="profile-meta-list">
              <li className="profile-meta-item">
                <IconId />
                <span>ID Lattes: <strong>{user.lattesId}</strong></span>
              </li>
              <li className="profile-meta-item">
                <IconEmail />
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
              <li className="profile-meta-item">
                <IconCalendar />
                <span>Membro desde {user.memberSince}</span>
              </li>
              <li className="profile-meta-item">
                <IconUser />
                <span>
                  <span className="profile-badge active">{profileLabel}</span>
                </span>
              </li>
            </ul>

            <div className="profile-stats-row">
              <span><strong>{user.followers}</strong> seguidores</span>
              <span><strong>{user.following}</strong> seguindo</span>
            </div>

          </div>

          {/* Links úteis */}
          <div className="profile-side-card">
            <h3>Links Úteis</h3>
            <a href="#busca">Buscar currículo</a>
            <a href="#faq">Perguntas frequentes</a>
            <a href="#privacidade">Política de Privacidade</a>
          </div>

        </aside>

        {/* ── Conteúdo principal ── */}
        <div className="profile-content">

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
                {tab.badge !== null && (
                  <span className="profile-tab-badge">{tab.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* ── Aba: Visão Geral ── */}
          {activeTab === 'overview' && (
            <>
              {/* Dados do currículo */}
              <div className="profile-section-card">
                <div className="profile-section-title-bar">
                  <IconLattes />
                  <span>Dados do Currículo</span>
                  <div className="profile-section-actions">
                    <Link to={`/profile/${user.id}/editar`} className="profile-btn-action">
                      <IconEdit />
                      Editar
                    </Link>
                  </div>
                </div>
                <div className="profile-section-body">
                  <div className="profile-cv-info-grid">
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Nome completo</span>
                      <span className="profile-cv-info-value">{user.name}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">CPF</span>
                      <span className="profile-cv-info-value">{user.cpf}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">E-mail</span>
                      <span className="profile-cv-info-value">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Tipo de usuário</span>
                      <span className="profile-cv-info-value">{profileLabel}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">ID Lattes</span>
                      <span className="profile-cv-info-value">{user.lattesId}</span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Status</span>
                      <span className="profile-cv-info-value">
                        <span className={`profile-badge ${user.active ? 'active' : 'inactive'}`}>
                          {user.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </span>
                    </div>
                    <div className="profile-cv-info-item">
                      <span className="profile-cv-info-label">Membro desde</span>
                      <span className="profile-cv-info-value">{user.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Últimas produções */}
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
                  <div className="profile-item-list">
                    {producoes.slice(0, 3).map(p => (
                      <div key={p.id} className="profile-item-entry">
                        <div className="profile-item-icon"><IconArticle /></div>
                        <div className="profile-item-body">
                          <div className="profile-item-title">
                            <a href="#producao">{p.titulo}</a>
                          </div>
                          <div className="profile-item-sub">{p.tipo} · {p.publicacao}</div>
                        </div>
                        <span className="profile-item-year">{p.ano}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formação resumida */}
              <div className="profile-section-card">
                <div className="profile-section-title-bar">
                  <IconGrad />
                  <span>Formação Acadêmica</span>
                  <div className="profile-section-actions">
                    <button className="profile-btn-action" onClick={() => setActiveTab('formacao')}>
                      Ver todas
                    </button>
                  </div>
                </div>
                <div className="profile-section-body">
                  <div className="profile-item-list">
                    {formacoes.slice(0, 2).map(f => (
                      <div key={f.id} className="profile-item-entry">
                        <div className="profile-item-icon"><IconGrad /></div>
                        <div className="profile-item-body">
                          <div className="profile-item-title">{f.titulo}</div>
                          <div className="profile-item-sub">{f.instituicao}</div>
                        </div>
                        <span className="profile-item-year">{f.ano}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Aba: Produções ── */}
          {activeTab === 'producoes' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconArticle />
                <span>Produções Bibliográficas</span>
                <div className="profile-section-actions">
                  <button className="profile-btn-action">
                    <IconPlus />
                    Adicionar
                  </button>
                </div>
              </div>
              <div className="profile-section-body">
                {producoes.length === 0 ? (
                  <div className="profile-empty-state">
                    <IconArticle />
                    <p>Nenhuma produção bibliográfica cadastrada.<br />Adicione sua primeira produção.</p>
                  </div>
                ) : (
                  <div className="profile-item-list">
                    {producoes.map(p => (
                      <div key={p.id} className="profile-item-entry">
                        <div className="profile-item-icon"><IconArticle /></div>
                        <div className="profile-item-body">
                          <div className="profile-item-title">
                            <a href="#producao">{p.titulo}</a>
                          </div>
                          <div className="profile-item-sub">{p.tipo} · {p.publicacao}</div>
                        </div>
                        <span className="profile-item-year">{p.ano}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Aba: Formação ── */}
          {activeTab === 'formacao' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconGrad />
                <span>Formação Acadêmica</span>
                <div className="profile-section-actions">
                  <button className="profile-btn-action">
                    <IconPlus />
                    Adicionar
                  </button>
                </div>
              </div>
              <div className="profile-section-body">
                {formacoes.length === 0 ? (
                  <div className="profile-empty-state">
                    <IconGrad />
                    <p>Nenhuma formação acadêmica cadastrada.<br />Adicione sua formação.</p>
                  </div>
                ) : (
                  <div className="profile-item-list">
                    {formacoes.map(f => (
                      <div key={f.id} className="profile-item-entry">
                        <div className="profile-item-icon"><IconGrad /></div>
                        <div className="profile-item-body">
                          <div className="profile-item-title">{f.titulo}</div>
                          <div className="profile-item-sub">{f.instituicao}</div>
                        </div>
                        <span className="profile-item-year">{f.ano}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Aba: Projetos ── */}
          {activeTab === 'projetos' && (
            <div className="profile-section-card">
              <div className="profile-section-title-bar">
                <IconWork />
                <span>Projetos de Pesquisa</span>
                <div className="profile-section-actions">
                  <button className="profile-btn-action">
                    <IconPlus />
                    Adicionar
                  </button>
                </div>
              </div>
              <div className="profile-section-body">
                <div className="profile-empty-state">
                  <IconWork />
                  <p>Nenhum projeto de pesquisa cadastrado.<br />Adicione seu primeiro projeto.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Ações de rodapé ── */}
          <div style={{ display: 'flex', gap: '1rem', paddingBottom: '0.5rem' }}>
            <Link to="/dashboard" className="profile-btn-secondary">
              ← Voltar ao início
            </Link>
            <Link to={`/profile/${user.id}/editar`} className="profile-btn-primary">
              <IconEdit />
              Editar currículo
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