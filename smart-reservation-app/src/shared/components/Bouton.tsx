interface BoutonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  style?: 'outline' | 'filled';
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}

const getButtonClasses = (
  style: BoutonProps['style'],
  color: BoutonProps['color'],
) => {
  if (style === undefined) style = 'filled';
  if (color === undefined) color = 'primary';
  const baseClasses = "max-w-128 font-display px-6 py-4 rounded-lg shadow-md font-semibold text-xs md:text-sm text-center tracking-widest hover:shadow-lg disabled:bg-gray-50 transition-shadow";

  const styleClasses = {
    outline: 'border-2 bg-transparent',
    filled: '',
  };

  const colorClasses = {
    primary: {
      outline: 'border-bleu-2 text-bleu-2 hover:bg-bleu-2 hover:text-white',
      filled: 'bg-bleu-1 hover:bg-bleu-2 text-white',
    },
    secondary: {
      outline: 'border-gris-2 text-gris-2 hover:bg-gris-2 hover:text-white',
      filled: 'bg-gris-2 text-white',
    },
    danger: {
      outline: 'border-rouge-2 text-rouge-2 hover:bg-rouge-2 hover:text-white',
      filled: 'bg-rouge-2 text-white',
    },
  };

  return `${baseClasses} ${styleClasses[style]} ${colorClasses[color][style]}`;
};

export default function Bouton({
  text,
  type = 'button',
  style = 'filled',
  color = 'primary',
  onClick,
  disabled = false,
}: BoutonProps) {
  const buttonClasses = getButtonClasses(style, color);
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
