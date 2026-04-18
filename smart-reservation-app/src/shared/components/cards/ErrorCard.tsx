interface ErrorCardProps {
  error: unknown;
}

export default function ErrorCard({ error }: ErrorCardProps) {
  const message =
    error instanceof Error ? error.message : 'Une erreur est survenue.';

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}
