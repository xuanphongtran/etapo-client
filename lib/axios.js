import axios from 'axios'

const AXIOS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 60000,
})
AXIOS.interceptors.request.use(
  (conf) => {
    let token
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      token = localStorage.getItem('accessToken')
    }
    if (token) {
      conf.headers.Authorization = `Bearer ${token}`
    } else {
      // TODO: No Token
    }
    return conf
  },
  (error) => Promise.reject(error),
)
export default AXIOS
