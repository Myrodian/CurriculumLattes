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

export default api