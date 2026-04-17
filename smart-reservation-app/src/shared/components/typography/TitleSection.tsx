export default function TitreDeSection({ titre: title }: { titre: string }) {
  return (
    <h1 className="font-display text-xl md:text-2xl font-bold py-8">{title}</h1>
  );
}
