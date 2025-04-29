import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem('forms') || '[]');
    setForms(savedForms);
  }, []);

  const handleDelete = (id) => {
    const updatedForms = forms.filter(form => form.id !== id);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>My Forms</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {forms.map((form) => (
          <div key={form.id} style={{ width: 250, border: '1px solid #ccc', padding: 20, margin: 10 }}>
            <h3>{form.name}</h3>
            {/* Edit Form Button */}
            <Link to="/form-builder" state={{ formData: form }}>
              <button>Edit Form</button>
            </Link>

            {/* View Form Button */}
            <Link to="/view-form" state={{ formId: form.id }}>
              <button style={{ marginLeft: 10 }}>View Form</button>
            </Link>

            {/* Delete Form Button */}
            <button onClick={() => handleDelete(form.id)} style={{ marginLeft: 10 }}>
              Delete Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForms;
