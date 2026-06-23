import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createApresentacao, getMinhasApresentacoes } from '../api/api'
import './ApresentacaoPage.css'

const TIPO_EVENTO_OPTIONS = [
  { value: '', label: 'Selecione o tipo de evento' },
  { value: 'congresso', label: 'Congresso' },
  { value: 'simposio', label: 'Simpósio' },
  { value: 'palestra', label: 'Palestra' },
]

const NATUREZA_OPTIONS = [
  { value: '', label: 'Selecione a natureza' },
  { value: 'oral', label: 'Oral' },
  { value: 'poster', label: 'Pôster' },
  { value: 'conferencia', label: 'Conferência' },
]

const INITIAL = {
  titulo: '', ano: '', autores: '', descricao: '',
  tipoEvento: '', nomeEvento: '', localEvento: '', natureza: '',
}

export default function ApresentacaoPage() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itens, setItens] = useState([])
  const navigate = useNavigate()

  const carregarItens = () => {
    getMinhasApresentacoes().then(setItens).catch(() => {})
  }

  useEffect(() => { carregarItens() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.titulo.trim()) e.titulo = 'Título é obrigatório.'
    if (!form.ano) e.ano = 'Ano é obrigatório.'
    else if (!/^\d{4}$/.test(form.ano)) e.ano = 'Informe um ano válido (YYYY).'
    if (!form.autores.trim()) e.autores = 'Autores é obrigatório.'
    if (!form.descricao.trim()) e.descricao = 'Descrição é obrigatória.'
    if (!form.tipoEvento) e.tipoEvento = 'Tipo de evento é obrigatório.'
    if (!form.nomeEvento.trim()) e.nomeEvento = 'Nome do evento é obrigatório.'
    if (!form.natureza) e.natureza = 'Natureza é obrigatória.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await createApresentacao({ ...form, ano: Number(form.ano) })
      setSuccess(true)
      carregarItens()
    } catch {
      setErrors({ submit: 'Não foi possível salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="apresentacao-root">

      <header className="apresentacao-header">
        <div className="apresentacao-header-logo">
          <div className="apresentacao-header-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <div className="apresentacao-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="apresentacao-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <div className="apresentacao-subheader">
        <span>Início</span>
        <span>Produção Acadêmica</span>
        <span>Apresentação</span>
      </div>

      <main className="apresentacao-main">

        <aside className="apresentacao-info-panel">
          <div className="apresentacao-info-card">
            <h3>Apresentação de </h3>
            <p>Registre suas apresentações em congressos, simpósios e palestras.</p>
            <p>Preencha todos os campos obrigatórios marcados com <strong>*</strong>.</p>
          </div>
          <div className="apresentacao-info-card">
            <h3>Navegação</h3>
            <Link to="/feed">← Voltar ao Feed</Link>
            <Link to="/produto">Produto</Link>
            <Link to="/projeto-ensino">Projeto de Ensino</Link>
            <Link to="/trabalhos-tecnicos">Trabalhos Técnicos</Link>
          </div>
          <div className="apresentacao-info-card">
            <h3>Minhas apresentações</h3>
            {itens.length === 0 ? (
              <p>Nenhuma apresentação cadastrada ainda.</p>
            ) : (
              <ul className="apresentacao-lista">
                {itens.map(item => (
                  <li key={item.id}>
                    <strong>{item.titulo}</strong>
                    <span>{item.ano} · {item.nomeEvento}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="apresentacao-form-wrapper">
          <div className="apresentacao-form-card">

            <div className="apresentacao-form-title-bar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
              <span>Apresentação</span>
            </div>

            <div className="apresentacao-form-body">
              {success ? (
                <div className="apresentacao-success">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/>
                  </svg>
                  <div>
                    <strong>Cadastro realizado com sucesso!</strong>
                    <p>Apresentação registrada na plataforma.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="apresentacao-form-intro">
                    Preencha os dados da apresentação de  ou palestra.
                    Campos marcados com <strong>*</strong> são obrigatórios.
                  </p>

                  {errors.submit && (
                    <div className="apresentacao-alert error" role="alert">
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>

                    <div className="apresentacao-section-label">Dados Gerais</div>

                    <div className="apresentacao-field">
                      <label htmlFor="titulo">Título <span>*</span></label>
                      <input id="titulo" name="titulo" type="text" value={form.titulo}
                        onChange={handleChange} placeholder="Título da apresentação"
                        className={errors.titulo ? 'apresentacao-input-error' : ''} />
                      {errors.titulo && <span className="apresentacao-field-error">{errors.titulo}</span>}
                    </div>

                    <div className="apresentacao-field-row">
                      <div className="apresentacao-field">
                        <label htmlFor="ano">Ano <span>*</span></label>
                        <input id="ano" name="ano" type="number" value={form.ano}
                          onChange={handleChange} placeholder="YYYY"
                          min="1900" max={new Date().getFullYear()}
                          className={errors.ano ? 'apresentacao-input-error' : ''} />
                        {errors.ano && <span className="apresentacao-field-error">{errors.ano}</span>}
                      </div>
                      <div className="apresentacao-field">
                        <label htmlFor="autores">Autores <span>*</span></label>
                        <input id="autores" name="autores" type="text" value={form.autores}
                          onChange={handleChange} placeholder="Autores separados por vírgula"
                          className={errors.autores ? 'apresentacao-input-error' : ''} />
                        {errors.autores && <span className="apresentacao-field-error">{errors.autores}</span>}
                      </div>
                    </div>

                    <div className="apresentacao-field">
                      <label htmlFor="descricao">Descrição <span>*</span></label>
                      <textarea id="descricao" name="descricao" value={form.descricao}
                        onChange={handleChange} placeholder="Descreva a apresentação" rows={3}
                        className={errors.descricao ? 'apresentacao-input-error' : ''} />
                      {errors.descricao && <span className="apresentacao-field-error">{errors.descricao}</span>}
                    </div>

                    <div className="apresentacao-section-label">Detalhamento</div>

                    <div className="apresentacao-field-row">
                      <div className="apresentacao-field">
                        <label htmlFor="tipoEvento">Tipo de Evento <span>*</span></label>
                        <select id="tipoEvento" name="tipoEvento" value={form.tipoEvento}
                          onChange={handleChange}
                          className={errors.tipoEvento ? 'apresentacao-input-error' : ''}>
                          {TIPO_EVENTO_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.tipoEvento && <span className="apresentacao-field-error">{errors.tipoEvento}</span>}
                      </div>
                      <div className="apresentacao-field">
                        <label htmlFor="natureza">Natureza <span>*</span></label>
                        <select id="natureza" name="natureza" value={form.natureza}
                          onChange={handleChange}
                          className={errors.natureza ? 'apresentacao-input-error' : ''}>
                          {NATUREZA_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.natureza && <span className="apresentacao-field-error">{errors.natureza}</span>}
                      </div>
                    </div>

                    <div className="apresentacao-field">
                      <label htmlFor="nomeEvento">Nome do Evento <span>*</span></label>
                      <input id="nomeEvento" name="nomeEvento" type="text" value={form.nomeEvento}
                        onChange={handleChange} placeholder="Nome do congresso, simpósio ou palestra"
                        className={errors.nomeEvento ? 'apresentacao-input-error' : ''} />
                      {errors.nomeEvento && <span className="apresentacao-field-error">{errors.nomeEvento}</span>}
                    </div>

                    <div className="apresentacao-field">
                      <label htmlFor="localEvento">Local do Evento</label>
                      <input id="localEvento" name="localEvento" type="text" value={form.localEvento}
                        onChange={handleChange} placeholder="Cidade, estado ou país do evento" />
                    </div>

                    <div className="apresentacao-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><span className="apresentacao-spinner" /> Salvando...</> : <>
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
              <div className="apresentacao-success-bar">
                <button className="btn-primary" onClick={() => { setForm(INITIAL); setSuccess(false) }}>
                  Cadastrar outra
                </button>
                <Link to="/feed" className="btn-secondary">Voltar ao Feed</Link>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="apresentacao-footer">
        <p>Plataforma Lattes — CNPq · <a href="#privacidade">Política de Privacidade</a> · <a href="#termos">Termos de Uso</a></p>
      </footer>

    </div>
  )
}
