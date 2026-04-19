import { useState, useRef, useEffect } from 'react';

interface ComboboxOption {
  id: number;
  nom: string;
  color?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
  renderTag?: (option: ComboboxOption) => React.ReactNode;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Ajouter...',
  renderTag,
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout>| null>(null)

  //pour annuler le timer si le composant disparait car non géré
  useEffect(()=>{
    return ()=> {
      if(blurTimerRef.current) clearTimeout(blurTimerRef.current);
    }
  },[])

  const filtered = options.filter(
    (o) =>
      !value.includes(o.id) &&
      o.nom.toLowerCase().includes(query.toLowerCase()),
  );

  const select = (id: number) => {
    onChange([...value, id]);
    setQuery('');
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  const remove = (id: number) => onChange(value.filter((v) => v !== id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown')
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    else if (e.key === 'ArrowUp') setActiveIdx((i) => Math.max(i - 1, 0));
    else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      select(filtered[activeIdx].id);
    } else if (e.key === 'Backspace' && !query && value.length)
      remove(value[value.length - 1]);
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-wrap items-center gap-2 rounded-md border-3 border-solid border-taupe-1 bg-white px-3 py-2 text-sm transition focus-within:border-bleu-fonce-1"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((id) => {
          const opt = options.find((o) => o.id === id);
          if (!opt) return null;
          return (
            <span
              key={id}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              style={{
                border: opt.color ? `1px solid ${opt.color}` : undefined,
              }}
            >
              {renderTag ? renderTag(opt) : opt.nom}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  remove(id);
                }}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                ×
              </button>
            </span>
          );
        })}

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => blurTimerRef.current = setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="min-w-35 flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-taupe-1 bg-white shadow-lg">
          {filtered.map((opt, i) => (
            <li
              key={opt.id}
              onMouseDown={() => select(opt.id)}
              className={`cursor-pointer px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100 ${
                i === activeIdx ? 'bg-slate-100 font-medium' : ''
              }`}
            >
              {opt.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
