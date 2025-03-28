import React from 'react';
import { Card, Box, Typography, useTheme } from '@mui/material';
import { PaletteColor } from '@mui/material/styles';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

interface StatisticsCardProps {
  title: string;
  count: string | number;
  percentage?: {
    value: number;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
  icon?: React.ReactNode;
  iconColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  chart?: React.ReactNode;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  count,
  percentage,
  icon,
  iconColor = 'primary',
  chart
}) => {
  const theme = useTheme();

  const getColor = (color?: string) => {
    if (!color) return theme.palette.primary.main;
    const paletteColor = theme.palette[color as keyof typeof theme.palette];
    return (color in theme.palette && paletteColor !== null && typeof paletteColor === 'object' && 'main' in paletteColor
      ? (paletteColor as PaletteColor).main
      : color) || color;
  };

  const isPositive = percentage ? percentage.value >= 0 : true;

  return (
    <Card sx={{ 
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows[3],
      '&:hover': {
        boxShadow: theme.shadows[6]
      }
    }}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
            {count}
          </Typography>
          {percentage && (
            <Box display="flex" alignItems="center">
              {isPositive ? (
                <ArrowUpward sx={{ 
                  color: getColor(percentage.color), 
                  fontSize: '1rem',
                  mr: 0.5
                }} />
              ) : (
                <ArrowDownward sx={{ 
                  color: getColor(percentage.color), 
                  fontSize: '1rem',
                  mr: 0.5
                }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: getColor(percentage.color) }}
              >
                {Math.abs(percentage.value)}%
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ ml: 0.5 }}>
                vs último mes
              </Typography>
            </Box>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              backgroundColor: getColor(iconColor) + '20',
              color: getColor(iconColor),
              width: 56,
              height: 56,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
      {chart && (
        <Box sx={{ mt: 2, flexGrow: 1 }}>
          {chart}
        </Box>
      )}
    </Card>
  );
};

export default StatisticsCard;