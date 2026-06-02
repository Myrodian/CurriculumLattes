import { useState } from 'react'
import { Link } from 'react-router-dom'
import './TrabalhosTecnicosPage.css'

const TIPO_TRABALHO_OPTIONS = [
  { value: '', label: 'Selecione o tipo de trabalho' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'relatorio', label: 'Relatório' },
  { value: 'assessoria', label: 'Assessoria' },
]

const NATUREZA_OPTIONS = [
  { value: '', label: 'Selecione a natureza' },
  { value: 'servico', label: 'Serviço' },
  { value: 'produto', label: 'Produto' },
  { value: 'processo', label: 'Processo' },
]

const INITIAL = {
  titulo: '', ano: '', autores: '', descricao: '',
  tipoTrabalho: '', instituicaoContratante: '', numeroContrato: '', natureza: '',
}

export default function TrabalhosTecnicosPage() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

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
    if (!form.tipoTrabalho) e.tipoTrabalho = 'Tipo de trabalho é obrigatório.'
    if (!form.natureza) e.natureza = 'Natureza é obrigatória.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      console.log('Trabalho Técnico:', form)
      setSuccess(true)
    } catch {
      setErrors({ submit: 'Não foi possível salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="trabalhos-tecnicos-root">

      <header className="trabalhos-tecnicos-header">
        <div className="trabalhos-tecnicos-header-logo">
          <div className="trabalhos-tecnicos-header-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          </div>
          <div className="trabalhos-tecnicos-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="trabalhos-tecnicos-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <div className="trabalhos-tecnicos-subheader">
        <span>Início</span>
        <span>Produção Acadêmica</span>
        <span>Trabalhos Técnicos</span>
      </div>

      <main className="trabalhos-tecnicos-main">

        <aside className="trabalhos-tecnicos-info-panel">
          <div className="trabalhos-tecnicos-info-card">
            <h3>Trabalhos Técnicos</h3>
            <p>Registre consultorias, relatórios e assessorias técnicas realizadas.</p>
            <p>Campos marcados com <strong>*</strong> são obrigatórios.</p>
          </div>
          <div className="trabalhos-tecnicos-info-card">
            <h3>Navegação</h3>
            <Link to="/feed">← Voltar ao Feed</Link>
            <Link to="/apresentacao-trabalho-palestra">Apresentação de Trabalho</Link>
            <Link to="/produto">Produto</Link>
            <Link to="/projeto-ensino">Projeto de Ensino</Link>
          </div>
        </aside>

        <div className="trabalhos-tecnicos-form-wrapper">
          <div className="trabalhos-tecnicos-form-card">

            <div className="trabalhos-tecnicos-form-title-bar">
              <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
              <span>Trabalhos Técnicos</span>
            </div>

            <div className="trabalhos-tecnicos-form-body">
              {success ? (
                <div className="trabalhos-tecnicos-success">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>
                  <div>
                    <strong>Trabalho técnico cadastrado com sucesso!</strong>
                    <p>O trabalho foi registrado na plataforma.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="trabalhos-tecnicos-form-intro">
                    Preencha os dados do trabalho técnico. Campos com <strong>*</strong> são obrigatórios.
                  </p>

                  {errors.submit && (
                    <div className="trabalhos-tecnicos-alert error" role="alert">
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>

                    <div className="trabalhos-tecnicos-section-label">Dados Gerais</div>

                    <div className="trabalhos-tecnicos-field">
                      <label htmlFor="titulo">Título <span>*</span></label>
                      <input id="titulo" name="titulo" type="text" value={form.titulo}
                        onChange={handleChange} placeholder="Título do trabalho técnico"
                        className={errors.titulo ? 'trabalhos-tecnicos-input-error' : ''} />
                      {errors.titulo && <span className="trabalhos-tecnicos-field-error">{errors.titulo}</span>}
                    </div>

                    <div className="trabalhos-tecnicos-field-row">
                      <div className="trabalhos-tecnicos-field">
                        <label htmlFor="ano">Ano <span>*</span></label>
                        <input id="ano" name="ano" type="number" value={form.ano}
                          onChange={handleChange} placeholder="YYYY"
                          min="1900" max={new Date().getFullYear()}
                          className={errors.ano ? 'trabalhos-tecnicos-input-error' : ''} />
                        {errors.ano && <span className="trabalhos-tecnicos-field-error">{errors.ano}</span>}
                      </div>
                      <div className="trabalhos-tecnicos-field">
                        <label htmlFor="autores">Autores <span>*</span></label>
                        <input id="autores" name="autores" type="text" value={form.autores}
                          onChange={handleChange} placeholder="Autores separados por vírgula"
                          className={errors.autores ? 'trabalhos-tecnicos-input-error' : ''} />
                        {errors.autores && <span className="trabalhos-tecnicos-field-error">{errors.autores}</span>}
                      </div>
                    </div>

                    <div className="trabalhos-tecnicos-field">
                      <label htmlFor="descricao">Descrição <span>*</span></label>
                      <textarea id="descricao" name="descricao" value={form.descricao}
                        onChange={handleChange} placeholder="Descreva o trabalho técnico" rows={3}
                        className={errors.descricao ? 'trabalhos-tecnicos-input-error' : ''} />
                      {errors.descricao && <span className="trabalhos-tecnicos-field-error">{errors.descricao}</span>}
                    </div>

                    <div className="trabalhos-tecnicos-section-label">Detalhamento</div>

                    <div className="trabalhos-tecnicos-field-row">
                      <div className="trabalhos-tecnicos-field">
                        <label htmlFor="tipoTrabalho">Tipo de Trabalho Técnico <span>*</span></label>
                        <select id="tipoTrabalho" name="tipoTrabalho" value={form.tipoTrabalho}
                          onChange={handleChange}
                          className={errors.tipoTrabalho ? 'trabalhos-tecnicos-input-error' : ''}>
                          {TIPO_TRABALHO_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.tipoTrabalho && <span className="trabalhos-tecnicos-field-error">{errors.tipoTrabalho}</span>}
                      </div>
                      <div className="trabalhos-tecnicos-field">
                        <label htmlFor="natureza">Natureza <span>*</span></label>
                        <select id="natureza" name="natureza" value={form.natureza}
                          onChange={handleChange}
                          className={errors.natureza ? 'trabalhos-tecnicos-input-error' : ''}>
                          {NATUREZA_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.natureza && <span className="trabalhos-tecnicos-field-error">{errors.natureza}</span>}
                      </div>
                    </div>

                    <div className="trabalhos-tecnicos-field">
                      <label htmlFor="instituicaoContratante">Instituição Contratante</label>
                      <input id="instituicaoContratante" name="instituicaoContratante" type="text"
                        value={form.instituicaoContratante} onChange={handleChange}
                        placeholder="Nome da instituição contratante" />
                    </div>

                    <div className="trabalhos-tecnicos-field">
                      <label htmlFor="numeroContrato">Número do Contrato</label>
                      <input id="numeroContrato" name="numeroContrato" type="text"
                        value={form.numeroContrato} onChange={handleChange}
                        placeholder="Número do contrato" />
                    </div>

                    <div className="trabalhos-tecnicos-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><span className="trabalhos-tecnicos-spinner" /> Salvando...</> : <>
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
              <div className="trabalhos-tecnicos-success-bar">
                <button className="btn-primary" onClick={() => { setForm(INITIAL); setSuccess(false) }}>Cadastrar outro</button>
                <Link to="/feed" className="btn-secondary">Voltar ao Feed</Link>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="trabalhos-tecnicos-footer">
        <p>Plataforma Lattes — CNPq · <a href="#privacidade">Política de Privacidade</a> · <a href="#termos">Termos de Uso</a></p>
      </footer>

    </div>
  )
}
