interface TextBodyProps {
  children: React.ReactNode;
  color?: 'bleu-fonce' | 'taupe';
  align?: 'left' | 'center' | 'right';
}

const colorClasses = {
  'bleu-fonce': 'text-bleu-fonce-1',
  'taupe': 'text-taupe-2',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function TextBody({
  children,
  color = 'bleu-fonce',
  align = 'left',
}: TextBodyProps) {
  return (
    <p className={`text-base md: text-lg ${colorClasses[color]} ${alignClasses[align]}`}>
      {children}
    </p>
  );
}
