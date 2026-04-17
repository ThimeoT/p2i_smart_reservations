interface BoutonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  style?: 'outline' | 'filled';
  color?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

const getButtonClasses = (
  style: BoutonProps['style'],
  color: BoutonProps['color'],
  size: BoutonProps['size'],
) => {
  if (style === undefined) style = 'filled';
  if (color === undefined) color = 'primary';
  if (size === undefined) size = 'medium';
  const baseClasses =
    'font-display font-semibold text-center tracking-widest hover:shadow-lg disabled:bg-gray-50 transition-shadow hover:cursor-pointer';

  const styleClasses = {
    outline: 'border-3 bg-transparent',
    filled: '',
  };

  const sizeClasses = {
    small: 'px-3 py-2 rounded-md shadow-sm text-xs',
    medium: 'px-6 py-4 rounded-lg max-w-128 shadow-md text-xs md:text-sm',
    large: 'px-8 py-5 rounded-xl shadow-lg text-sm md:text-base',
  };

  const colorClasses = {
    primary: {
      outline: 'border-bleu-2 text-bleu-2 hover:bg-bleu-2 hover:text-white',
      filled: 'bg-bleu-1 hover:bg-bleu-2 text-white',
    },
    secondary: {
      outline: 'border-gris-2 text-gris-2 hover:bg-bleu-fonce-1 hover:text-white',
      filled: 'bg-gris-2 text-white',
    },
    danger: {
      outline: 'border-rouge-1 text-rouge-2 hover:bg-rouge-2 hover:text-white',
      filled: 'bg-rouge-1 text-white',
    },
  };

  return `${baseClasses} ${sizeClasses[size]} ${styleClasses[style]} ${colorClasses[color][style]}`;
};

export default function Bouton({
  text,
  type = 'button',
  style = 'filled',
  color = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}: BoutonProps) {
  const buttonClasses = getButtonClasses(style, color, size);
  return (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text.toUpperCase()}
    </button>
  );
}
