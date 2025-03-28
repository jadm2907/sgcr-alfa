import React from 'react';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';
import Card from '@mui/material/Card';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import DataTable from '../components/DataTable';
import MDButton from '../components/MDButton';
import { useState as reactUseState } from 'react';

interface ITratamiento {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  frecuencia: string;
  pacientes: number;
}

const Tratamientos: React.FC = () => {
  const [tratamientos] = useState<ITratamiento[]>([
    {
      id: '1',
      nombre: 'Terapia Cognitivo-Conductual',
      descripcion: 'Enfoque en modificar pensamientos y comportamientos',
      duracion: '12 semanas',
      frecuencia: '2 sesiones/semana',
      pacientes: 15,
    },
    // Más tratamientos...
  ]);

  const columns = [
    { id: 'nombre', label: 'Nombre', Header: 'Nombre', accessor: 'nombre' },
    { id: 'descripcion', label: 'Descripción', Header: 'Descripción', accessor: 'descripcion' },
    { id: 'duracion', label: 'Duración', Header: 'Duración', accessor: 'duracion' },
    { id: 'frecuencia', label: 'Frecuencia', Header: 'Frecuencia', accessor: 'frecuencia' },
    { id: 'pacientes', label: 'Pacientes', Header: 'Pacientes', accessor: 'pacientes' },
    {
      id: 'acciones',
      label: 'Acciones',
      Header: 'Acciones',
      accessor: 'actions',
      Cell: () => (
        <MDBox display="flex" gap={1}>
          <MDButton customVariant="outlined" size="small">
            Detalles
          </MDButton>
          <MDButton customVariant="outlined" size="small">
            Editar
          </MDButton>
        </MDBox>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar onSidebarToggle={() => console.log('Sidebar toggled')} />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5">Gestión de Tratamientos</MDTypography>
              <MDButton customVariant="gradient">
                Nuevo Tratamiento
              </MDButton>
            </MDBox>
            <DataTable
              columns={columns}
              data={tratamientos}
              // entriesPerPage={10} // Removed as it is not a valid prop
            />
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Tratamientos;
function useState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    return reactUseState(initialState);
}
