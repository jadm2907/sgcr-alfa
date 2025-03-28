import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMaterialUIController } from '../../contexts';
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import Breadcrumbs from './Breadcrumbs';

interface IDashboardNavbarProps {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
  onSidebarToggle: () => void;
  children?: React.ReactNode;
}

const DashboardNavbar: React.FC<IDashboardNavbarProps> = ({ 
  absolute = false, 
  light = false, 
  isMini = false,
  onSidebarToggle,
  children 
}) => {
  const controller = useMaterialUIController();
  const { transparentNavbar, fixedNavbar, darkMode } = controller;

  return (
    <AppBar
      position={absolute ? 'absolute' : fixedNavbar ? 'fixed' : 'static'}
      color="inherit"
      sx={{
        backgroundColor: transparentNavbar
          ? 'transparent !important'
          : light
          ? '#F8F9FA !important'
          : darkMode
          ? '#212121 !important'
          : '#FFFFFF !important',
        boxShadow: 'none',
        borderBottom: light && !darkMode ? '1px solid #F0F2F5' : '1px solid #E0E0E0',
        padding: '0.5rem 1rem',
      }}
    >
      <Toolbar sx={{ minHeight: '50px !important' }}>
        <MDBox display="flex" alignItems="center">
          <IconButton
            size="small"
            color="inherit"
            onClick={onSidebarToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <MDTypography
            variant="h6"
            fontWeight="medium"
            color={light && !darkMode ? 'dark' : 'text'}
          >
            SGCR-Alfa
          </MDTypography>
          <Breadcrumbs />
        </MDBox>
        <MDBox width="100%" display="flex" justifyContent="flex-end">
          {children}
        </MDBox>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;