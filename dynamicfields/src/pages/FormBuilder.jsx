import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';

const fieldTypes = [
  'text',
  'number',
  'select',
  'checkbox',
  'radio',
  'date',
  'textarea',
  'button'
];

const FormBuilder = ({ schema, setSchema }) => {
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    type: 'text',
    required: false,
    options: ''
  });

  const handleAddField = () => {
    const newField = {
      ...formData,
      options: ['select', 'checkbox', 'radio'].includes(formData.type)
        ? formData.options.split(',').map(o => o.trim())
        : []
    };

    setSchema([...schema, newField]);

    // reset builder inputs
    setFormData({
      label: '',
      name: '',
      type: 'text',
      required: false,
      options: ''
    });
  };

  return (
    <>
      <Typography variant="h6">Add Form Field</Typography>
      <TextField
        label="Label"
        fullWidth
        margin="normal"
        value={formData.label}
        onChange={e =>
          setFormData({ ...formData, label: e.target.value })
        }
      />
      <TextField
        label="Field Name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={e =>
          setFormData({ ...formData, name: e.target.value })
        }
      />
      <Select
        fullWidth
        margin="normal"
        value={formData.type}
        onChange={e =>
          setFormData({ ...formData, type: e.target.value })
        }
      >
        {fieldTypes.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>

      {['select', 'checkbox', 'radio'].includes(formData.type) && (
        <TextField
          label="Options (comma separated)"
          fullWidth
          margin="normal"
          value={formData.options}
          onChange={e =>
            setFormData({ ...formData, options: e.target.value })
          }
        />
      )}

      {formData.type !== 'button' && (
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.required}
              onChange={e =>
                setFormData({ ...formData, required: e.target.checked })
              }
            />
          }
          label="Required"
        />
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleAddField}
      >
        Add Field
      </Button>
    </>
  );
};

export default FormBuilder;
