import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { initialisationApi } from '../api/auth.api';
import type { InitialisationFormData } from '../types/auth.types';
import Input from '../../../shared/components/form/Input';
import Bouton from '../../../shared/components/Bouton';
import FormLayout from '../../../shared/components/form/FormLayout';

interface InitialisationFormFields extends InitialisationFormData {
  confirmationMotDePasse: string;
}

export default function PageInitialisationCompte() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InitialisationFormFields>();

  const nouveauMotDePasse = watch('nouveauMotDePasse');

  const onSubmit = async (data: InitialisationFormFields) => {
    if (!user) return;
    const { confirmationMotDePasse, ...payload } = data; // on se sépare du mot de passe de confirmation
    await initialisationApi({ ...payload, id: user.id });
    setUser({ ...user, statut: 'ACTIF' });
    navigate('/app/dashboard');
  };

  return (
    <div className="pt-10 pb-12">
      <div className="flex flex-col items-center gap-2 mb-8 px-4 text-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          Bienvenue !
        </h1>
        <p className="text-sm text-taupe-2">
          Configurez votre compte avant de continuer.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-display">Nom</label>
        <input
          placeholder="Nom"
          {...register('nom', { required: 'Nom requis' })}
        />
        {errors.nom && <p>{errors.nom.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-display">Prénom</label>
        <Input
          placeholder="Prénom"
          {...register('prenom', { required: 'Prénom requis' })}
        />
        {errors.prenom && <p>{errors.prenom.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-display">
              Formation <span className="text-taupe-1 font-normal">(optionnel)</span>
            </label>
            <Input placeholder="Votre formation" {...register('formation')} />
          </div>
        
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium font-display">Nouveau mot de passe</label>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          {...register('nouveauMotDePasse', {
            required: 'Nouveau mot de passe requis',
            minLength: { value: 8, message: '8 caractères minimum' },
          })}
        />
        {errors.nouveauMotDePasse && <p className='text-xs text-rouge-1'>{errors.nouveauMotDePasse.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium font-display">
            Confirmer le mot de passe
          </label>

          <Input
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
            {...register('confirmationMotDePasse', {
              required: 'Confirmation requise',
              validate: (value) =>
                value === nouveauMotDePasse ||
                'Les mots de passe ne correspondent pas',
            })}
          />
          {errors.confirmationMotDePasse && (
            <p className="text-xs text-rouge-1">
              {errors.confirmationMotDePasse.message}
            </p>
          )}
        </div>

        <Bouton
          type="submit"
          disabled={isSubmitting}
          text={isSubmitting ? 'Enregistrement...' : "Accéder à l'application"}
        />
        </FormLayout>
      </form>
    </div>
  );
}
