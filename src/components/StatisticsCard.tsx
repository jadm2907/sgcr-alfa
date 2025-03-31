import React from 'react';
import MDBox from './ui/MDBox';
import MDTypography from './ui/MDTypography';
import Icon from '@mui/material/Icon';

interface IStatisticsCardProps {
  title: string;
  count: string;
  percentage: {
    color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
    value: string;
  };
  icon: string;
}

const StatisticsCard: React.FC<IStatisticsCardProps> = ({ title, count, percentage, icon }) => {
  return (
    <MDBox p={2} bgColor="white" borderRadius="lg" shadow="md">
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox>
          <MDTypography variant="button" color="text" fontWeight="medium">
            {title}
          </MDTypography>
          <MDTypography variant="h5" fontWeight="bold">
            {count}
          </MDTypography>
        </MDBox>
        <MDBox
          bgColor={percentage.color}
          color="white"
          width="4rem"
          height="4rem"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          shadow="md"
        >
          <Icon fontSize="medium">{icon}</Icon>
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <MDTypography
          component="p"
          variant="button"
          color={percentage.color}
          fontWeight="medium"
          display="flex"
          alignItems="center"
        >
          <Icon sx={{ mr: 0.5 }}>arrow_upward</Icon>
          {percentage.value}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
};

export default StatisticsCard;