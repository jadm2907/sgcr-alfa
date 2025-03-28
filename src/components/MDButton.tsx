import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface IMDButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  customColor?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';
  customVariant?: 'text' | 'contained' | 'outlined' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  circular?: boolean;
  iconOnly?: boolean;
}

const MDButton: React.FC<IMDButtonProps> = ({ 
  customColor = 'primary', 
  customVariant = 'contained',
  size = 'medium',
  circular = false,
  iconOnly = false,
  children,
  sx,
  ...rest 
}) => {
  const colorMap = {
    primary: '#1A73E8',
    secondary: '#4CAF50',
    info: '#00B0FF',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    light: '#F5F5F5',
    dark: '#212121',
  };

  const gradient = (color: string) => {
    if (color === 'primary') return 'linear-gradient(195deg, #1A73E8, #0d47a1)';
    if (color === 'secondary') return 'linear-gradient(195deg, #4CAF50, #2E7D32)';
    if (color === 'info') return 'linear-gradient(195deg, #00B0FF, #0081CB)';
    if (color === 'success') return 'linear-gradient(195deg, #4CAF50, #2E7D32)';
    if (color === 'warning') return 'linear-gradient(195deg, #FF9800, #EF6C00)';
    if (color === 'error') return 'linear-gradient(195deg, #F44336, #C62828)';
    return 'none';
  };

  return (
    <Button
      {...rest}
      sx={{
        minWidth: iconOnly ? '40px' : 'auto',
        minHeight: iconOnly ? '40px' : 'auto',
        borderRadius: circular ? '50%' : '8px',
        padding: iconOnly ? '8px' : '8px 16px',
        background: customVariant === 'gradient' ? gradient(customColor) : undefined,
        '&:hover': {
          background: customVariant === 'gradient' ? gradient(customColor) : undefined,
          opacity: 0.9,
        },
        ...(customVariant === 'gradient' && {
          color: 'white',
          border: 'none',
        }),
        ...sx,
      }}
      variant={customVariant === 'gradient' ? 'contained' : customVariant}
      size={size}
    >
      {children}
    </Button>
  );
};

export default MDButton;