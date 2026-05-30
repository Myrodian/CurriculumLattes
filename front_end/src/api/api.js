import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

// injeta token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// redireciona ao login se token expirar
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const loginUser = (email, password) =>{
  
  api.post('/auth/login', { email, password },)
     .then(res => ({
       ...res.data,
       token: res.data.access_token  // ← mapeia access_token para token
       
     }))
     console.log('Login request:', { email, password }) // log para depuração
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