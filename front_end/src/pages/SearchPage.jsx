import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { searchUsers, followUser, unfollowUser } from '../api/api'
import './FeedPage.css'
import './SearchPage.css'

const IconLattes = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
    10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
)
const IconSearch = () => (
  <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0
    16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5
    4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14
    7.01 14 9.5 11.99 14 9.5 14z"/></svg>
)
const IconUser = () => (
  <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7
    2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2
    0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
)

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const { user, isAuthenticated } = useAuth()

  const [q, setQ] = useState(params.get('q') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const term = params.get('q') || ''
    setQ(term)
    setLoading(true)
    setSearched(true)
    searchUsers(term)
      .then(r => setResults(r || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [params])

  const submit = (e) => {
    e.preventDefault()
    setParams(q.trim() ? { q: q.trim() } : {})
  }

  const toggleFollow = async (u) => {
    try {
      if (u.following) await unfollowUser(u.id)
      else await followUser(u.id)
      setResults(rs => rs.map(r => (r.id === u.id ? { ...r, following: !r.following } : r)))
    } catch { /* silencioso */ }
  }

  return (
    <div className="feed-root">

      {/* ── Header ── */}
      <header className="feed-header">
        <Link to={isAuthenticated ? '/feed' : '/login'} className="feed-header-logo" style={{ textDecoration: 'none' }}>
          <div className="feed-header-icon"><IconLattes /></div>
          <div className="feed-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </Link>

        <nav className="feed-header-nav">
          {isAuthenticated ? (
            <>
              <Link to="/feed">Feed</Link>
              <Link to={user?.id ? `/perfil/${user.id}` : '/feed'} className="feed-header-avatar" title="Meu perfil">
                <IconUser />
              </Link>
            </>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </nav>
      </header>

      <div className="feed-subheader">
        <span>Início</span>
        <span>Buscar currículos</span>
      </div>

      {/* ── Conteúdo ── */}
      <main className="search-main">
        <h1 className="search-title">Buscar currículos</h1>
        <p className="search-sub">
          Encontre pesquisadores pelo nome. A busca é pública — você não precisa estar logado.
        </p>

        <form className="search-bar" onSubmit={submit}>
          <input
            type="search"
            placeholder="Digite o nome do pesquisador..."
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
            aria-label="Buscar currículos"
          />
          <button type="submit"><IconSearch /> Buscar</button>
        </form>

        {loading ? (
          <div className="feed-loading-row"><span className="feed-spinner" /> Buscando...</div>
        ) : results.length === 0 ? (
          <div className="search-empty">
            {searched
              ? 'Nenhum currículo encontrado. Tente outro nome.'
              : 'Digite um nome para começar a busca.'}
          </div>
        ) : (
          <div className="search-results">
            {results.map(u => (
              <div key={u.id} className="search-result">
                <div className="search-result-avatar"><IconUser /></div>
                <div className="search-result-info">
                  <Link to={`/perfil/${u.id}`} className="search-result-name">{u.name}</Link>
                  <div className="search-result-inst">{u.institutionName || 'Pesquisador(a)'}</div>
                </div>
                {isAuthenticated && user?.id !== u.id && (
                  <button
                    className={`search-follow-btn${u.following ? ' following' : ''}`}
                    onClick={() => toggleFollow(u)}
                  >
                    {u.following ? <><IconCheck /> Seguindo</> : <><IconPlus /> Seguir</>}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

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
