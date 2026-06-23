import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getFeed, getFollowing, getSuggestions, followUser } from '../api/api'
import './FeedPage.css'

/* ════════════════════════════
   ÍCONES
════════════════════════════ */
const IconLattes = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
    10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
)
const IconSearch = () => (
  <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0
    16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59
    4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6
    0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14
    9.5 11.99 14 9.5 14z"/></svg>
)
const IconUser = () => (
  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7
    2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2
    0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
)
const IconDoc = () => (
  <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2
    2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9
    2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
)
const IconBook = () => (
  <svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2
    2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9
    2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13
    12V4h5v16z"/></svg>
)
const IconTool = () => (
  <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9
    6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9
    1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
)
const IconTrend = () => (
  <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88
    4.88-4-4L2 16.59 3.41 18l6-6 4
    4 6.3-6.29L22 12V6z"/></svg>
)

/* ════════════════════════════
   METADADOS POR TIPO DE PRODUÇÃO
════════════════════════════ */
const TYPE_META = {
  APRESENTACAO:    { label: 'Apresentação',     verb: 'publicou uma apresentação',   badge: 'open',   Icon: IconDoc },
  PRODUTO:         { label: 'Produto',          verb: 'cadastrou um produto',        badge: 'merged', Icon: IconTool },
  PROJETO_ENSINO:  { label: 'Projeto de Ensino', verb: 'criou um projeto de ensino', badge: 'open',   Icon: IconBook },
  TRABALHO_TECNICO:{ label: 'Trabalho Técnico', verb: 'registrou um trabalho técnico', badge: 'closed', Icon: IconTool },
}

