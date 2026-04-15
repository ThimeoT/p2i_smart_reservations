import { useForm } from "react-hook-form";
import type { LoginCredentials } from "../types/auth.types";
import Input from "../../../shared/components/form/Input";
import FormLayout from "../../../shared/components/form/FormLayout";

interface AuthFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export default function AuthForm({ onSubmit, error, loading }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayout>
        <input className="border-3 border-solid rounded-md border-taupe-1 p-1"
          type="email"
          placeholder="Adresse e-mail"
          {...register("mail", { required: "E-mail requis" })}
        />
      {errors.mail && <p>{errors.mail.message}</p>}

        <Input
          type="password"
          placeholder="Mot de passe"
          {...register("password", { required: "Mot de passe requis" })}
        />

      {errors.password && <p>{errors.password.message}</p>}

      {errors.root && <p>{errors.root.message}</p>}

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Connexion…" : "Se connecter"}
      </button>

      </FormLayout>
    </form>
  );
}
