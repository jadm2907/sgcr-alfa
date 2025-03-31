import React from 'react';
import Sidenav from './Sidenav';
import { useMaterialUIController } from '../../contexts';
import routes from '../../routes/sidebarRoutes'; // Corrected path

const CustomSidenav: React.FC = () => {
  const controller = useMaterialUIController();
  const { sidenavColor, transparentSidenav, whiteSidenav, darkMode, sidenavType } = controller;

  // Map "light" to "white" (or another valid value), or filter invalid values
  const validSidenavType = 
    sidenavType === "light" ? "white" : // convert "light" to "white"
    ["dark", "white", "transparent"].includes(sidenavType as string) ? sidenavType : 
    undefined;

  return (
    <Sidenav
      color={sidenavColor}
      brand="SGCR-Alfa"
      brandName="Sistema de Rehabilitación"
      routes={routes}
      transparent={transparentSidenav}
      white={whiteSidenav}
      darkMode={darkMode}
      sidenavType={validSidenavType}
    />
  );
};

export default CustomSidenav;