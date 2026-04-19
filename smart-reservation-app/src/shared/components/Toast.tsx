import { useEffect, useState } from 'react';
import TextBody from './typography/TextBody';

interface ToastProps {
  message: string;
  duree?: number;
  color?: 'valid' | 'danger' | 'warning' | 'info';
}

const bgClasses: Record<NonNullable<ToastProps['color']>, string> = {
  valid:   'bg-vert-1',
  danger:  'bg-rouge-1',
  warning: 'bg-jaune-1',
  info:    'bg-taupe-3',
};

export default function Toast({ message, duree = 4000, color = 'info' }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duree);
    return () => clearTimeout(timer);
  }, [duree]);

  if (!visible) return null;

  return (
    <div className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-xl ${bgClasses[color]} px-5 py-3 shadow-lg`}>
      <TextBody color="beige-1" align="center">{message}</TextBody>
    </div>
  );
}
