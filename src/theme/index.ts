import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8', // Azul profesional
      contrastText: '#fff',
    },
    secondary: {
      main: '#4CAF50', // Verde para salud/rehabilitación
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    // Personaliza más según necesites
  },
});

export default theme;