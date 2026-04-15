export default function ContenuPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-8 md:mx-auto md:max-w-xl">
        {children}
      </div>
    </div>
  );
}