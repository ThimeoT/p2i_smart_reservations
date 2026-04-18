import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duree?: number;
}

export default function Toast({ message, duree = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duree);
    return () => clearTimeout(timer);
  }, [duree]);

  if (!visible) return null;

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-xl bg-taupe-3 px-5 py-3 text-sm font-medium text-beige-1 shadow-lg">
      {message}
    </div>
  );
}
