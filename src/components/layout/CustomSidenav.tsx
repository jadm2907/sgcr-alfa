import React from 'react';
import Sidenav from './Sidenav';
import { useMaterialUIController } from '../../contexts';
import routes from '../../routes/sidebarRoutes'; // Corrected path

const CustomSidenav: React.FC = () => {
  const controller = useMaterialUIController();
  const { sidenavColor, transparentSidenav, whiteSidenav, darkMode, sidenavType } = controller;

  return (
    <Sidenav
      color={sidenavColor}
      brand="SGCR-Alfa"
      brandName="Sistema de Rehabilitación"
      routes={routes}
      transparent={transparentSidenav}
      white={whiteSidenav}
      darkMode={darkMode}
      sidenavType={["dark", "transparent", "white"].includes(sidenavType) ? sidenavType : undefined}
    />
  );
};

export default CustomSidenav;