import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { ApiError } from "../../../config/fetchClient";
import type { LoginCredentials } from "../types/auth.types";
import AuthForm from "../components/AuthForm";
import imageHero from "../../../assets/labo_etudiants.jpg";

function SectionHero() {
  return (
    <div className="relative w-full h-52 shrink-0">
      <img
        src={imageHero}
        alt="Équipements Smart Réservations"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35 px-8"  />
      <div className="absolute bottom-5 left-5 right-5">
        <h2 className="font-display font-bold text-2xl text-white leading-tight">
          Nos équipements à votre portée en quelques clics
        </h2>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginCredentials) => {
    setError(null);
    try {
      await login(data);
      navigate("/home");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.status === 401 ? "Identifiants incorrects" : "Erreur serveur",
        );
      } else {
        setError("Erreur réseau");
      }
    }
  };

  return (
    <div>
      <SectionHero />
      <h1 className="font-display text-2xl mt-8 mb-4">Connexion</h1>
      <AuthForm
        onSubmit={handleSubmit}
        error={error ?? undefined}
        loading={isLoading}
      />
    </div>
  );
}
