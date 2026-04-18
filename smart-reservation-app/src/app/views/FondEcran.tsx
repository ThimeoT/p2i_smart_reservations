export default function FondEcran({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex-1 bg-beige-1 pt-23 pb-8"><div className="mx-8 md:mx-auto md:max-w-2/4">{children}</div></div>;
}
