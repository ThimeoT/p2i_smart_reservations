import { ApiError } from '../../../config/fetchClient';

interface ErrorCardProps {
  error: unknown;
}

export default function ErrorCard({ error }: ErrorCardProps) {
  let message: string;

  if (error instanceof ApiError) {
    message = error.message;
    if (error.body && typeof error.body === 'string') {
      message += ` — ${error.body}`;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = 'Une erreur est survenue.';
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}
