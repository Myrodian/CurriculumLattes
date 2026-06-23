import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createProjetoEnsino, getMeusProjetosEnsino } from '../api/api'
import './ProjetoEnsinoPage.css'

const SITUACAO_OPTIONS = [
  { value: '', label: 'Selecione a situação' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' },
]

const INITIAL = {
  titulo: '', ano: '', autores: '', descricao: '',
  situacaoProjeto: '', instituicaoFinanciadora: '', numeroBolsistas: '', vinculoInstitucional: '',
}

export default function ProjetoEnsinoPage() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itens, setItens] = useState([])

  const carregarItens = () => {
    getMeusProjetosEnsino().then(setItens).catch(() => {})
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
    if (!form.situacaoProjeto) e.situacaoProjeto = 'Situação do projeto é obrigatória.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await createProjetoEnsino({
        ...form,
        ano: Number(form.ano),
        numeroBolsistas: form.numeroBolsistas ? Number(form.numeroBolsistas) : null,
      })
      setSuccess(true)
      carregarItens()
    } catch {
      setErrors({ submit: 'Não foi possível salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="projeto-ensino-root">

      <header className="projeto-ensino-header">
        <div className="projeto-ensino-header-logo">
          <div className="projeto-ensino-header-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          </div>
          <div className="projeto-ensino-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="projeto-ensino-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <div className="projeto-ensino-subheader">
        <span>Início</span>
        <span>Produção Acadêmica</span>
        <span>Projeto de Ensino</span>
      </div>

      <main className="projeto-ensino-main">

        <aside className="projeto-ensino-info-panel">
          <div className="projeto-ensino-info-card">
            <h3>Projeto de Ensino</h3>
            <p>Registre projetos de ensino com informações sobre situação, financiamento e bolsistas.</p>
            <p>Campos marcados com <strong>*</strong> são obrigatórios.</p>
          </div>
          <div className="projeto-ensino-info-card">
            <h3>Navegação</h3>
            <Link to="/feed">← Voltar ao Feed</Link>
            <Link to="/apresentacao">Apresentação de Trabalho</Link>
            <Link to="/produto">Produto</Link>
            <Link to="/trabalhos-tecnicos">Trabalhos Técnicos</Link>
          </div>
          <div className="projeto-ensino-info-card">
            <h3>Meus projetos de ensino</h3>
            {itens.length === 0 ? (
              <p>Nenhum projeto cadastrado ainda.</p>
            ) : (
              <ul className="projeto-ensino-lista">
                {itens.map(item => (
                  <li key={item.id}>
                    <strong>{item.titulo}</strong>
                    <span>{item.ano} · {item.situacaoProjeto}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="projeto-ensino-form-wrapper">
          <div className="projeto-ensino-form-card">

            <div className="projeto-ensino-form-title-bar">
              <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
              <span>Projeto de Ensino</span>
            </div>

            <div className="projeto-ensino-form-body">
              {success ? (
                <div className="projeto-ensino-success">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>
                  <div>
                    <strong>Projeto cadastrado com sucesso!</strong>
                    <p>O projeto de ensino foi registrado na plataforma.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="projeto-ensino-form-intro">
                    Preencha os dados do projeto de ensino. Campos com <strong>*</strong> são obrigatórios.
                  </p>

                  {errors.submit && (
                    <div className="projeto-ensino-alert error" role="alert">
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>

                    <div className="projeto-ensino-section-label">Dados Gerais</div>

                    <div className="projeto-ensino-field">
                      <label htmlFor="titulo">Título <span>*</span></label>
                      <input id="titulo" name="titulo" type="text" value={form.titulo}
                        onChange={handleChange} placeholder="Título do projeto"
                        className={errors.titulo ? 'projeto-ensino-input-error' : ''} />
                      {errors.titulo && <span className="projeto-ensino-field-error">{errors.titulo}</span>}
                    </div>

                    <div className="projeto-ensino-field-row">
                      <div className="projeto-ensino-field">
                        <label htmlFor="ano">Ano <span>*</span></label>
                        <input id="ano" name="ano" type="number" value={form.ano}
                          onChange={handleChange} placeholder="YYYY"
                          min="1900" max={new Date().getFullYear()}
                          className={errors.ano ? 'projeto-ensino-input-error' : ''} />
                        {errors.ano && <span className="projeto-ensino-field-error">{errors.ano}</span>}
                      </div>
                      <div className="projeto-ensino-field">
                        <label htmlFor="autores">Autores <span>*</span></label>
                        <input id="autores" name="autores" type="text" value={form.autores}
                          onChange={handleChange} placeholder="Autores separados por vírgula"
                          className={errors.autores ? 'projeto-ensino-input-error' : ''} />
                        {errors.autores && <span className="projeto-ensino-field-error">{errors.autores}</span>}
                      </div>
                    </div>

                    <div className="projeto-ensino-field">
                      <label htmlFor="descricao">Descrição <span>*</span></label>
                      <textarea id="descricao" name="descricao" value={form.descricao}
                        onChange={handleChange} placeholder="Descreva o projeto" rows={3}
                        className={errors.descricao ? 'projeto-ensino-input-error' : ''} />
                      {errors.descricao && <span className="projeto-ensino-field-error">{errors.descricao}</span>}
                    </div>

                    <div className="projeto-ensino-section-label">Detalhamento</div>

                    <div className="projeto-ensino-field-row">
                      <div className="projeto-ensino-field">
                        <label htmlFor="situacaoProjeto">Situação do Projeto <span>*</span></label>
                        <select id="situacaoProjeto" name="situacaoProjeto" value={form.situacaoProjeto}
                          onChange={handleChange}
                          className={errors.situacaoProjeto ? 'projeto-ensino-input-error' : ''}>
                          {SITUACAO_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.situacaoProjeto && <span className="projeto-ensino-field-error">{errors.situacaoProjeto}</span>}
                      </div>
                      <div className="projeto-ensino-field">
                        <label htmlFor="numeroBolsistas">Número de Bolsistas</label>
                        <input id="numeroBolsistas" name="numeroBolsistas" type="number"
                          value={form.numeroBolsistas} onChange={handleChange}
                          placeholder="0" min="0" />
                      </div>
                    </div>

                    <div className="projeto-ensino-field">
                      <label htmlFor="instituicaoFinanciadora">Instituição Financiadora</label>
                      <input id="instituicaoFinanciadora" name="instituicaoFinanciadora" type="text"
                        value={form.instituicaoFinanciadora} onChange={handleChange}
                        placeholder="Nome da instituição financiadora" />
                    </div>

                    <div className="projeto-ensino-field">
                      <label htmlFor="vinculoInstitucional">Vínculo Institucional</label>
                      <input id="vinculoInstitucional" name="vinculoInstitucional" type="text"
                        value={form.vinculoInstitucional} onChange={handleChange}
                        placeholder="Ex: Universidade Federal de Minas Gerais" />
                    </div>

                    <div className="projeto-ensino-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><span className="projeto-ensino-spinner" /> Salvando...</> : <>
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
              <div className="projeto-ensino-success-bar">
                <button className="btn-primary" onClick={() => { setForm(INITIAL); setSuccess(false) }}>Cadastrar outro</button>
                <Link to="/feed" className="btn-secondary">Voltar ao Feed</Link>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="projeto-ensino-footer">
        <p>Plataforma Lattes — CNPq · <a href="#privacidade">Política de Privacidade</a> · <a href="#termos">Termos de Uso</a></p>
      </footer>

    </div>
  )
}
