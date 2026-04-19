interface TextBodyProps {
  children: React.ReactNode;
  color?: 'bleu-fonce' | 'taupe' | 'bleu-fonce-1' | 'taupe-3' | 'beige-1' | 'valid' | 'danger' | 'warning' | 'info';
  align?: 'left' | 'center' | 'right';
}

const colorClasses: Record<NonNullable<TextBodyProps['color']>, string> = {
  'bleu-fonce':   'text-bleu-fonce-1',
  'bleu-fonce-1': 'text-bleu-fonce-1',
  'taupe':        'text-taupe-2',
  'taupe-3':      'text-taupe-3',
  'beige-1':      'text-beige-1',
  'valid':        'text-vert-1',
  'danger':       'text-rouge-1',
  'warning':      'text-jaune-1',
  'info':         'text-bleu-1',
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
    <p className={`text-base md:text-lg ${colorClasses[color]} ${alignClasses[align]}`}>
      {children}
    </p>
  );
}
