import './layout.css'

/** Rodapé padrão da plataforma. */
export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Plataforma Lattes — Conselho Nacional de Desenvolvimento Científico e
        Tecnológico (CNPq) ·{' '}
        <a href="#privacidade">Política de Privacidade</a> ·{' '}
        <a href="#termos">Termos de Uso</a>
      </p>
    </footer>
  )
}
