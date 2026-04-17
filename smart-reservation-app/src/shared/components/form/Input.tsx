import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// on utilise forwardRef pour pourvoir accéder à l'input via un useRef extérieur
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        className="w-full border-3 border-solid rounded-md border-taupe-1 p-1"
        {...props}
      />
    );
  },
);

export default Input
