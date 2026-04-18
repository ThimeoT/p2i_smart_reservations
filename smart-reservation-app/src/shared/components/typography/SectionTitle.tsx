export default function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="font-display text-xl md:text-2xl font-bold py-8">{title}</h1>
  );
}