function timeAgo(iso) {
  if (!iso) return ''
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return 'agora mesmo'
  const min = Math.floor(diff / 60)
  if (min < 60) return `há ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `há ${h} h`
  const d = Math.floor(h / 24)
  if (d < 30) return `há ${d} dia${d > 1 ? 's' : ''}`
  const meses = Math.floor(d / 30)
  if (meses < 12) return `há ${meses} ${meses > 1 ? 'meses' : 'mês'}`
  return `há ${Math.floor(meses / 12)} ano(s)`
}

/* ════════════════════════════
   CARD DE ATIVIDADE
════════════════════════════ */
function ActivityCard({ item }) {
  const meta = TYPE_META[item.type] || { label: 'Atividade', verb: 'publicou', badge: 'closed', Icon: IconDoc }
  const Icon = meta.Icon

  return (
    <div className="feed-activity-card">
      <div className="feed-activity-header">
        <div className="feed-activity-actor">
          <div className="feed-activity-avatar">
            <IconUser />
            <div className="feed-activity-avatar-badge"><Icon /></div>
          </div>
          <div className="feed-activity-meta">
            <div className="feed-activity-meta-top">
              <Link to={`/perfil/${item.authorId}`}>{item.authorName || 'Usuário'}</Link>
              {' '}{meta.verb}
            </div>
            <span className="feed-activity-time">{timeAgo(item.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="feed-activity-body">
        <div className="feed-activity-title">
          <Link to={`/perfil/${item.authorId}`}>{item.titulo}</Link>
        </div>
        <div className="feed-activity-badges">
          <span className={`feed-badge ${meta.badge}`}><Icon />{meta.label}</span>
          {item.ano && <span className="feed-badge closed">{item.ano}</span>}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════ */
export default function FeedPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [search, setSearch]           = useState('')
  const [feed, setFeed]               = useState([])
  const [following, setFollowing]     = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading]         = useState(true)
  const [noticeVisible, setNotice]    = useState(true)

  const carregar = () => {
    setLoading(true)
    Promise.all([
      getFeed().catch(() => []),
      getFollowing().catch(() => []),
      getSuggestions().catch(() => []),
    ])
      .then(([f, fo, su]) => {
        setFeed(f || [])
        setFollowing(fo || [])
        setSuggestions(su || [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { carregar() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/busca?q=${encodeURIComponent(search.trim())}`)
  }

  const handleFollow = async (id) => {
    try {
      await followUser(id)
      carregar()
    } catch { /* silencioso */ }
  }

  const perfilLink = user?.id ? `/perfil/${user.id}` : '/busca'

  return (
    <div className="feed-root">

      {/* ── Header ── */}
      <header className="feed-header">
        <div className="feed-header-logo">
          <div className="feed-header-icon"><IconLattes /></div>
          <div className="feed-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>

        <div className="feed-header-center">
          <form className="feed-header-search-wrap" onSubmit={handleSearch}>
            <IconSearch />
            <input
              className="feed-header-search"
              type="search"
              placeholder="Buscar currículos, pesquisadores..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Buscar"
            />
          </form>
        </div>

        <nav className="feed-header-nav">
          <Link to="/busca">Buscar</Link>
          <a href="#ajuda">Ajuda</a>
          <Link to={perfilLink} className="feed-header-avatar" title="Meu perfil" aria-label="Meu perfil">
            <IconUser />
          </Link>
        </nav>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="feed-subheader">
        <span>Início</span>
        <span>Feed</span>
      </div>

      {/* ── Layout principal ── */}
      <main className="feed-main">

        {/* ════ COLUNA ESQUERDA — quem você segue ════ */}
        <aside className="feed-left">
          <div className="feed-side-card">
            <div className="feed-side-card-header">
              <h3>Quem você segue</h3>
              <Link to="/busca" className="feed-side-card-btn">
                <IconPlus />
                Seguir
              </Link>
            </div>

            {following.length === 0 ? (
              <div style={{ padding: '0.9rem 1rem', fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.5 }}>
                Você ainda não segue ninguém.{' '}
                <Link to="/busca" style={{ color: 'var(--blue-700)' }}>Busque currículos</Link> para acompanhar.
              </div>
            ) : (
              <div className="feed-repo-list">
                {following.map(u => (
                  <Link key={u.id} to={`/perfil/${u.id}`} className="feed-repo-item">
                    <div className="feed-repo-item-icon"><IconUser /></div>
                    <span className="feed-repo-item-name">{u.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ════ COLUNA CENTRAL — feed ════ */}
        <div className="feed-center">

          {/* Atalhos de criação */}
          <div className="feed-action-box">
            <div className="feed-action-box-title">
              Olá, {user?.name ? user.name.split(' ')[0] : 'pesquisador'} 👋
            </div>
            <div className="feed-action-shortcuts">
              <Link to="/apresentacao" className="feed-shortcut-btn"><IconDoc /> Nova apresentação</Link>
              <Link to="/produto" className="feed-shortcut-btn"><IconTool /> Novo produto</Link>
              <Link to="/projeto-ensino" className="feed-shortcut-btn"><IconBook /> Projeto de ensino</Link>
              <Link to="/trabalhos-tecnicos" className="feed-shortcut-btn"><IconTool /> Trabalho técnico</Link>
            </div>
          </div>

          <div className="feed-list-header">
            <h2>Feed de atividades</h2>
          </div>

          {loading ? (
            <div className="feed-loading-row">
              <span className="feed-spinner" /> Carregando feed...
            </div>
          ) : feed.length === 0 ? (
            <div className="feed-activity-card">
              <div className="feed-activity-body" style={{ padding: '1.5rem 1rem' }}>
                <div className="feed-activity-title">Seu feed está vazio</div>
                <p className="feed-activity-description">
                  Você ainda não segue ninguém ou as pessoas que você segue não publicaram nada.
                  Busque currículos e comece a seguir pesquisadores para ver as atualizações aqui.
                </p>
                <div style={{ marginTop: 12 }}>
                  <Link to="/busca" className="feed-side-card-btn"><IconSearch /> Buscar currículos</Link>
                </div>
              </div>
            </div>
          ) : (
            feed.map(item => <ActivityCard key={`${item.type}-${item.id}`} item={item} />)
          )}
        </div>

        {/* ════ COLUNA DIREITA ════ */}
        <aside className="feed-right">

          {/* Sugestões para seguir */}
          <div className="feed-trending-card">
            <div className="feed-trending-header">
              <div className="feed-trending-header-left">
                <IconTrend />
                Sugestões para seguir
              </div>
            </div>

            {suggestions.length === 0 ? (
              <div style={{ padding: '0.9rem 1rem', fontSize: 12, color: 'var(--gray-500)' }}>
                Nenhuma sugestão no momento.
              </div>
            ) : (
              suggestions.map(s => (
                <div key={s.id} className="feed-trending-item">
                  <div className="feed-trending-icon"><IconUser /></div>
                  <div className="feed-trending-info">
                    <Link to={`/perfil/${s.id}`} className="feed-trending-name">{s.name}</Link>
                    <p className="feed-trending-desc">{s.institutionName || 'Pesquisador(a)'}</p>
                  </div>
                  <button className="feed-trending-star-btn" onClick={() => handleFollow(s.id)}>
                    <IconPlus />
                    Seguir
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Card de aviso */}
          {noticeVisible && (
            <div className="feed-notice-card">
              <button
                className="feed-notice-close"
                onClick={() => setNotice(false)}
                title="Fechar"
                aria-label="Fechar aviso"
              >
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
              <div className="feed-notice-title">Aprenda. Colabore. Cresça.</div>
              <p className="feed-notice-body">
                Siga outros pesquisadores para acompanhar, em tempo real, as produções
                acadêmicas mais recentes de quem importa para a sua área.
              </p>
              <Link to="/busca" className="feed-notice-link">Encontrar pesquisadores</Link>
            </div>
          )}

        </aside>

      </main>

      {/* ── Footer ── */}
      <footer className="feed-footer">
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
