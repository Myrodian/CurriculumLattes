import { useState } from 'react'
import { Link } from 'react-router-dom'
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
const IconPlus = () => (
  <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
)
const IconFilter = () => (
  <svg viewBox="0 0 24 24"><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0
    .55.45 1 1 1h2c.55 0 1-.45
    1-1v-6s3.72-4.8 5.74-7.39A1 1 0 0 0
    18.95 4H5.04a1 1 0 0 0-.79 1.61z"/></svg>
)
const IconGitMerge = () => (
  <svg viewBox="0 0 24 24"><path d="M17 3c-1.66 0-3 1.34-3
    3 0 1.31.84 2.42 2 2.83V13c0 .55-.45
    1-1 1H9.83C9.42 12.84 8.31 12 7
    12c-1.66 0-3 1.34-3 3s1.34 3 3 3c1.31
    0 2.42-.84 2.83-2H15c1.65 0 3-1.35
    3-3V8.83C19.16 8.42 20 7.31 20
    6c0-1.66-1.34-3-3-3zM7 16c-.55
    0-1-.45-1-1s.45-1 1-1 1 .45 1
    1-.45 1-1 1zm10-9c-.55 0-1-.45-1-1s.45-1
    1-1 1 .45 1 1-.45 1-1 1z"/></svg>
)
const IconStar = () => (
  <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22
    9.24l-7.19-.61L12 2 9.19 8.63 2
    9.24l5.46 4.73L5.82 21z"/></svg>
)
const IconTrend = () => (
  <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88
    4.88-4-4L2 16.59 3.41 18l6-6 4
    4 6.3-6.29L22 12V6z"/></svg>
)
const IconBook = () => (
  <svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2
    2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9
    2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13
    12V4h5v16z"/></svg>
)
const IconMore = () => (
  <svg viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2
    2 2-.9 2-2-.9-2-2-2zm12 0c-1.1
    0-2 .9-2 2s.9 2 2 2 2-.9
    2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9
    2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
)
const IconClose = () => (
  <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5
    6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59
    19 19 17.59 13.41 12z"/></svg>
)
const IconSmile = () => (
  <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10
    9.99 10C17.52 22 22 17.52 22 12S17.52
    2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8
    8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83
    0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14
    8.67 14 9.5s.67 1.5 1.5 1.5zm-7
    0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7
    8.67 7 9.5 7.67 11 8.5 11zm3.5
    6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8
    2.04 2.78 3.5 5.11 3.5z"/></svg>
)
const IconSend = () => (
  <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2
    10l15 2-15 2z"/></svg>
)
const IconIssue = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10
    10 10-4.48 10-10S17.52 2 12 2zm1
    15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
)
const IconPR = () => (
  <svg viewBox="0 0 24 24"><path d="M17 3c-1.66 0-3 1.34-3 3 0 1.31.84
    2.42 2 2.83v1.67c0 2.21-1.79 4-4
    4H9.83C9.42 13.16 8.31 12 7 12c-1.66
    0-3 1.34-3 3s1.34 3 3 3c1.31 0 2.42-.84
    2.83-2H12c3.31 0 6-2.69
    6-6V8.83C19.16 8.42 20 7.31 20 6c0-1.66-1.34-3-3-3zM7
    16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1
    1-.45 1-1 1zm10-9c-.55 0-1-.45-1-1s.45-1
    1-1 1 .45 1 1-.45 1-1 1z"/></svg>
)

/* ════════════════════════════
   MOCK DATA
════════════════════════════ */
const MOCK_CURRICULOS = [
  { id: 1, name: 'Myrodian/CurriculumLattes', icon: null },
  { id: 2, name: 'Myrodian/back_end', icon: null },
  { id: 3, name: 'Myrodian/Trab_Distribuidora', icon: null },
  { id: 4, name: 'LuisFernando/Heuristicas-CVRP', icon: null },
  { id: 5, name: 'Myrodian/Compilador_Toy', icon: null },
  { id: 6, name: 'Myrodian/compiler_miniC', icon: null },
]

