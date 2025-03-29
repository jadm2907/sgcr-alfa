import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MDBox from '../components/MDBox';
import MDTypography from '../components/MDTypography';
import MDInput from '../components/MDInput';
import MDButton from '../components/MDButton';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import bgImage from '../assets/images/bg-sign-in-basic.jpeg';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import { Typography, Stack, useTheme } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      console.log('Registrando usuario:', { registerName, registerEmail, registerPassword });
      setRegisterError('');
      alert('Registro exitoso! Por favor inicia sesión.');
      setActiveTab('login');
    } catch (err) {
      setRegisterError('Error al registrar el usuario');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Autenticando con ${provider}`);
    alert(`Redirigiendo a proveedor de autenticación: ${provider}`);
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
      <Card sx={{ 
        width: 450, 
        p: 4, 
        borderRadius: 3,
        boxShadow: theme.shadows[10],
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Bienvenido
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sistema Gestión Centros de Rehabilitación
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <MDButton
              fullWidth
              customVariant={activeTab === 'login' ? 'contained' : 'text'}
              customColor={activeTab === 'login' ? 'primary' : undefined}
              onClick={() => setActiveTab('login')}
              sx={{ borderRadius: 1 }}
            >
              Iniciar Sesión
            </MDButton>
            <MDButton
              fullWidth
              customVariant={activeTab === 'register' ? 'contained' : 'text'}
              customColor={activeTab === 'register' ? 'primary' : undefined}
              onClick={() => setActiveTab('register')}
              sx={{ borderRadius: 1 }}
            >
              Crear Cuenta
            </MDButton>
          </Stack>
        </Box>

        {activeTab === 'login' ? (
          <Box>
            {loginError && (
              <MDTypography color="error" textAlign="center" mb={2}>
                {loginError}
              </MDTypography>
            )}
            
            <Stack spacing={2} mb={3}>
              <MDButton 
                customVariant="outlined"
                fullWidth 
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('google')}
                sx={{ 
                  backgroundColor: 'white',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                Continuar con Google
              </MDButton>
              
              <MDButton 
                customVariant="outlined"
                fullWidth 
                startIcon={<MicrosoftIcon />}
                onClick={() => handleSocialLogin('microsoft')}
                sx={{ 
                  backgroundColor: 'white',
                  color: 'text.primary',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                Continuar con Microsoft
              </MDButton>
            </Stack>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">o usa tu email</Typography>
            </Divider>
            
            <form onSubmit={handleLoginSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Correo electrónico"
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
              <MDButton 
                type="submit" 
                customVariant="contained"
                customColor="primary"
                fullWidth
                sx={{ mb: 2, height: 48 }}
              >
                Iniciar sesión
              </MDButton>
            </form>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" textAlign="center" mb={3} color="text.secondary">
              Únete a nuestra comunidad
            </Typography>
            
            {registerError && (
              <MDTypography color="error" textAlign="center" mb={2}>
                {registerError}
              </MDTypography>
            )}
            
            <form onSubmit={handleRegisterSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Nombre completo"
                  fullWidth
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Correo electrónico"
                  fullWidth
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Contraseña"
                  fullWidth
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={3}>
                <MDInput
                  type="password"
                  label="Confirmar contraseña"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </MDBox>
              <MDButton 
                type="submit" 
                customVariant="contained"
                customColor="primary"
                fullWidth
                sx={{ height: 48 }}
              >
                Registrarse
              </MDButton>
            </form>
            
            <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
              ¿Ya tienes una cuenta?{' '}
              <Typography 
                component="span" 
                color="primary" 
                sx={{ cursor: 'pointer' }}
                onClick={() => setActiveTab('login')}
              >
                Inicia sesión
              </Typography>
            </Typography>
          </Box>
        )}
      </Card>
    </MDBox>
  );
};

export default Login;