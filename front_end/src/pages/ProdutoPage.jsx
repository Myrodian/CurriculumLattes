import ProductionFormPage from '../components/form/ProductionFormPage'
import { createProduto, getMeusProdutos } from '../api/api'

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

const config = {
  key: 'produto',
  breadcrumb: 'Produto',
  titleBarLabel: 'Produto',
  titleBarIcon: <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.48 1 12.35 1c-1.7 0-3.23.72-4.35 1.88C6.88 1.72 5.35 1 3.65 1 .52 1-2 2.53-2 4.65c0 .47.11.91.18 1.35H-2v14h24V6zm-7.65-3c1.03 0 1.65.55 1.65 1.35S13.38 6 12.35 6H10V4.12C10.59 3.43 11.44 3 12.35 3zM3.65 3C4.56 3 5.41 3.43 6 4.12V6H3.65C2.62 6 2 5.45 2 4.65S2.62 3 3.65 3zM4 18V8h6v10H4zm8 0V8h6v10h-6z"/></svg>,
  info: {
    title: 'Produto',
    description: 'Registre softwares, patentes, manuais e outros produtos acadêmicos.',
    listHeading: 'Meus produtos',
    emptyText: 'Nenhum produto cadastrado ainda.',
    listSecondary: item => item.tipoProduto,
  },
  intro: <>Preencha os dados do produto acadêmico. Campos marcados com <strong>*</strong> são obrigatórios.</>,
  successTitle: 'Produto cadastrado com sucesso!',
  successText: 'O produto foi registrado na plataforma.',
  initial: {
    titulo: '', ano: '', autores: '', descricao: '',
    tipoProduto: '', numeroRegistro: '', instituicaoFinanciadora: '', situacao: '',
  },
  sections: [
    {
      label: 'Dados Gerais',
      fields: [
        { name: 'titulo', label: 'Título', placeholder: 'Título do produto', required: true },
        { name: 'ano', label: 'Ano', type: 'number', placeholder: 'YYYY', half: true, required: true,
          requiredMessage: 'Ano é obrigatório.', min: '1900', max: new Date().getFullYear(),
          pattern: { re: /^\d{4}$/, message: 'Informe um ano válido (YYYY).' } },
        { name: 'autores', label: 'Autores', placeholder: 'Autores separados por vírgula', half: true, required: true },
        { name: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'Descreva o produto',
          required: true, requiredMessage: 'Descrição é obrigatória.' },
      ],
    },
    {
      label: 'Detalhamento',
      fields: [
        { name: 'tipoProduto', label: 'Tipo de Produto', type: 'select', options: TIPO_PRODUTO_OPTIONS, half: true,
          required: true, requiredMessage: 'Tipo de produto é obrigatório.' },
        { name: 'situacao', label: 'Situação', type: 'select', options: SITUACAO_OPTIONS, half: true,
          required: true, requiredMessage: 'Situação é obrigatória.' },
        { name: 'numeroRegistro', label: 'Número de Registro / Série', placeholder: 'Número de registro ou série' },
        { name: 'instituicaoFinanciadora', label: 'Instituição Financiadora', placeholder: 'Nome da instituição financiadora' },
      ],
    },
  ],
  api: { create: createProduto, list: getMeusProdutos },
}

export default function ProdutoPage() {
  return <ProductionFormPage config={config} />
}
