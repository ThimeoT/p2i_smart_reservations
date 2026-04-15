export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full  max-w-md mx-auto p-6 bg-white rounded shadow">
      {children}
    </div>
  );
}