import { useEffect } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { getMeApi } from '../../features/auth/api/auth.api'
import { useAuth } from '../../features/auth/hooks/useAuth'

export function useInitializeApp() {
  const { setUser } = useAuth()

  useEffect(() => {
    // 1. Récupère le cookie XSRF-TOKEN auprès de Spring
    axiosInstance.get('/csrf')
      .then(() => getMeApi())   // 2. Vérifie si une session existe déjà
      .then(setUser)
      .catch(() => {})          // pas de session → reste sur /login
  }, [])
}