import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { useMaterialUIController, setMiniSidenav, setLayout } from '../../contexts';
import DashboardNavbar from './DashboardNavbar';
import Sidenav from '../layout/Sidenav';
import Footer from '../layout/Footer';
import { sidenavWidth, sidenavMiniWidth } from '../../theme/constants';
import { useAuth } from '../../contexts/AuthContextBAK';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

interface IMaterialUIController {
  miniSidenav: boolean;
  sidenavColor: string;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  darkMode: boolean;
  sidenavType: string;
  layout: string;
  [key: string]: any; // Para propiedades adicionales
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [controller, dispatch] = useMaterialUIController() as unknown as [IMaterialUIController, React.Dispatch<any>];
  const {
    miniSidenav,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavType,
    layout,
  } = controller;
  const [mobileView, setMobileView] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  // Establecer el layout y manejar responsive
  useEffect(() => {
    setLayout(dispatch, 'dashboard');
    
    if (isSmallScreen) {
      setMiniSidenav(dispatch, true);
      setMobileView(true);
    } else {
      setMiniSidenav(dispatch, false);
      setMobileView(false);
    }

    // Cuando la ruta cambia, en móvil cerramos el sidenav
    if (isSmallScreen && miniSidenav === false) {
      setMiniSidenav(dispatch, true);
    }
  }, [pathname, isSmallScreen, dispatch, miniSidenav]);

  // Configuración del layout principal
  const mainStyles = () => {
    let style = {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: miniSidenav ? sidenavMiniWidth : sidenavWidth,
      [theme.breakpoints.down('lg')]: {
        marginLeft: 0,
      },
    };

    if (layout === 'dashboard') {
      style = {
        ...style,
        paddingTop: '80px',
        minHeight: '100vh',
      };
    }

    return style;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Navbar */}
      <DashboardNavbar
        absolute={pathname === '/dashboard'}
        light={pathname === '/dashboard'}
        isMini={miniSidenav}
        onSidebarToggle={() => setMiniSidenav(dispatch, !miniSidenav)}
      />
      
      {/* Sidenav */}
      <Sidenav
        color={sidenavColor as "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | undefined}
        brand="SGCR-Alfa"
        brandName="Sistema de Gestión"
        routes={/* Tus rutas aquí */ []}
        user={user ? { 
          avatar: '',
          name: user.name || 'Guest', 
          role: user.role || 'Guest' 
        } : { 
          avatar: '',
          name: 'Guest', 
          role: 'Guest' 
        }}
        transparent={transparentSidenav}
        white={whiteSidenav}
        miniSidenav={miniSidenav}
        darkMode={darkMode}
        sidenavType={['dark', 'transparent', 'white'].includes(sidenavType) ? sidenavType as "dark" | "transparent" | "white" : undefined}
        mobileView={mobileView}
      />
      
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...mainStyles(),
          width: { lg: `calc(100% - ${miniSidenav ? sidenavMiniWidth : sidenavWidth}px)` },
        }}
      >
        {/* Contenedor del contenido */}
        <Box sx={{ p: 3 }}>
          {children || <Outlet />}
        </Box>
        
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;