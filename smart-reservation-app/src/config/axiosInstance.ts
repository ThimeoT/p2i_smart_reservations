import axios from 'axios'
import env from './env'

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  const xsrfToken = getCookie('XSRF-TOKEN')
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken
  }
  return config
})

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export default axiosInstance