const MOCK_FEED = [
  {
    id: 1,
    actor: 'LuisFernandoAlmeidaNunes',
    actorId: 1,
    verb: 'contributed to',
    repo: 'Myrodian/CurriculumLattes',
    repoId: 1,
    time: '2 horas atrás',
    title: 'Atualizacao gitignore #3',
    titleLink: '#pr-3',
    badge: 'merged',
    badgeLabel: 'Mesclado',
    description: 'LuisFernandoAlmeida... merged 3 commits',
    type: 'pr',
  },
  {
    id: 2,
    actor: 'LuisFernandoAlmeidaNunes',
    actorId: 1,
    verb: 'contributed to',
    repo: 'Myrodian/CurriculumLattes',
    repoId: 1,
    time: '2 horas atrás',
    title: 'Edicao de bd #2',
    titleLink: '#pr-2',
    badge: 'merged',
    badgeLabel: 'Mesclado',
    description: 'LuisFernandoAlmeida... merged 2 commits',
    type: 'pr',
  },
  {
    id: 3,
    actor: 'MariasilvaUSP',
    actorId: 2,
    verb: 'opened issue in',
    repo: 'Myrodian/back_end',
    repoId: 2,
    time: '5 horas atrás',
    title: 'Erro 500 ao cadastrar novo usuário #8',
    titleLink: '#issue-8',
    badge: 'open',
    badgeLabel: 'Aberta',
    description: 'Ao tentar cadastrar via POST /api/users, o servidor retorna 500 sem mensagem de erro.',
    type: 'issue',
  },
  {
    id: 4,
    actor: 'CarlosOliveira',
    actorId: 3,
    verb: 'starred',
    repo: 'Myrodian/CurriculumLattes',
    repoId: 1,
    time: 'Ontem',
    title: 'Adicionou estrela ao currículo',
    titleLink: '#',
    badge: null,
    badgeLabel: null,
    description: 'CarlosOliveira marcou o repositório como favorito.',
    type: 'star',
  },
]

const MOCK_TRENDING = [
  {
    id: 1,
    org: 'microsoft',
    name: 'microsoft/markitdown',
    desc: 'Ferramenta Python para converter documentos e arquivos do Office em Markdown.',
    stars: '42.1k',
  },
  {
    id: 2,
    org: 'cnpq',
    name: 'cnpq/lattes-api',
    desc: 'API oficial para integração com a Plataforma Lattes.',
    stars: '1.3k',
  },
  {
    id: 3,
    org: 'fapesp',
    name: 'fapesp/pesquisa-tools',
    desc: 'Conjunto de ferramentas para gestão de projetos de pesquisa.',
    stars: '890',
  },
]

const MOCK_CHANGELOG = [
  {
    id: 1,
    isNew: true,
    date: 'Ontem',
    text: 'Nova API de exportação do currículo em PDF disponível.',
  },
  {
    id: 2,
    isNew: true,
    date: '2 dias atrás',
    text: 'Integração com o sistema de bolsas do CNPq atualizada.',
  },
  {
    id: 3,
    isNew: false,
    date: '3 dias atrás',
    text: 'Correção no módulo de formação acadêmica — campos de data agora aceitam meses futuros.',
  },
  {
    id: 4,
    isNew: false,
    date: '5 dias atrás',
    text: 'Melhorias de desempenho na busca de currículos por área temática.',
  },
]

