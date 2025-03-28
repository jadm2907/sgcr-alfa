import React from 'react';
import { Link, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MDBox from '../MDBox';
import MDTypography from '../MDTypography';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MDBox display="flex" alignItems="center">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <MDTypography key={name} variant="button" fontWeight="regular" color="text">
            {name}
          </MDTypography>
        ) : (
          <React.Fragment key={name}>
            <Link href={routeTo}>
              <MDTypography variant="button" fontWeight="regular" color="text">
                {name}
              </MDTypography>
            </Link>
            <MDBox mx={1}>
              <Typography>/</Typography>
            </MDBox>
          </React.Fragment>
        );
      })}
    </MDBox>
  );
};

export default Breadcrumbs;