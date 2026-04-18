export default function FondEcran({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex-1 bg-beige-1 pt-23 pb-8">
      {children}
    </div>
  );
}
