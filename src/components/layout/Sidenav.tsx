import React from 'react';
import {
  Drawer,
  Box,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  styled,
  Collapse
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useMaterialUIController } from '../../contexts';
import { useAuth } from '../../contexts/AuthContext';
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import MedicalServices from '@mui/icons-material/MedicalServices';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Assessment from '@mui/icons-material/Assessment';
import Settings from '@mui/icons-material/Settings';
import Group from '@mui/icons-material/Group';
import LocalHospital from '@mui/icons-material/LocalHospital';
import Timeline from '@mui/icons-material/Timeline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import logo from '../../assets/images/logo-small.png';
import logoDark from '../../assets/images/logo-small-dark.png';

// Tipo para las rutas
export interface RouteItem {
  key: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  exact?: boolean;
  adminOnly?: boolean;
  bottom?: boolean;
  children?: RouteItem[];
}

// Tipo para el usuario
interface User {
  avatar: string;
  name: string;
  role: string;
}

// Props del componente
interface SidenavProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  brand: string | React.ReactNode; // Permite string o un nodo React para la marca
  brandName: string; // Agregamos la prop brandName
  routes: RouteItem[];
  transparent?: boolean;
  white?: boolean;
  miniSidenav?: boolean;
  darkMode?: boolean;
  sidenavType?: 'dark' | 'transparent' | 'white';
  mobileView?: boolean;
  user?: User | null;
}

// Estilo personalizado para los items activos
const ActiveListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const Sidenav: React.FC<SidenavProps> = ({
  color = 'primary',
  brand = logo,
  brandName = 'SGCR-Alfa', // Valor por defecto para brandName
  routes = [],
  transparent = false,
  white = false,
  miniSidenav: initialMiniSidenav = false,
  darkMode = false,
  sidenavType = 'dark',
  mobileView = false,
  user
}) => {
  const controller = useMaterialUIController();
  const {
    miniSidenav,
    transparentSidenav,
    darkMode: controllerDarkMode,
    sidenavType: controllerSidenavType
  } = controller;
  const { pathname } = useLocation();
  const theme = useTheme();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  // Cerrar el sidenav en móvil al seleccionar una ruta
  const handleItemClick = () => {
    if (window.innerWidth < 1200) {
      controller.setMiniSidenav(true);
    }
  };

  // Manejar submenús
  const handleSubmenuToggle = (key: string) => {
    setOpenSubmenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filtrar rutas por rol y posición
  const filteredRoutes = routes.filter(route => {
    if (route.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  const regularRoutes = filteredRoutes.filter(route => !route.bottom);
  const bottomRoutes = filteredRoutes.filter(route => route.bottom);

  // Renderizar los items del menú
  const renderNavItems = ({ items, depth = 0 }: { items: RouteItem[], depth?: number }) => {
    return items.map(({ key, name, path, icon, children }) => {
      const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
      const hasChildren = children && children.length > 0;
      const isSubmenuOpen = openSubmenus[key] || isActive;

      if (hasChildren) {
        return (
          <React.Fragment key={key}>
            <ListItem
              component={NavLink} // Usar NavLink para la navegación
              to="#" // Puedes usar un enlace temporal o manejar el toggle programáticamente
              onClick={() => handleSubmenuToggle(key)}
              sx={{
                pl: depth > 0 ? theme.spacing(4) : theme.spacing(3),
                mb: 0.5,
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {icon}
              </ListItemIcon>
              {!miniSidenav && (
                <>
                  <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 'medium' : 'regular',
                      color: isActive ? theme.palette.primary.main : 'inherit'
                    }}
                  />
                  {isSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItem>
            <Collapse in={miniSidenav ? false : isSubmenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavItems({ items: children || [], depth: depth + 1 })}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      const listItemContent = (
        <>
          <ListItemIcon sx={{ minWidth: 36 }}>
            {icon}
          </ListItemIcon>
          {!miniSidenav && (
            <ListItemText
              primary={name}
              primaryTypographyProps={{
                fontWeight: isActive ? 'medium' : 'regular',
                color: isActive ? theme.palette.primary.main : 'inherit'
              }}
            />
          )}
        </>
      );

      return (
        <Box key={key}>
          <Tooltip title={miniSidenav ? name : ''} placement="right">
            {isActive ? (
              <ActiveListItem
                components={NavLink}
                to={path}
                onClick={handleItemClick}
                sx={{
                  pl: depth > 0 ? theme.spacing(4) : theme.spacing(3),
                  mb: 0.5
                }}
              >
                {listItemContent}
              </ActiveListItem>
            ) : (
              <ListItem
                component={NavLink}
                to={path}
                onClick={handleItemClick}
                sx={{
                  pl: depth > 0 ? theme.spacing(4) : theme.spacing(3),
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {listItemContent}
              </ListItem>
            )}
          </Tooltip>
        </Box>
      );
    });
  };

  // Renderizar la marca (logo o nombre)
  const renderBrand = () => {
    if (typeof brand === 'string') {
      return (
        <img
          src={darkMode ? brandDark : brand}
          alt="Logo SGCR-Alfa"
          style={{
            width: miniSidenav ? 40 : 120,
            transition: 'all 0.2s ease-in-out'
          }}
        />
      );
    }

    return brand; // Si brand es un nodo React
  };

  return (
    <Drawer
      variant="permanent"
      open={!miniSidenav}
      sx={{
        '& .MuiDrawer-paper': {
          width: miniSidenav ? 80 : 250,
          backgroundColor: transparentSidenav
            ? 'transparent'
            : darkMode
            ? theme.palette.background.default
            : sidenavType === 'white'
            ? theme.palette.background.paper
            : theme.palette.background.default,
          border: 'none',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <MDBox
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        {/* Encabezado */}
        <Box>
          <MDBox
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {renderBrand()}
          </MDBox>

          {/* Menú de navegación principal */}
          <List component="nav" sx={{ px: 1, flexGrow: 1 }}>
            {renderNavItems({ items: regularRoutes })}
          </List>
        </Box>

        {/* Menú inferior (ej. Cerrar sesión) */}
        {bottomRoutes.length > 0 && (
          <Box>
            <Divider />
            <List component="nav" sx={{ px: 1 }}>
              {renderNavItems({ items: bottomRoutes })}
            </List>
          </Box>
        )}

        {/* Pie de página - Información del usuario */}
        {user && (
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent={miniSidenav ? 'center' : 'flex-start'}
              sx={{ mb: 1 }}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              {!miniSidenav && (
                <MDBox ml={2}>
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    color={darkMode ? 'white' : 'text.primary'}
                  >
                    {user.name}
                  </MDTypography>
                  <MDTypography
                    variant="caption"
                    color={darkMode ? 'text.secondary' : 'text.secondary'}
                    display="block"
                  >
                    {user.role}
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
          </Box>
        )}
      </MDBox>
    </Drawer>
  );
};

export default Sidenav;