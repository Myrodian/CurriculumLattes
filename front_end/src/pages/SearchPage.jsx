import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { searchUsers, followUser, unfollowUser } from '../api/api'
import './FeedPage.css'
import './SearchPage.css'
import { IconLattes, IconSearch, IconUser, IconPlus, IconCheck } from '../components/Icons'

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
