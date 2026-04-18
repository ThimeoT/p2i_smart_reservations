export default function PageTitle({ title }: { title: string }) {
  return (
    <h1
      className="font-display text-2xl text-bleu-fonce-1
     font-bold py-6 mb-4
     md:text-3xl md:py-12"
    >
      {title}
    </h1>
  );
}
