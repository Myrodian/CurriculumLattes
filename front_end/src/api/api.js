import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

// injeta credenciais Basic Auth em todas as requisições (exceto quando já há um header próprio)
api.interceptors.request.use(config => {
  if (!config.headers.Authorization) {
    const credentials = localStorage.getItem('token')
    if (credentials) {
      config.headers.Authorization = `Basic ${credentials}`
    }
  }
  return config
})

// redireciona ao login se token expirar (ignora falha de autenticação na própria rota de login)
api.interceptors.response.use(
  res => res,
  err => {
    const isLoginEndpoint = err.config?.url?.includes('/auth/login')
    if (err.response?.status === 401 && !isLoginEndpoint) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const loginUser = async (email, password) => {
  const credentials = btoa(`${email}:${password}`)
  const res = await api.post('/auth/login', null, {
    headers: { Authorization: `Basic ${credentials}` },
  })
  return { ...res.data, token: credentials }
}
export const getUsers = (page = 0, size = 10) =>
  api.get(`/users?page=${page}&size=${size}`).then(res => res.data)

export const getUserById = (id) =>
  api.get(`/users/${id}`).then(res => res.data)

export const createUser = (data) =>
  api.post('/users', data).then(res => res.data)

export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data).then(res => res.data)

export const deleteUser = (id) =>
  api.delete(`/users/${id}`)

// Produção acadêmica — Apresentações
export const createApresentacao = (data) =>
  api.post('/apresentacoes', data).then(res => res.data)
export const getMinhasApresentacoes = () =>
  api.get('/apresentacoes/me').then(res => res.data)

// Produção acadêmica — Produtos
export const createProduto = (data) =>
  api.post('/produtos', data).then(res => res.data)
export const getMeusProdutos = () =>
  api.get('/produtos/me').then(res => res.data)

// Produção acadêmica — Projetos de Ensino
export const createProjetoEnsino = (data) =>
  api.post('/projetos-ensino', data).then(res => res.data)
export const getMeusProjetosEnsino = () =>
  api.get('/projetos-ensino/me').then(res => res.data)

// Produção acadêmica — Trabalhos Técnicos
export const createTrabalhoTecnico = (data) =>
  api.post('/trabalhos-tecnicos', data).then(res => res.data)
export const getMeusTrabalhosTecnicos = () =>
  api.get('/trabalhos-tecnicos/me').then(res => res.data)

// Feed de atividades (produções de quem o usuário segue)
export const getFeed = () =>
  api.get('/feed').then(res => res.data)
export const getUserActivities = (id) =>
  api.get(`/feed/users/${id}`).then(res => res.data)

// Busca pública de currículos (não exige login)
export const searchUsers = (q) =>
  api.get('/users/search', { params: { q } }).then(res => res.data)

// Seguir / deixar de seguir / sugestões / quem eu sigo
export const followUser = (id) =>
  api.post(`/users/${id}/follow`)
export const unfollowUser = (id) =>
  api.delete(`/users/${id}/follow`)
export const getSuggestions = () =>
  api.get('/users/suggestions').then(res => res.data)
export const getFollowing = () =>
  api.get('/users/me/following').then(res => res.data)

export default api