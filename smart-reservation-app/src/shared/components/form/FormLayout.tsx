export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full rounded-lg p-4 bg-white shadow">
      {children}
    </div>
  );
}