import React from 'react';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardNavbar from '../components/layout/DashboardNavbar';
import Footer from '../components/layout/Footer';
import StatisticsCard from '../components/layout/StatisticsCard';
import ProgressLineChart from '../components/charts/ProgressLineChart';

// Definición de tipo para extender las props de Grid
interface CustomGridProps {
  item?: boolean;
  component?: React.ElementType;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  children?: React.ReactNode;
}

// Componente GridItem personalizado
const GridItem: React.FC<CustomGridProps> = ({ children, ...props }) => (
  <Grid {...props}>{children}</Grid>
);

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar onSidebarToggle={() => console.log('Sidebar toggled')} />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            {/* Item 1 - Pacientes Activos */}
            <GridItem item xs={12} sm={6} md={6} lg={3} component="div">
              <Card>
                <StatisticsCard
                  title="Pacientes Activos"
                  count="24"
                  percentage={{ color: "success", value: 12 }}
                  icon="people"
                />
              </Card>
            </GridItem>

            {/* Item 2 - Tratamientos */}
            <GridItem item xs={12} sm={6} md={6} lg={3} component="div">
              <Card>
                <StatisticsCard
                  title="Tratamientos"
                  count="48"
                  percentage={{ color: "success", value: 8 }}
                  icon="medical_services"
                />
              </Card>
            </GridItem>

            {/* Item 3 - Sesiones Hoy */}
            <GridItem item xs={12} sm={6} md={6} lg={3} component="div">
              <Card>
                <StatisticsCard
                  title="Sesiones Hoy"
                  count="5"
                  percentage={{ color: "error", value: -2 }}
                  icon="event"
                />
              </Card>
            </GridItem>

            {/* Item 4 - Altas Recientes */}
            <GridItem item xs={12} sm={6} md={6} lg={3} component="div">
              <Card>
                <StatisticsCard
                  title="Altas Recientes"
                  count="3"
                  percentage={{ color: "success", value: 3 }}
                  icon="celebration"
                />
              </Card>
            </GridItem>
          </Grid>
        </MDBox>
        
        <MDBox mb={3}>
          <Grid container spacing={3}>
            {/* Gráfico de Progreso Mensual */}
            <GridItem item xs={12} md={6} lg={8} component="div">
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h5">Progreso Mensual</MDTypography>
                  <ProgressLineChart />
                </MDBox>
              </Card>
            </GridItem>
            
            {/* Gráfico de Distribución */}
            <GridItem item xs={12} md={6} lg={4} component="div">
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h5">Distribución por Fase</MDTypography>
                  {/* Espacio reservado para gráfico de donut */}
                </MDBox>
              </Card>
            </GridItem>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;