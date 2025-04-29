import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const formId = location.state?.formId;
    const savedForms = JSON.parse(localStorage.getItem('forms') || '[]');
    const selectedForm = savedForms.find((form) => form.id === formId);
    if (selectedForm) {
      setForm(selectedForm);
    } else {
      navigate('/my-forms'); // If no form found, redirect to "My Forms"
    }
  }, [location, navigate]);

  return (
    <div>
      {form ? (
        <div>
          <h2>{form.name}</h2>
          {form.fields.map((field, index) => (
            <div key={index}>
              <h4>{field.label}</h4>
              {field.type === 'text' && <input type="text" value={field.label} disabled />}
              {field.type === 'textarea' && <textarea value={field.label} disabled />}
              {field.type === 'radio' && field.options.map((opt, i) => (
                <label key={i}>
                  <input type="radio" value={opt} checked={opt === field.defaultOption} disabled /> {opt}
                </label>
              ))}
              {field.type === 'checkbox' && (
                <label>
                  <input type="checkbox" disabled /> {field.label}
                </label>
              )}
              {field.type === 'file' && <input type="file" disabled />}
              {field.type === 'select' && (
                <select disabled>
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}
              {field.type === 'button' && <button disabled>{field.label}</button>}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
};

export default ViewForm;
