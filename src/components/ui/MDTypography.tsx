import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface IMDTypographyProps extends TypographyProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark' | 'text';
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  verticalAlign?: 'unset' | 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom';
  opacity?: number;
}

const MDTypography: React.FC<IMDTypographyProps> = ({ 
  color = 'dark', 
  fontWeight = 'regular', 
  textTransform = 'none',
  verticalAlign = 'unset',
  opacity = 1,
  children,
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
    text: '#757575',
  };

  const fontWeightMap = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  };

  return (
    <Typography
      {...rest}
      sx={{
        color: colorMap[color] || color,
        fontWeight: fontWeightMap[fontWeight],
        textTransform,
        verticalAlign,
        opacity,
        ...rest.sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default MDTypography;