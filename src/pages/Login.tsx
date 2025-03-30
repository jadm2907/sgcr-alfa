import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MDBox from '../components/ui/MDBox';
import MDTypography from '../components/ui/MDTypography';
import MDButton from '../components/ui/MDButton';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import bgImage from '../assets/images/bg-sign-in-basic.jpeg';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { Typography, Stack, useTheme, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../components/FormikInput';

// Esquemas de validación (se mantienen igual)
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .required('La contraseña es requerida')
});

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre completo es requerido'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .required('La contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Las contraseñas deben coincidir')
    .required('Debes confirmar tu contraseña')
});

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>('login');
  const [socialLoginError, setSocialLoginError] = React.useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (values: { email: string; password: string }, { setSubmitting, setErrors }: any) => {
    try {
      await login(values.email, values.password);
      setSnackbar({
        open: true,
        message: 'Inicio de sesión exitoso',
        severity: 'success'
      });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ password: 'Credenciales incorrectas' });
      setSnackbar({
        open: true,
        message: 'Error en las credenciales',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    try {
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registrando usuario:', values);
      setSnackbar({
        open: true,
        message: 'Registro exitoso! Por favor inicia sesión.',
        severity: 'success'
      });
      setActiveTab('login');
    } catch (err) {
      setErrors({ email: 'Error al registrar el usuario' });
      setSnackbar({
        open: true,
        message: 'Error al registrar el usuario',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoginError(`Redirigiendo a ${provider}`);
  };

  const handlePasswordRecovery = () => {
    setSnackbar({
      open: true,
      message: 'Se ha enviado un enlace de recuperación a tu correo',
      severity: 'success'
    });
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
        {/* Encabezado */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Bienvenido
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sistema Gestión Centros de Rehabilitación
          </Typography>
        </Box>

        {/* Switch entre Login y Registro */}
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

        {socialLoginError && (
          <MDTypography color="error" textAlign="center" mb={2}>
            {socialLoginError}
          </MDTypography>
        )}

        {activeTab === 'login' ? (
          <Box>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
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
                  
                  <FormikInput
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    disabled={isSubmitting}
                  />
                  
                  <FormikInput
                    name="password"
                    label="Contraseña"
                    type="password"
                    disabled={isSubmitting}
                  />
                  
                  <MDButton 
                    type="submit" 
                    customVariant="contained"
                    customColor="primary"
                    fullWidth
                    sx={{ mb: 2, height: 48 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Iniciar sesión'}
                  </MDButton>
                  
                  <Typography variant="body2" textAlign="center" mt={2}>
                    <Typography 
                      component="span" 
                      color="primary" 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                      onClick={handlePasswordRecovery}
                    >
                      ¿Olvidaste tu contraseña?
                    </Typography>
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" textAlign="center" mb={3} color="text.secondary">
              Únete a nuestra comunidad
            </Typography>
            
            <Formik
              initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={registerSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormikInput
                    name="name"
                    label="Nombre completo"
                    type="text"
                    disabled={isSubmitting}
                  />
                  
                  <FormikInput
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    disabled={isSubmitting}
                  />
                  
                  <FormikInput
                    name="password"
                    label="Contraseña"
                    type="password"
                    disabled={isSubmitting}
                  />
                  
                  <FormikInput
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    disabled={isSubmitting}
                  />
                  
                  <MDButton 
                    type="submit" 
                    customVariant="contained"
                    customColor="primary"
                    fullWidth
                    sx={{ height: 48 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
                  </MDButton>
                  
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
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Card>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MDBox>
  );
};

export default Login;