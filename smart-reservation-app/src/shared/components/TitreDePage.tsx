
export default function TitreDePage({ titre }: { titre: string }) {
  return (
    <h1 className="font-display text-2xl md:text-3xl font-bold px-8 py-3 mb-4">{titre}</h1>
  );
}