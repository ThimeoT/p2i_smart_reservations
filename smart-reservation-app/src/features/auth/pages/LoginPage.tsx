import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { loginApi, getMeApi } from '../api/auth.api'
import { useAuth } from '../hooks/useAuth'
import type { LoginCredentials } from '../types/auth.types'

export default function LoginPage() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>()

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await loginApi(data)
      const user = await getMeApi()
      setUser(user)
      navigate('/app/admin')
    } catch {
      setError('root', { message: 'Identifiants incorrects' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register('username', { required: 'Email requis' })}
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        type="password"
        placeholder="Mot de passe"
        {...register('password', { required: 'Mot de passe requis' })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {errors.root && <p>{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}