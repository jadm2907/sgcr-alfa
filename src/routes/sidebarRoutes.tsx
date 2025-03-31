import { type RouteItem } from '../components/layout/Sidenav';
import People from '@mui/icons-material/People';
import MedicalServices from '@mui/icons-material/MedicalServices';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Assessment from '@mui/icons-material/Assessment';
import Settings from '@mui/icons-material/Settings';
import Home from '@mui/icons-material/Home';
import Group from '@mui/icons-material/Group';
import LocalHospital from '@mui/icons-material/LocalHospital';
import Timeline from '@mui/icons-material/Timeline';
import ExitToApp from '@mui/icons-material/ExitToApp';

const sidebarRoutes: RouteItem[] = [
  {
    key: 'dashboard',
    name: 'Inicio',
    path: '/dashboard',
    icon: <Home />,
    exact: true
  },
  {
    key: 'pacientes',
    name: 'Pacientes',
    path: '/pacientes',
    icon: <People />,
    children: [
      {
        key: 'lista-pacientes',
        name: 'Lista de Pacientes',
        path: '/pacientes/lista',
        icon: <Group />
      },
      {
        key: 'nuevo-paciente',
        name: 'Nuevo Paciente',
        path: '/pacientes/nuevo',
        icon: <People />
      },
      {
        key: 'progreso-pacientes',
        name: 'Progreso',
        path: '/pacientes/progreso',
        icon: <Timeline />
      }
    ]
  },
  {
    key: 'tratamientos',
    name: 'Tratamientos',
    path: '/tratamientos',
    icon: <MedicalServices />,
    children: [
      {
        key: 'programas',
        name: 'Programas',
        path: '/tratamientos/programas',
        icon: <LocalHospital />
      },
      {
        key: 'terapias',
        name: 'Terapias',
        path: '/tratamientos/terapias',
        icon: <MedicalServices />
      }
    ]
  },
  {
    key: 'calendario',
    name: 'Calendario',
    path: '/calendario',
    icon: <CalendarToday />,
    exact: true
  },
  {
    key: 'reportes',
    name: 'Reportes',
    path: '/reportes',
    icon: <Assessment />,
    exact: true
  },
  {
    key: 'administracion',
    name: 'Administración',
    path: '/admin',
    icon: <Settings />,
    adminOnly: true,
    children: [
      {
        key: 'usuarios',
        name: 'Usuarios',
        path: '/admin/usuarios',
        icon: <Group />,
        adminOnly: true
      },
      {
        key: 'configuracion',
        name: 'Configuración',
        path: '/admin/configuracion',
        icon: <Settings />,
        adminOnly: true
      }
    ]
  },
  {
    key: 'salir',
    name: 'Cerrar Sesión',
    path: '/logout',
    icon: <ExitToApp />,
    exact: true,
    bottom: true // Para mostrar al final del sidebar
  }
];

export default sidebarRoutes;