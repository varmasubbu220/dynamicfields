import React from 'react';
import { useParams } from 'react-router-dom';

export default function FormPreview() {
  const { formId } = useParams();
  const forms = JSON.parse(localStorage.getItem('forms') || '[]');
  const form = forms.find(f => String(f.id) === formId);

  if (!form) return <p>Form not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{form.name}</h2>
      {form.fields.map((field, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <label>{field.label}:</label><br />
          {field.type === 'textarea' && <textarea rows="4" cols="30" placeholder={field.placeholder} disabled />}
          {field.type === 'text' && <input type="text" placeholder={field.placeholder} disabled />}
          {field.type === 'checkbox' && <input type="checkbox" defaultChecked={field.defaultChecked} disabled />}
          {field.type === 'file' && <input type="file" disabled />}
          {field.type === 'radio' && field.options.map((opt, j) => (
            <label key={j}><input type="radio" name={`radio-${i}`} value={opt} disabled defaultChecked={opt === field.defaultOption} /> {opt}</label>
          ))}
          {field.type === 'select' && (
            <select defaultValue={field.defaultOption} disabled>
              {field.options.map((opt, j) => <option key={j}>{opt}</option>)}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
