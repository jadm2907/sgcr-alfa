import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface IMDBoxProps extends BoxProps {
  children: React.ReactNode;
  bgColor?: string;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?: string;
}

const MDBox: React.FC<IMDBoxProps> = ({ 
  children, 
  bgColor = 'transparent', 
  borderRadius = 'none', 
  shadow = 'none',
  coloredShadow = 'none',
  ...rest 
}) => {
  return (
    <Box
      {...rest}
      sx={{
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        boxShadow: shadow,
        position: 'relative',
        border: 'none',
        overflow: 'visible',
        ...(coloredShadow !== 'none' && {
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: borderRadius,
            boxShadow: coloredShadow,
            zIndex: -1,
          },
        }),
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default MDBox;