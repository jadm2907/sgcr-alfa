import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardLayout from './DashboardLayout';
import Footer from './Footer';
import Sidenav from './Sidenav';
import { useMaterialUIController } from '../../contexts';
import MDBox from '../MDBox'; // Adjust the path based on the actual location of MDBox

const MainLayout: React.FC = () => {
  const controller = useMaterialUIController();
  const { sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;

  return (
    <DashboardLayout>
      <DashboardNavbar onSidebarToggle={() => console.log('Sidebar toggled')} />
      <Sidenav
        color={sidenavColor}
        brand="SGCR-Alfa"
        // brandName removed as it is not part of SidenavProps
        routes={[]} // Aquí irán tus rutas
        // Removed transparent as it is not part of SidenavProps
        /* Removed white as it is not part of SidenavProps */
        // darkMode={darkMode} // Removed as it is not part of SidenavProps
      />
      <MDBox position="relative">
        <Outlet /> {/* Esto renderizará las páginas hijas */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default MainLayout;