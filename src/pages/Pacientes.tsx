import React, { useState } from 'react';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';
import Card from '@mui/material/Card';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import DataTable from '../components/DataTable';
import MDButton from '../components/MDButton';
import MDInput from '../components/MDInput';
import Icon from '@mui/material/Icon';

interface IPaciente {
  id: string;
  nombre: string;
  edad: number;
  fechaIngreso: string;
  fase: string;
  progreso: number;
}

const Pacientes: React.FC = () => {
  const [search, setSearch] = useState('');
  const [pacientes] = useState<IPaciente[]>([
    {
      id: '1',
      nombre: 'Juan Pérez',
      edad: 32,
      fechaIngreso: '15/03/2023',
      fase: 'Fase 2',
      progreso: 65,
    },
    // Más pacientes...
  ]);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { id: 'nombre', label: 'Nombre', Header: 'Nombre', accessor: 'nombre' },
    { id: 'edad', label: 'Edad', Header: 'Edad', accessor: 'edad' },
    { id: 'fechaIngreso', label: 'Fecha Ingreso', Header: 'Fecha Ingreso', accessor: 'fechaIngreso' },
    { id: 'fase', label: 'Fase', Header: 'Fase', accessor: 'fase' },
    { id: 'progreso', label: 'Progreso', Header: 'Progreso', accessor: 'progreso', Cell: ({ value }: { value: number }) => `${value}%` },
    {
      id: 'acciones',
      label: 'Acciones',
      Header: 'Acciones',
      accessor: 'actions',
      Cell: () => (
        <MDBox display="flex" gap={1}>
          <MDButton customVariant="outlined" customColor="info" size="small">
            <Icon>visibility</Icon>
          </MDButton>
          <MDButton customVariant="outlined" customColor="primary" size="small">
            <Icon>edit</Icon>
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
              <MDTypography variant="h5">Gestión de Pacientes</MDTypography>
              <MDButton customVariant="contained" style={{ backgroundColor: 'primary' }}>
                Nuevo Paciente
              </MDButton>
            </MDBox>
            <MDBox p={3}>
              <MDInput
                fullWidth
                placeholder="Buscar paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon="search"
              />
            </MDBox>
            <DataTable
              columns={columns}
              data={filteredPacientes}
            />
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Pacientes;