/* ════════════════════════════
   COMPONENTES INTERNOS
════════════════════════════ */
function ActivityCard({ item }) {
  const [reacted, setReacted] = useState(false)

  return (
    <div className="feed-activity-card">
      <div className="feed-activity-header">
        <div className="feed-activity-actor">
          <div className="feed-activity-avatar">
            <IconUser />
            <div className="feed-activity-avatar-badge">
              {item.type === 'pr'    && <IconGitMerge />}
              {item.type === 'issue' && <IconIssue />}
              {item.type === 'star'  && <IconStar />}
            </div>
          </div>
          <div className="feed-activity-meta">
            <div className="feed-activity-meta-top">
              <a href={`#user-${item.actorId}`}>{item.actor}</a>
              {' '}{item.verb}{' '}
              <a href={`#repo-${item.repoId}`} className="feed-repo-link">{item.repo}</a>
            </div>
            <span className="feed-activity-time">{item.time}</span>
          </div>
        </div>
        <button className="feed-activity-more-btn" title="Mais opções" aria-label="Mais opções">
          <IconMore />
        </button>
      </div>

      <div className="feed-activity-body">
        <div className="feed-activity-title">
          <a href={item.titleLink}>{item.title}</a>
        </div>

        {item.badge && (
          <div className="feed-activity-badges">
            <span className={`feed-badge ${item.badge}`}>
              {item.type === 'pr'    && <IconGitMerge />}
              {item.type === 'issue' && <IconIssue />}
              {item.badgeLabel}
            </span>
          </div>
        )}

        <p className="feed-activity-description">{item.description}</p>
      </div>

      <div className="feed-activity-footer">
        <button
          className="feed-reaction-btn"
          onClick={() => setReacted(r => !r)}
          title="Reagir"
          aria-label="Reagir"
        >
          <IconSmile />
          {reacted && <span>👍 1</span>}
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════ */
export default function FeedPage() {
  const [search, setSearch]         = useState('')
  const [noticeVisible, setNotice]  = useState(true)
  const [repoSearch, setRepoSearch] = useState('')

  const filteredRepos = MOCK_CURRICULOS.filter(r =>
    r.name.toLowerCase().includes(repoSearch.toLowerCase())
  )

  return (
    <div className="feed-root">

      {/* ── Header ── */}
      <header className="feed-header">
        <div className="feed-header-logo">
          <div className="feed-header-icon">
            <IconLattes />
          </div>
          <div className="feed-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>

        <div className="feed-header-center">
          <div className="feed-header-search-wrap">
            <IconSearch />
            <input
              className="feed-header-search"
              type="search"
              placeholder="Buscar currículos, pesquisadores..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Buscar"
            />
          </div>
        </div>

        <nav className="feed-header-nav">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
          <Link to="/perfil/1" className="feed-header-avatar" title="Meu perfil" aria-label="Meu perfil">
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

        {/* ════ COLUNA ESQUERDA ════ */}
        <aside className="feed-left">

          {/* Currículos recentes */}
          <div className="feed-side-card">
            <div className="feed-side-card-header">
              <h3>Meus currículos</h3>
              <Link to="/curriculo/novo" className="feed-side-card-btn">
                <IconPlus />
                Novo
              </Link>
            </div>

            <div className="feed-search-input-wrap">
              <div className="feed-search-input-inner">
                <IconSearch />
                <input
                  className="feed-search-input"
                  type="search"
                  placeholder="Buscar currículo..."
                  value={repoSearch}
                  onChange={e => setRepoSearch(e.target.value)}
                  aria-label="Buscar currículo"
                />
              </div>
            </div>

            <div className="feed-repo-list">
              {filteredRepos.map(repo => (
                <Link key={repo.id} to={`/perfil/${repo.id}`} className="feed-repo-item">
                  <div className="feed-repo-item-icon">
                    <IconDoc />
                  </div>
                  <span className="feed-repo-item-name">{repo.name}</span>
                </Link>
              ))}
            </div>

            <button className="feed-side-show-more">
              Mostrar mais →
            </button>
          </div>

        </aside>

        {/* ════ COLUNA CENTRAL ════ */}
        <div className="feed-center">

          {/* Caixa de ação */}
          <div className="feed-action-box">
            <div className="feed-action-box-title">Início</div>

            <div className="feed-action-input-row">
              <input
                className="feed-action-input"
                type="text"
                placeholder="Buscar ou digitar @ para adicionar contexto"
                aria-label="Campo de busca principal"
              />
              <button className="feed-action-send" title="Enviar" aria-label="Enviar">
                <IconSend />
              </button>
            </div>

            <div className="feed-action-shortcuts">
              <Link to="/curriculo/novo" className="feed-shortcut-btn">
                <IconDoc />
                Novo currículo
              </Link>
              <Link to="/producoes/nova" className="feed-shortcut-btn">
                <IconIssue />
                Nova produção
              </Link>
              <Link to="/busca" className="feed-shortcut-btn">
                <IconSearch />
                Buscar
              </Link>
              <Link to="/solicitacoes" className="feed-shortcut-btn">
                <IconPR />
                Solicitações
              </Link>
            </div>
          </div>

          {/* Cabeçalho do feed */}
          <div className="feed-list-header">
            <h2>Feed de atividades</h2>
            <button className="feed-filter-btn">
              <IconFilter />
              Filtrar
            </button>
          </div>

          {/* Cards de atividade */}
          {MOCK_FEED.map(item => (
            <ActivityCard key={item.id} item={item} />
          ))}

          {/* Repositórios em alta */}
          <div className="feed-trending-card">
            <div className="feed-trending-header">
              <div className="feed-trending-header-left">
                <IconTrend />
                Currículos em destaque
              </div>
              <a href="#destaque" className="feed-trending-see-more">Ver mais</a>
            </div>

            {MOCK_TRENDING.map(t => (
              <div key={t.id} className="feed-trending-item">
                <div className="feed-trending-icon">
                  <IconBook />
                </div>
                <div className="feed-trending-info">
                  <a href={`#trending-${t.id}`} className="feed-trending-name">{t.name}</a>
                  <p className="feed-trending-desc">{t.desc}</p>
                </div>
                <button className="feed-trending-star-btn">
                  <IconStar />
                  Destacar
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* ════ COLUNA DIREITA ════ */}
        <aside className="feed-right">

          {/* Card de aviso */}
          {noticeVisible && (
            <div className="feed-notice-card">
              <button
                className="feed-notice-close"
                onClick={() => setNotice(false)}
                title="Fechar"
                aria-label="Fechar aviso"
              >
                <IconClose />
              </button>
              <div className="feed-notice-title">Aprenda. Colabore. Cresça.</div>
              <p className="feed-notice-body">
                A Plataforma Lattes oferece ferramentas e suporte para que pesquisadores
                transformem desafios científicos em oportunidades. Seu futuro na pesquisa começa aqui!
              </p>
              <a href="#saiba-mais" className="feed-notice-link">Saiba mais</a>
            </div>
          )}

          {/* Changelog / novidades */}
          <div className="feed-changelog-card">
            <div className="feed-changelog-header">Últimas atualizações</div>

            <div className="feed-changelog-list">
              {MOCK_CHANGELOG.map(item => (
                <div key={item.id} className="feed-changelog-item">
                  <div className={`feed-changelog-dot${item.isNew ? ' new' : ''}`} />
                  <div className="feed-changelog-info">
                    <div className="feed-changelog-date">{item.date}</div>
                    <div className="feed-changelog-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="feed-changelog-footer">
              <a href="#changelog">Ver histórico completo →</a>
            </div>
          </div>

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