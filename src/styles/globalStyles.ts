import { createStyles, makeStyles } from '@mui/styles';

export const useGlobalStyles = makeStyles(() =>
  createStyles({
    '@global': {
      body: {
        margin: 0,
        padding: 0,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '.MuiDataGrid-root': {
        border: 'none !important',
      },
    },
  })
);