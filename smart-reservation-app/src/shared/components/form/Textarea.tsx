type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      className="min-h-30 w-full rounded-lg border-2 border-taupe-1 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-taupe-2 focus:ring-2 focus:ring-taupe-1"
      {...props}
    />
  );
}
