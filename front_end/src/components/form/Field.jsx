/**
 * Campo de formulário controlado (input / number / textarea / select).
 * Dirigido por um descritor:
 *   { name, label, type, placeholder, required, options, rows, min, max }
 */
export default function Field({ field, value, error, onChange }) {
  const { name, label, type = 'text', placeholder, required, options, rows = 3, min, max } = field
  const inputClass = error ? 'pform-input-error' : ''

  return (
    <div className="pform-field">
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name} name={name} value={value} onChange={onChange}
          placeholder={placeholder} rows={rows} className={inputClass}
        />
      ) : type === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange} className={inputClass}>
          {options.map(o => (
            <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name} name={name} type={type} value={value} onChange={onChange}
          placeholder={placeholder} min={min} max={max} className={inputClass}
        />
      )}

      {error && <span className="pform-field-error">{error}</span>}
    </div>
  )
}
