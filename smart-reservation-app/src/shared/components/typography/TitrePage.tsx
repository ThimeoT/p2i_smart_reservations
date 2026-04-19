export default function TitrePage({ titre }: { titre: string }) {
  return (
    <h1
      className="font-display text-2xl text-bleu-fonce-1
     font-bold py-8 mb-4
     md:text-3xl md:py-16"
    >
      {titre}
    </h1>
  );
}
