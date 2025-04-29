import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const fieldTypes = [
  { type: 'text', label: 'Text Box' },
  { type: 'textarea', label: 'Text Area' },
  { type: 'radio', label: 'Radio Group' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'select', label: 'Select List' },
  { type: 'file', label: 'File Upload' },
  { type: 'button', label: 'Button' },
];

const DraggableField = ({ field, index }) => {
  const [, drag] = useDrag(() => ({
    type: 'FIELD',
    item: { index, field },
  }));

  return (
    <div ref={drag} style={{ padding: 10, border: '1px solid #ccc', marginBottom: 8, cursor: 'move' }}>
      {field.label}
    </div>
  );
};

const DropZone = ({ fields, setFields }) => {
  const [, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item) => handleDrop(item),
  }));

  const handleDrop = (item) => {
    const field = {
      ...item.field,
      label: 'Field Label',
      options: item.field.type === 'radio' ? ['Option 1', 'Option 2'] : [],
      defaultOption: item.field.type === 'radio' ? 'Option 1' : ''
    };
    setFields((prevFields) => [...prevFields, field]);
  };

  return (
    <div ref={drop} style={{ minHeight: 400, border: '2px dashed gray', padding: 10 }}>
      {fields.length === 0 ? (
        <p>Drop fields here</p>
      ) : (
        fields.map((field, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <div>
              <input
                type="text"
                value={field.label}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].label = e.target.value;
                  setFields(updatedFields);
                }}
                placeholder="Field label"
                style={{ marginBottom: 5, width: '100%' }}
              />
            </div>
            <div>
              {field.type === 'textarea' && (
                <textarea rows="4" cols="30" placeholder="Text Area" />
              )}
              {field.type === 'text' && (
                <input type="text" placeholder="Text Box" />
              )}
              {field.type === 'checkbox' && (
                <label>
                  <input type="checkbox" /> {field.label}
                </label>
              )}
              {field.type === 'file' && (
                <input type="file" />
              )}
              {field.type === 'radio' && field.options && field.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`radio-${index}`}
                    value={opt}
                    checked={opt === field.defaultOption}
                  /> {opt}
                </label>
              ))}
              {field.type === 'select' && (
                <select>
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}
              {field.type === 'button' && (
                <button>{field.label}</button> 
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); 
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.formData) {
      const form = location.state.formData;
      setFields(form.fields);
      setFormName(form.name);
      setFormId(form.id);
    }
  }, [location]);

  const handleSaveForm = () => {
    if (formName.trim() === '') {
      alert('Please enter a form name');
      return;
    }

    const newForm = {
      id: formId || Date.now(),
      name: formName,
      fields: fields,
    };

    const existingForms = JSON.parse(localStorage.getItem('forms') || '[]');
    
    if (formId) {
      const updatedForms = existingForms.map(form =>
        form.id === formId ? newForm : form
      );
      localStorage.setItem('forms', JSON.stringify(updatedForms));
      alert('Form updated successfully!');
    } else {
      existingForms.push(newForm);
      localStorage.setItem('forms', JSON.stringify(existingForms));
      alert('Form saved successfully!');
    }

    navigate('/my-forms');
  };

  const handleDeleteForm = () => {
    if (formId) {
      const existingForms = JSON.parse(localStorage.getItem('forms') || '[]');
      const updatedForms = existingForms.filter(form => form.id !== formId);
      localStorage.setItem('forms', JSON.stringify(updatedForms));
      alert('Form deleted successfully!');
      navigate('/my-forms');
    } else {
      alert('No form to delete');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', padding: 20, gap: 20 }}>
        <div style={{ width: 200 }}>
          <h4>Field Types</h4>
          {fieldTypes.map((f, i) => (
            <DraggableField key={i} field={f} index={i} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h4>Form Canvas</h4>
          <DropZone fields={fields} setFields={setFields} />
          <div>
            <input
              type="text"
              placeholder="Enter form name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              style={{ marginBottom: 10, width: '100%' }}
            />
            <div style={{ marginTop: 10 }}>
              <button onClick={handleSaveForm}>Save Form</button>
              {formId && (
                <button
                  onClick={handleDeleteForm}
                  style={{ marginLeft: 10, backgroundColor: 'red', color: 'white' }}
                >
                  Delete Form
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
