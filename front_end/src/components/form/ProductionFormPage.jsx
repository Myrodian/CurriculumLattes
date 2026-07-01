import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../layout/Header'
import Breadcrumb from '../layout/Breadcrumb'
import Footer from '../layout/Footer'
import Field from './Field'
import Alert from './Alert'
import SuccessCard from './SuccessCard'
import './form.css'

/* Rotas das telas de produção — usadas para montar a navegação lateral. */
const ALL_FORMS = [
  { key: 'apresentacao',      to: '/apresentacao',      label: 'Apresentação de Trabalho' },
  { key: 'produto',           to: '/produto',           label: 'Produto' },
  { key: 'projeto-ensino',    to: '/projeto-ensino',    label: 'Projeto de Ensino' },
  { key: 'trabalhos-tecnicos', to: '/trabalhos-tecnicos', label: 'Trabalhos Técnicos' },
]

const defaultTransform = (form) => ({ ...form, ano: Number(form.ano) })

/* Agrupa campos "half" consecutivos em linhas de dois. */
function renderFields(fields, form, errors, onChange) {
  const out = []
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]
    const next = fields[i + 1]
    if (f.half && next?.half) {
      out.push(
        <div className="pform-field-row" key={f.name}>
          <Field field={f}    value={form[f.name]}    error={errors[f.name]}    onChange={onChange} />
          <Field field={next} value={form[next.name]} error={errors[next.name]} onChange={onChange} />
        </div>
      )
      i++
    } else {
      out.push(<Field key={f.name} field={f} value={form[f.name]} error={errors[f.name]} onChange={onChange} />)
    }
  }
  return out
}

/**
 * Tela genérica de cadastro de produção acadêmica, dirigida por `config`.
 * Ver os arquivos em src/pages/*Page.jsx para exemplos de configuração.
 */
export default function ProductionFormPage({ config }) {
  const {
    key, breadcrumb, titleBarIcon, titleBarLabel,
    info, intro, successTitle, successText,
    sections, initial, api, transform = defaultTransform,
  } = config

  const [form, setForm]       = useState(initial)
  const [errors, setErrors]   = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itens, setItens]     = useState([])

  const allFields = sections.flatMap(s => s.fields)

  const carregarItens = () => { api.list().then(setItens).catch(() => {}) }
  useEffect(() => { carregarItens() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    for (const f of allFields) {
      const v = (form[f.name] ?? '').toString()
      if (f.required && !v.trim()) {
        e[f.name] = f.requiredMessage || `${f.label} é obrigatório.`
        continue
      }
      if (v.trim() && f.pattern && !f.pattern.re.test(v)) {
        e[f.name] = f.pattern.message
      }
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await api.create(transform(form))
      setSuccess(true)
      carregarItens()
    } catch {
      setErrors({ submit: 'Não foi possível salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const navLinks = ALL_FORMS.filter(f => f.key !== key)

  return (
    <div className="pform-root">
      <Header to="/feed">
        <a href="#sobre">Sobre</a>
        <a href="#ajuda">Ajuda</a>
        <a href="#contato">Contato</a>
      </Header>

      <Breadcrumb items={['Início', 'Produção Acadêmica', breadcrumb]} />

      <main className="pform-main">

        <aside className="pform-info-panel">
          <div className="pform-info-card">
            <h3>{info.title}</h3>
            <p>{info.description}</p>
            <p>Campos marcados com <strong>*</strong> são obrigatórios.</p>
          </div>
          <div className="pform-info-card">
            <h3>Navegação</h3>
            <Link to="/feed">← Voltar ao Feed</Link>
            {navLinks.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div className="pform-info-card">
            <h3>{info.listHeading}</h3>
            {itens.length === 0 ? (
              <p>{info.emptyText}</p>
            ) : (
              <ul className="pform-lista">
                {itens.map(item => (
                  <li key={item.id}>
                    <strong>{item.titulo}</strong>
                    <span>{item.ano} · {info.listSecondary(item)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="pform-form-wrapper">
          <div className="pform-form-card">

            <div className="pform-form-title-bar">
              {titleBarIcon}
              <span>{titleBarLabel}</span>
            </div>

            <div className="pform-form-body">
              {success ? (
                <SuccessCard title={successTitle}>{successText}</SuccessCard>
              ) : (
                <>
                  <p className="pform-form-intro">{intro}</p>

                  <Alert>{errors.submit}</Alert>

                  <form onSubmit={handleSubmit} noValidate>
                    {sections.map(section => (
                      <div key={section.label}>
                        <div className="pform-section-label">{section.label}</div>
                        {renderFields(section.fields, form, errors, handleChange)}
                      </div>
                    ))}

                    <div className="pform-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><span className="pform-spinner" /> Salvando...</> : <>
                          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          Salvar
                        </>}
                      </button>
                      <Link to="/feed" className="btn-secondary">Cancelar</Link>
                    </div>
                  </form>
                </>
              )}
            </div>

            {success && (
              <div className="pform-success-bar">
                <button className="btn-primary" onClick={() => { setForm(initial); setSuccess(false) }}>
                  Cadastrar outro
                </button>
                <Link to="/feed" className="btn-secondary">Voltar ao Feed</Link>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
