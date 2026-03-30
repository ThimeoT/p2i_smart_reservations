import { useEffect } from 'react'
import { getMeApi } from '../../features/auth/api/auth.api'
import { useAuth } from '../../features/auth/hooks/useAuth'

export function useInitializeApp() {
  const { setUser } = useAuth()

  useEffect(() => {
    // Au démarrage, vérifie si une session existe déjà côté Spring
    getMeApi()
      .then(setUser)
      .catch(() => {}) // pas de session → reste sur /login
  }, [])
}