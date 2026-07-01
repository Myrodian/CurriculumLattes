import ProductionFormPage from '../components/form/ProductionFormPage'
import { createProjetoEnsino, getMeusProjetosEnsino } from '../api/api'

const SITUACAO_OPTIONS = [
  { value: '', label: 'Selecione a situação' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' },
]

const config = {
  key: 'projeto-ensino',
  breadcrumb: 'Projeto de Ensino',
  titleBarLabel: 'Projeto de Ensino',
  titleBarIcon: <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>,
  info: {
    title: 'Projeto de Ensino',
    description: 'Registre projetos de ensino com informações sobre situação, financiamento e bolsistas.',
    listHeading: 'Meus projetos de ensino',
    emptyText: 'Nenhum projeto cadastrado ainda.',
    listSecondary: item => item.situacaoProjeto,
  },
  intro: <>Preencha os dados do projeto de ensino. Campos com <strong>*</strong> são obrigatórios.</>,
  successTitle: 'Projeto cadastrado com sucesso!',
  successText: 'O projeto de ensino foi registrado na plataforma.',
  initial: {
    titulo: '', ano: '', autores: '', descricao: '',
    situacaoProjeto: '', instituicaoFinanciadora: '', numeroBolsistas: '', vinculoInstitucional: '',
  },
  sections: [
    {
      label: 'Dados Gerais',
      fields: [
        { name: 'titulo', label: 'Título', placeholder: 'Título do projeto', required: true },
        { name: 'ano', label: 'Ano', type: 'number', placeholder: 'YYYY', half: true, required: true,
          requiredMessage: 'Ano é obrigatório.', min: '1900', max: new Date().getFullYear(),
          pattern: { re: /^\d{4}$/, message: 'Informe um ano válido (YYYY).' } },
        { name: 'autores', label: 'Autores', placeholder: 'Autores separados por vírgula', half: true, required: true },
        { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Descreva o projeto',
          required: true, requiredMessage: 'Descrição é obrigatória.' },
      ],
    },
    {
      label: 'Detalhamento',
      fields: [
        { name: 'situacaoProjeto', label: 'Situação do Projeto', type: 'select', options: SITUACAO_OPTIONS, half: true,
          required: true, requiredMessage: 'Situação do projeto é obrigatória.' },
        { name: 'numeroBolsistas', label: 'Número de Bolsistas', type: 'number', placeholder: '0', min: '0', half: true },
        { name: 'instituicaoFinanciadora', label: 'Instituição Financiadora', placeholder: 'Nome da instituição financiadora' },
        { name: 'vinculoInstitucional', label: 'Vínculo Institucional', placeholder: 'Ex: Universidade Federal de Minas Gerais' },
      ],
    },
  ],
  transform: (form) => ({
    ...form,
    ano: Number(form.ano),
    numeroBolsistas: form.numeroBolsistas ? Number(form.numeroBolsistas) : null,
  }),
  api: { create: createProjetoEnsino, list: getMeusProjetosEnsino },
}

export default function ProjetoEnsinoPage() {
  return <ProductionFormPage config={config} />
}
