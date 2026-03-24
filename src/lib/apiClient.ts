import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const baseURL =
  (import.meta.env.VITE_APP_API_URL as string | undefined)?.trim() ||
  'http://localhost:4000/api'

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth.accessToken
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

