import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    // 'Accept': 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 60000,
})
