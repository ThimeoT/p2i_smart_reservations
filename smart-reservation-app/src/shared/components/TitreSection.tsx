export default function TitreDeSection({ titre }: { titre: string }) {
  return (
    <h1 className="font-display text-xl md:text-2xl font-bold">{titre}</h1>
  );
}