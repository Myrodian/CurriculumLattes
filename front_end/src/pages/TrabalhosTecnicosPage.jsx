import ProductionFormPage from '../components/form/ProductionFormPage'
import { createTrabalhoTecnico, getMeusTrabalhosTecnicos } from '../api/api'

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

const config = {
  key: 'trabalhos-tecnicos',
  breadcrumb: 'Trabalhos Técnicos',
  titleBarLabel: 'Trabalhos Técnicos',
  titleBarIcon: <svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>,
  info: {
    title: 'Trabalhos Técnicos',
    description: 'Registre consultorias, relatórios e assessorias técnicas realizadas.',
    listHeading: 'Meus trabalhos técnicos',
    emptyText: 'Nenhum trabalho técnico cadastrado ainda.',
    listSecondary: item => item.tipoTrabalho,
  },
  intro: <>Preencha os dados do trabalho técnico. Campos com <strong>*</strong> são obrigatórios.</>,
  successTitle: 'Trabalho técnico cadastrado com sucesso!',
  successText: 'O trabalho foi registrado na plataforma.',
  initial: {
    titulo: '', ano: '', autores: '', descricao: '',
    tipoTrabalho: '', instituicaoContratante: '', numeroContrato: '', natureza: '',
  },
  sections: [
    {
      label: 'Dados Gerais',
      fields: [
        { name: 'titulo', label: 'Título', placeholder: 'Título do trabalho técnico', required: true },
        { name: 'ano', label: 'Ano', type: 'number', placeholder: 'YYYY', half: true, required: true,
          requiredMessage: 'Ano é obrigatório.', min: '1900', max: new Date().getFullYear(),
          pattern: { re: /^\d{4}$/, message: 'Informe um ano válido (YYYY).' } },
        { name: 'autores', label: 'Autores', placeholder: 'Autores separados por vírgula', half: true, required: true },
        { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Descreva o trabalho técnico',
          required: true, requiredMessage: 'Descrição é obrigatória.' },
      ],
    },
    {
      label: 'Detalhamento',
      fields: [
        { name: 'tipoTrabalho', label: 'Tipo de Trabalho Técnico', type: 'select', options: TIPO_TRABALHO_OPTIONS, half: true,
          required: true, requiredMessage: 'Tipo de trabalho é obrigatório.' },
        { name: 'natureza', label: 'Natureza', type: 'select', options: NATUREZA_OPTIONS, half: true,
          required: true, requiredMessage: 'Natureza é obrigatória.' },
        { name: 'instituicaoContratante', label: 'Instituição Contratante', placeholder: 'Nome da instituição contratante' },
        { name: 'numeroContrato', label: 'Número do Contrato', placeholder: 'Número do contrato' },
      ],
    },
  ],
  api: { create: createTrabalhoTecnico, list: getMeusTrabalhosTecnicos },
}

export default function TrabalhosTecnicosPage() {
  return <ProductionFormPage config={config} />
}
