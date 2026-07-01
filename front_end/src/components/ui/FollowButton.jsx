import { IconPlus, IconCheck } from '../Icons'

/**
 * Botão de seguir / seguindo. Mantém a classe visual de cada contexto
 * via `className`; alterna o rótulo e o ícone conforme `following`.
 */
export default function FollowButton({ following = false, onClick, className, ...rest }) {
  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {following ? <><IconCheck /> Seguindo</> : <><IconPlus /> Seguir</>}
    </button>
  )
}
