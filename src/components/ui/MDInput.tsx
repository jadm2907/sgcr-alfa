import React from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import Icon from '@mui/material/Icon';

interface MDInputProps {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end';
  iconClick?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium';
  multiline?: boolean;
  rows?: number;
  variant?: 'outlined' | 'filled' | 'standard';
}

const MDInput: React.FC<MDInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  fullWidth = false,
  icon,
  iconPosition = 'start',
  iconClick,
  error = false,
  helperText,
  disabled = false,
  placeholder,
  size = 'medium',
  multiline = false,
  rows = 1,
  variant = 'outlined'
}) => {
  const theme = useTheme();

  const InputIcon = icon ? (
    <Icon 
      onClick={iconClick} 
      sx={{ 
        cursor: iconClick ? 'pointer' : 'default',
        color: error ? theme.palette.error.main : theme.palette.text.secondary
      }}
    >
      {icon}
    </Icon>
  ) : null;

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      disabled={disabled}
      placeholder={placeholder}
      size={size}
      multiline={multiline}
      rows={rows}
      variant={variant}
      InputProps={{
        [iconPosition === 'start' ? 'startAdornment' : 'endAdornment']: InputIcon ? (
          <InputAdornment position={iconPosition}>
            {InputIcon}
          </InputAdornment>
        ) : undefined,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.grey[300],
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1,
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.primary.main,
        },
      }}
    />
  );
};

export default MDInput;