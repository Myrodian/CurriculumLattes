import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProdutoPage.css'

const TIPO_PRODUTO_OPTIONS = [
  { value: '', label: 'Selecione o tipo de produto' },
  { value: 'software', label: 'Software' },
  { value: 'patente', label: 'Patente' },
  { value: 'manual', label: 'Manual' },
]

const SITUACAO_OPTIONS = [
  { value: '', label: 'Selecione a situação' },
  { value: 'prototipo', label: 'Protótipo' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'em_desenvolvimento', label: 'Em desenvolvimento' },
]

const INITIAL = {
  titulo: '', ano: '', autores: '', descricao: '',
  tipoProduto: '', numeroRegistro: '', instituicaoFinanciadora: '', situacao: '',
}

export default function ProdutoPage() {
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
    if (!form.tipoProduto) e.tipoProduto = 'Tipo de produto é obrigatório.'
    if (!form.situacao) e.situacao = 'Situação é obrigatória.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      // await createProduto(form)
      console.log('Produto:', form)
      setSuccess(true)
    } catch {
      setErrors({ submit: 'Não foi possível salvar. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="produto-root">

      <header className="produto-header">
        <div className="produto-header-logo">
          <div className="produto-header-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          </div>
          <div className="produto-header-brand">
            <span>Plataforma</span>
            <span>Lattes</span>
          </div>
        </div>
        <nav className="produto-header-links">
          <a href="#sobre">Sobre</a>
          <a href="#ajuda">Ajuda</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <div className="produto-subheader">
        <span>Início</span>
        <span>Produção Acadêmica</span>
        <span>Produto</span>
      </div>

      <main className="produto-main">

        <aside className="produto-info-panel">
          <div className="produto-info-card">
            <h3>Produto</h3>
            <p>Registre softwares, patentes, manuais e outros produtos acadêmicos.</p>
            <p>Campos marcados com <strong>*</strong> são obrigatórios.</p>
          </div>
          <div className="produto-info-card">
            <h3>Navegação</h3>
            <Link to="/feed">← Voltar ao Feed</Link>
            <Link to="/apresentacao-trabalho-palestra">Apresentação de Trabalho</Link>
            <Link to="/projeto-ensino">Projeto de Ensino</Link>
            <Link to="/trabalhos-tecnicos">Trabalhos Técnicos</Link>
          </div>
        </aside>

        <div className="produto-form-wrapper">
          <div className="produto-form-card">

            <div className="produto-form-title-bar">
              <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.48 1 12.35 1c-1.7 0-3.23.72-4.35 1.88C6.88 1.72 5.35 1 3.65 1 .52 1-2 2.53-2 4.65c0 .47.11.91.18 1.35H-2v14h24V6zm-7.65-3c1.03 0 1.65.55 1.65 1.35S13.38 6 12.35 6H10V4.12C10.59 3.43 11.44 3 12.35 3zM3.65 3C4.56 3 5.41 3.43 6 4.12V6H3.65C2.62 6 2 5.45 2 4.65S2.62 3 3.65 3zM4 18V8h6v10H4zm8 0V8h6v10h-6z"/></svg>
              <span>Produto</span>
            </div>

            <div className="produto-form-body">
              {success ? (
                <div className="produto-success">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4-4 1.41-1.41L10 13.67l6.59-6.59L18 8.5l-8 8z"/></svg>
                  <div>
                    <strong>Produto cadastrado com sucesso!</strong>
                    <p>O produto foi registrado na plataforma.</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="produto-form-intro">
                    Preencha os dados do produto acadêmico. Campos marcados com <strong>*</strong> são obrigatórios.
                  </p>

                  {errors.submit && (
                    <div className="produto-alert error" role="alert">
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>

                    <div className="produto-section-label">Dados Gerais</div>

                    <div className="produto-field">
                      <label htmlFor="titulo">Título <span>*</span></label>
                      <input id="titulo" name="titulo" type="text" value={form.titulo}
                        onChange={handleChange} placeholder="Título do produto"
                        className={errors.titulo ? 'produto-input-error' : ''} />
                      {errors.titulo && <span className="produto-field-error">{errors.titulo}</span>}
                    </div>

                    <div className="produto-field-row">
                      <div className="produto-field">
                        <label htmlFor="ano">Ano <span>*</span></label>
                        <input id="ano" name="ano" type="number" value={form.ano}
                          onChange={handleChange} placeholder="YYYY"
                          min="1900" max={new Date().getFullYear()}
                          className={errors.ano ? 'produto-input-error' : ''} />
                        {errors.ano && <span className="produto-field-error">{errors.ano}</span>}
                      </div>
                      <div className="produto-field">
                        <label htmlFor="autores">Autores <span>*</span></label>
                        <input id="autores" name="autores" type="text" value={form.autores}
                          onChange={handleChange} placeholder="Autores separados por vírgula"
                          className={errors.autores ? 'produto-input-error' : ''} />
                        {errors.autores && <span className="produto-field-error">{errors.autores}</span>}
                      </div>
                    </div>

                    <div className="produto-field">
                      <label htmlFor="descricao">Descrição <span>*</span></label>
                      <textarea id="descricao" name="descricao" value={form.descricao}
                        onChange={handleChange} placeholder="Descreva o produto" rows={3}
                        className={errors.descricao ? 'produto-input-error' : ''} />
                      {errors.descricao && <span className="produto-field-error">{errors.descricao}</span>}
                    </div>

                    <div className="produto-section-label">Detalhamento</div>

                    <div className="produto-field-row">
                      <div className="produto-field">
                        <label htmlFor="tipoProduto">Tipo de Produto <span>*</span></label>
                        <select id="tipoProduto" name="tipoProduto" value={form.tipoProduto}
                          onChange={handleChange}
                          className={errors.tipoProduto ? 'produto-input-error' : ''}>
                          {TIPO_PRODUTO_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.tipoProduto && <span className="produto-field-error">{errors.tipoProduto}</span>}
                      </div>
                      <div className="produto-field">
                        <label htmlFor="situacao">Situação <span>*</span></label>
                        <select id="situacao" name="situacao" value={form.situacao}
                          onChange={handleChange}
                          className={errors.situacao ? 'produto-input-error' : ''}>
                          {SITUACAO_OPTIONS.map(o => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
                          ))}
                        </select>
                        {errors.situacao && <span className="produto-field-error">{errors.situacao}</span>}
                      </div>
                    </div>

                    <div className="produto-field">
                      <label htmlFor="numeroRegistro">Número de Registro / Série</label>
                      <input id="numeroRegistro" name="numeroRegistro" type="text" value={form.numeroRegistro}
                        onChange={handleChange} placeholder="Número de registro ou série" />
                    </div>

                    <div className="produto-field">
                      <label htmlFor="instituicaoFinanciadora">Instituição Financiadora</label>
                      <input id="instituicaoFinanciadora" name="instituicaoFinanciadora" type="text"
                        value={form.instituicaoFinanciadora} onChange={handleChange}
                        placeholder="Nome da instituição financiadora" />
                    </div>

                    <div className="produto-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <><span className="produto-spinner" /> Salvando...</> : <>
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
              <div className="produto-success-bar">
                <button className="btn-primary" onClick={() => { setForm(INITIAL); setSuccess(false) }}>Cadastrar outro</button>
                <Link to="/feed" className="btn-secondary">Voltar ao Feed</Link>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="produto-footer">
        <p>Plataforma Lattes — CNPq · <a href="#privacidade">Política de Privacidade</a> · <a href="#termos">Termos de Uso</a></p>
      </footer>

    </div>
  )
}
