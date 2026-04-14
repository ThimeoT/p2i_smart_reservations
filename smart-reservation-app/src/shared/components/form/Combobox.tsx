import { useState, useRef } from 'react';

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

export function Combobox({ options, value, onChange, placeholder = 'Ajouter...', renderTag }: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter(
    (o) => !value.includes(o.id) && o.nom.toLowerCase().includes(query.toLowerCase()),
  );

  const select = (id: number) => {
    onChange([...value, id]);
    setQuery('');
    setActiveIdx(-1);
    inputRef.current?.focus();
  };

  const remove = (id: number) => onChange(value.filter((v) => v !== id));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    else if (e.key === 'ArrowUp') setActiveIdx((i) => Math.max(i - 1, 0));
    else if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); select(filtered[activeIdx].id); }
    else if (e.key === 'Backspace' && !query && value.length) remove(value[value.length - 1]);
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '6px 8px', border: '1px solid #ccc', borderRadius: 6, cursor: 'text' }}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((id) => {
          const opt = options.find((o) => o.id === id);
          if (!opt) return null;
          return renderTag ? (
            <span key={id}>
              {renderTag(opt)}
              <button type="button" onClick={() => remove(id)}>×</button>
            </span>
          ) : (
            <span key={id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', background: '#e8e8e8', borderRadius: 4, fontSize: 13 }}>
              {opt.nom}
              <button type="button" onClick={() => remove(id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          style={{ border: 'none', outline: 'none', fontSize: 14, flex: 1, minWidth: 120, background: 'transparent' }}
        />
      </div>

      {open && filtered.length > 0 && (
        <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, background: '#fff', border: '1px solid #ccc', borderRadius: 6, listStyle: 'none', margin: '4px 0 0', padding: 0, maxHeight: 220, overflowY: 'auto' }}>
          {filtered.map((opt, i) => (
            <li
              key={opt.id}
              onMouseDown={() => select(opt.id)}
              style={{ padding: '8px 12px', fontSize: 14, cursor: 'pointer', background: i === activeIdx ? '#f0f0f0' : 'transparent' }}
            >
              {opt.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}