// components/FormikInput.tsx
import React from 'react';
import { Field } from 'formik';
import MDInput from '../components/MDInput';
import MDBox from '../components/MDBox';

interface FormikInputProps {
  name: string;
  label: string;
  type?: string;
  [key: string]: any; // Para otras props que quieras pasar
}

const FormikInput: React.FC<FormikInputProps> = ({ name, label, type = 'text', ...props }) => (
  <Field name={name}>
    {({ field, meta }: { field: any; meta: any }) => (
      <MDBox mb={2}>
        <MDInput
          type={type}
          label={label}
          fullWidth
          {...field}
          {...props}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      </MDBox>
    )}
  </Field>
);

export default FormikInput;