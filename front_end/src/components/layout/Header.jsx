import { Link } from 'react-router-dom'
import { IconLattes } from '../Icons'
import './layout.css'

/**
 * Barra superior azul com o logo "Plataforma Lattes".
 * - `to`: destino ao clicar no logo (padrão /feed).
 * - `center`: conteúdo central opcional (ex.: barra de busca).
 * - `children`: links/itens da navegação à direita.
 */
export default function Header({ to = '/feed', center, children }) {
  return (
    <header className="app-header">
      <Link to={to} className="app-header-logo">
        <div className="app-header-icon"><IconLattes /></div>
        <div className="app-header-brand">
          <span>Plataforma</span>
          <span>Lattes</span>
        </div>
      </Link>

      {center && <div className="app-header-center">{center}</div>}

      {children && <nav className="app-header-nav">{children}</nav>}
    </header>
  )
}
