import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';
import MDInput from '../components/MDInput'; // Updated the path to match the correct location
import MDButton from '../components/MDButton';
import Card from '@mui/material/Card';
import bgImage from '../assets/images/bg-sign-in-basic.jpeg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card sx={{ width: 400, p: 3, opacity: 0.95 }}>
        <MDTypography variant="h4" textAlign="center" mb={3} color="primary">
          SGCR-Alfa
        </MDTypography>
        <MDTypography variant="body2" textAlign="center" mb={3}>
          Sistema de Gestión de Centros de Rehabilitación
        </MDTypography>
        {error && (
          <MDTypography color="error" textAlign="center" mb={2}>
            {error}
          </MDTypography>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </MDBox>
          <MDBox mb={3}>
            <MDInput
              type="password"
              label="Contraseña"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </MDBox>
          <MDButton type="submit" customColor="primary" fullWidth>
            Iniciar Sesión
          </MDButton>
        </form>
      </Card>
    </MDBox>
  );
};

export default Login;