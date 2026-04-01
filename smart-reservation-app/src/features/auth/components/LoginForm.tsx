import { useForm } from 'react-hook-form';
import type { LoginCredentials } from '../types/auth.types';


interface LoginFormProps {
  onSubmit : (data : LoginCredentials)=>Promise<void>
  error? : string
  loading? : boolean
}

export default function LoginForm({onSubmit, error, loading} : LoginFormProps) {


  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>()


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

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    );
  };

