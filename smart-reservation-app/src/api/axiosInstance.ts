import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ex: http://localhost:8080
  withCredentials: true, // indispensable pour envoyer/recevoir le cookie JSESSIONID
})

export default axiosInstance