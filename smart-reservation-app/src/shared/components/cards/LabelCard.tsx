import type { Label } from '../../../features/label/types/label.types';

interface LabelCardProps {
  label: Label;
}

export default function LabelCard({ label }: LabelCardProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-solid px-2.5 py-0.5 text-xs font-medium"
      style={{ borderColor: label.color, color: label.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: label.color }}
      />
      {label.nom}
    </span>
  );
}
