import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Checkbox,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  Typography
} from '@mui/material';

const DynamicForm = ({ schema }) => {
  // initialize RHF
  const { control, handleSubmit } = useForm();

  // called when all validations pass
  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  // called when there are validation errors
  const onError = (errors) => {
    const missing = Object.keys(errors).map(name => {
      const field = schema.find(f => f.name === name);
      return field?.label || name;
    });
    alert(`Please fill required fields: ${missing.join(', ')}`);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Live Form Preview
      </Typography>
      {/* pass both onSubmit and onError to handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {schema.map((field, idx) => {
          // set up RHF rules for “required”
          const rules = field.required ? { required: `${field.label} is required` } : {};
          const baseProps = {
            name: field.name,
            control,
            rules,
            defaultValue: field.type === 'checkbox' ? false : ''
          };

          switch (field.type) {
            case 'text':
            case 'number':
            case 'date':
              return (
                <Controller
                  key={idx}
                  {...baseProps}
                  render={({ field: ctrl }) => (
                    <TextField
                      {...ctrl}
                      label={field.label}
                      type={field.type}
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              );

            case 'textarea':
              return (
                <Controller
                  key={idx}
                  {...baseProps}
                  render={({ field: ctrl }) => (
                    <TextField
                      {...ctrl}
                      label={field.label}
                      multiline
                      rows={4}
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              );

            case 'select':
              return (
                <Controller
                  key={idx}
                  {...baseProps}
                  render={({ field: ctrl }) => (
                    <FormControl fullWidth margin="normal">
                      <Select {...ctrl} displayEmpty>
                        <MenuItem disabled value="">
                          Select {field.label}
                        </MenuItem>
                        {field.options.map((opt, i) => (
                          <MenuItem key={i} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              );

            case 'checkbox':
              // single checkbox
              if (field.options.length === 0) {
                return (
                  <Controller
                    key={idx}
                    {...baseProps}
                    render={({ field: ctrl }) => (
                      <FormControlLabel
                        control={<Checkbox {...ctrl} checked={ctrl.value} />}
                        label={field.label}
                      />
                    )}
                  />
                );
              }
              // group of checkboxes (no RHF capture here)
              return (
                <FormControl component="fieldset" key={idx} margin="normal">
                  <FormLabel component="legend">{field.label}</FormLabel>
                  {field.options.map((opt, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={opt}
                    />
                  ))}
                </FormControl>
              );

            case 'radio':
              return (
                <Controller
                  key={idx}
                  {...baseProps}
                  render={({ field: ctrl }) => (
                    <FormControl component="fieldset" margin="normal">
                      <FormLabel component="legend">{field.label}</FormLabel>
                      <RadioGroup {...ctrl}>
                        {field.options.map((opt, i) => (
                          <FormControlLabel
                            key={i}
                            value={opt}
                            control={<Radio />}
                            label={opt}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              );

            case 'button':
              return (
                <Button key={idx} variant="outlined" sx={{ mt: 2 }}>
                  {field.label}
                </Button>
              );

            default:
              return null;
          }
        })}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default DynamicForm;
