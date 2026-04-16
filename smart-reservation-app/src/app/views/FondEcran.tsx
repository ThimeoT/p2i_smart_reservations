export default function FondEcran({ children }: { children: React.ReactNode }) {
  return   <div className="min-h-screen flex-1 bg-beige-1"><div className="mx-8 md:mx-auto md:max-w-3/4">{children}</div></div>; 
}
