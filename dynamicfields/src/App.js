import React, { useState } from 'react';
import FormBuilder from './pages/FormBuilder';
import DynamicForm from './pages/DynamicForm';
import { Grid } from '@mui/material';
import FormManager from './pages/formmanager';



const App = () => {
  const [schema, setSchema] = useState([]);

  return (
    <div style={{ padding: 20 }}>
    
      <FormManager/>
    </div>
  );
};

export default App;
