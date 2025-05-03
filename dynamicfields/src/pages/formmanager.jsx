import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormBuilder from './FormBuilder';
import DynamicForm from './DynamicForm';

const FormManager = () => {
  const [formName, setFormName] = useState('');
  const [formSchema, setFormSchema] = useState([]);
  const [savedForms, setSavedForms] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const handleSaveForm = () => {
    if (!formName) {
      alert('Please enter a form name.');
      return;
    }
    setSavedForms([...savedForms, { name: formName, schema: formSchema }]);
    setFormName('');
    setFormSchema([]);
    setViewMode(false);
  };

  const handleView = idx => {
    setSelectedIndex(idx);
    setViewMode(true);
  };

  const handleEdit = idx => {
    const { name, schema } = savedForms[idx];
    setFormName(name);
    setFormSchema(schema);
    setSavedForms(savedForms.filter((_, i) => i !== idx));
    setViewMode(false);
  };

  const handleDelete = idx => {
    setSavedForms(savedForms.filter((_, i) => i !== idx));
    if (selectedIndex === idx) {
      setViewMode(false);
      setSelectedIndex(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Own Form Here
      </Typography>

      <TextField
        label="Form Name"
        fullWidth
        margin="normal"
        value={formName}
        onChange={e => setFormName(e.target.value)}
      />

      <FormBuilder schema={formSchema} setSchema={setFormSchema} />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSaveForm}
        disabled={formSchema.length === 0 || !formName}
      >
        Save Form
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Saved Forms
      </Typography>
      <List>
        {savedForms.map((f, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <>
                <IconButton onClick={() => handleView(i)}>
                <VisibilityIcon/>
                </IconButton>
                <IconButton onClick={() => handleEdit(i)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(i)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={f.name} />
          </ListItem>
        ))}
      </List>

      {viewMode && selectedIndex !== null && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Preview: {savedForms[selectedIndex].name}
          </Typography>
          <DynamicForm schema={savedForms[selectedIndex].schema} />
        </Box>
      )}
    </Box>
  );
};

export default FormManager;
