interface BoutonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    style: "outline" | "filled";
    color: "primary" | "secondary" | "danger";
    onClick: () => void;
}

export default function Bouton({ label, type, onClick }: BoutonProps) {
  return (
    <button className="font-sans" type={type} onClick={onClick}>
      {label}
    </button>
  );
}