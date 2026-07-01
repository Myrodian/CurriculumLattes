import ProductionFormPage from '../components/form/ProductionFormPage'
import { createApresentacao, getMinhasApresentacoes } from '../api/api'

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

const config = {
  key: 'apresentacao',
  breadcrumb: 'Apresentação',
  titleBarLabel: 'Apresentação',
  titleBarIcon: <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
  info: {
    title: 'Apresentação de Trabalho',
    description: 'Registre suas apresentações em congressos, simpósios e palestras.',
    listHeading: 'Minhas apresentações',
    emptyText: 'Nenhuma apresentação cadastrada ainda.',
    listSecondary: item => item.nomeEvento,
  },
  intro: <>Preencha os dados da apresentação de trabalho ou palestra. Campos marcados com <strong>*</strong> são obrigatórios.</>,
  successTitle: 'Cadastro realizado com sucesso!',
  successText: 'Apresentação registrada na plataforma.',
  initial: {
    titulo: '', ano: '', autores: '', descricao: '',
    tipoEvento: '', nomeEvento: '', localEvento: '', natureza: '',
  },
  sections: [
    {
      label: 'Dados Gerais',
      fields: [
        { name: 'titulo', label: 'Título', placeholder: 'Título da apresentação', required: true },
        { name: 'ano', label: 'Ano', type: 'number', placeholder: 'YYYY', half: true, required: true,
          requiredMessage: 'Ano é obrigatório.', min: '1900', max: new Date().getFullYear(),
          pattern: { re: /^\d{4}$/, message: 'Informe um ano válido (YYYY).' } },
        { name: 'autores', label: 'Autores', placeholder: 'Autores separados por vírgula', half: true, required: true },
        { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Descreva a apresentação',
          required: true, requiredMessage: 'Descrição é obrigatória.' },
      ],
    },
    {
      label: 'Detalhamento',
      fields: [
        { name: 'tipoEvento', label: 'Tipo de Evento', type: 'select', options: TIPO_EVENTO_OPTIONS, half: true,
          required: true, requiredMessage: 'Tipo de evento é obrigatório.' },
        { name: 'natureza', label: 'Natureza', type: 'select', options: NATUREZA_OPTIONS, half: true,
          required: true, requiredMessage: 'Natureza é obrigatória.' },
        { name: 'nomeEvento', label: 'Nome do Evento', placeholder: 'Nome do congresso, simpósio ou palestra',
          required: true, requiredMessage: 'Nome do evento é obrigatório.' },
        { name: 'localEvento', label: 'Local do Evento', placeholder: 'Cidade, estado ou país do evento' },
      ],
    },
  ],
  api: { create: createApresentacao, list: getMinhasApresentacoes },
}

export default function ApresentacaoPage() {
  return <ProductionFormPage config={config} />
}
