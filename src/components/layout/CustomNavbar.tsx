import React from 'react';
import { useAuth } from '../../contexts/AuthContextBAK';
import MDBox from '/home/debian/Documentos/sgcr-alfa/src/components/MDBox'; // Ensure the file '../MDBox' exists or update the path to the correct location
import MDTypography from '/home/debian/Documentos/sgcr-alfa/src/components/MDTypography';
import MDButton from '/home/debian/Documentos/sgcr-alfa/src/components/MDButton';
import DashboardNavbar from '/home/debian/Documentos/sgcr-alfa/src/components/layout/DashboardNavbar';

const CustomNavbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <DashboardNavbar onSidebarToggle={() => console.log('Sidebar toggled')}>
      <MDBox display="flex" alignItems="center" ml="auto">
        {user && (
          <MDTypography variant="button" fontWeight="medium" color="text">
            {user.name} ({user.role})
          </MDTypography>
        )}
        <MDBox ml={2}>
          <MDButton customVariant="gradient" customColor="error" onClick={logout}>
            Cerrar sesión
          </MDButton>
        </MDBox>
      </MDBox>
    </DashboardNavbar>
  );
};

export default CustomNavbar;