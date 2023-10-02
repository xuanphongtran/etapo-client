import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    // 'Accept': 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 60000,
})
