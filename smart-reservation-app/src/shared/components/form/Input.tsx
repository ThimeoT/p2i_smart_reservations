
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      className="border-3 border-solid rounded-md border-taupe-1 p-1"
      {...props}
    />
  );
}