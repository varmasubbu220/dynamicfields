import React, { useState } from 'react';
import { saveForm } from '../utils/storage';

const fieldTypes = ["text", "number", "checkbox", "select"];

export default function BuilderPage() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState('');

  const addField = (type) => {
    const label = prompt(`Enter label for ${type} field:`);
    if (!label) return;
    setFields([...fields, { type, label }]);
  };

  const handleSave = () => {
    if (!formName) return alert("Please enter form name");
    saveForm({ name: formName, fields });
    setFields([]);
    setFormName('');
    alert("Form saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Builder</h2>
      <input 
        type="text" 
        value={formName} 
        placeholder="Enter form name" 
        onChange={(e) => setFormName(e.target.value)} 
      />
      <div style={{ marginTop: 10 }}>
        {fieldTypes.map(type => (
          <button key={type} onClick={() => addField(type)}>{type}</button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <h4>Preview:</h4>
        {fields.map((field, index) => (
          <div key={index}>{field.label} ({field.type})</div>
        ))}
      </div>
      <button onClick={handleSave} style={{ marginTop: 20 }}>Save Form</button>
    </div>
  );
}
