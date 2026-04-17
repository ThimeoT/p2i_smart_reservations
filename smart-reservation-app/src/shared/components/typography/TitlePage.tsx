
export default function TitreDePage({ titre }: { titre: string }) {
  return (
    <h1 className="font-display text-2xl 
     font-bold px-8 py-6 mb-4
     md:text-3xl md:py-12">{titre}</h1>
  );
}