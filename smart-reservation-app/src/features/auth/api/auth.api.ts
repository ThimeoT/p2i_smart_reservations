import axiosInstance from '../../../config/axiosInstance'
import type { LoginCredentials } from '../types/auth.types'

export const loginApi = async (credentials: LoginCredentials) => {
  const params = new URLSearchParams()
  params.append('username', credentials.username)
  params.append('password', credentials.password)

  await axiosInstance.post('/login', params)
}

export const getMeApi = async () => {
  const { data } = await axiosInstance.get('/user/current') // à créer côté Spring
  return data
}