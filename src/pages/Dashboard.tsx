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

const Dashboard: React.FC = () => {
    return (
      <DashboardLayout>
        <DashboardNavbar onSidebarToggle={() => console.log('Sidebar toggled')} />
        <MDBox py={3}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item={true} xs={12} md={6} lg={3}>
                <StatisticsCard
                  title="Pacientes Activos"
                  count="24"
                  percentage={{ color: "success", value: 12 }}
                  icon="people"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatisticsCard
                  title="Tratamientos"
                  count="48"
                  percentage={{ color: "success", value: 8 }}
                  icon="medical_services"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatisticsCard
                  title="Sesiones Hoy"
                  count="5"
                  percentage={{ color: "error", value: -2 }}
                  icon="event"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <StatisticsCard
                  title="Altas Recientes"
                  count="3"
                  percentage={{ color: "success", value: 3 }}
                  icon="celebration"
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={8}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h5">Progreso Mensual</MDTypography>
                    <ProgressLineChart />
                  </MDBox>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h5">Distribución por Fase</MDTypography>
                    {/* Aquí iría un gráfico de donut */}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  };
  
  export default Dashboard;