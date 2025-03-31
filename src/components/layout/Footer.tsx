import React from 'react';
import MDBox from '../ui/MDBox';
import MDTypography from '../ui/MDTypography';

const Footer: React.FC = () => {
  return (
    <MDBox
      component="footer"
      py={3}
      px={2}
      mt="auto"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="button" color="text">
          © {new Date().getFullYear()} SGCR-Alfa
        </MDTypography>
        <MDBox display="flex">
          <MDTypography variant="button" color="text" sx={{ ml: 2 }}>
            Acerca de
          </MDTypography>
          <MDTypography variant="button" color="text" sx={{ ml: 2 }}>
            Contacto
          </MDTypography>
          <MDTypography variant="button" color="text" sx={{ ml: 2 }}>
            Términos
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default Footer;