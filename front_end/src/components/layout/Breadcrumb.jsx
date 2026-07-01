import './layout.css'

/**
 * Trilha de navegação "Início › … ›". Recebe uma lista de rótulos.
 * Ex.: <Breadcrumb items={['Início', 'Feed']} />
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <div className="app-breadcrumb">
      {items.filter(Boolean).map((label, i) => (
        <span key={i}>{label}</span>
      ))}
    </div>
  )
}
