import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Image_Login from "../../assets/images/Login_and_Register/Image_Login.jpeg";
import { useDispatch } from 'react-redux'; 
import { loginUser } from '../../store/reducers/userReducer';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Logo1 from '../../assets/images/logo.png';

const defaultTheme = createTheme();

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertState {
  type: AlertType;
  message: string;
}

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const formik = useFormik({
    initialValues: {
      correo: "",
      contraseña: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Correo electrónico inválido")
        .required("Requerido"),
      contraseña: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://localhost:7029/Usuarios/Login', {
          correo: values.correo,
          contraseña: values.contraseña,
        });
        dispatch(loginUser(response.data.result)); 
        console.log('Respuesta del backend:', response.data);
        setAlert({ type: 'success', message: 'Inicio de sesión exitoso' });
        setOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        setAlert({ type: 'error', message: 'Error durante el inicio de sesión' });
        setOpen(true);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            background: "#080317",
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}>
              <Link component={RouterLink} to="/" sx={{ display: 'block' }}>
                <img src={Logo1} alt="logo" style={{ height: '40px', margin: '10px' }} />
              </Link>
            </Box>
          </Toolbar>
          <Box
            sx={{
              my: 'auto',
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              component="h4"
              variant="h4"
              align="left"
              sx={{ width: "100%", color: "#ffffff" }}
            >
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="correo"
                label="Correo Electrónico"
                name="correo"
                autoComplete="email"
                autoFocus
                value={formik.values.correo}
                onChange={formik.handleChange}
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
                sx={{
                  "& label": {
                    color: "#ffffff",
                  },
                  "& input": {
                    color: "#ffffff",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff",
                      boxShadow: "0px 0px 10px 2px rgba(224, 10, 171, 0.4)",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="contraseña"
                autoComplete="current-password"
                value={formik.values.contraseña}
                onChange={formik.handleChange}
                error={
                  formik.touched.contraseña && Boolean(formik.errors.contraseña)
                }
                helperText={formik.touched.contraseña && formik.errors.contraseña}
                sx={{
                  "& label": {
                    color: "#ffffff",
                  },
                  "& input": {
                    color: "#ffffff",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ffffff",
                      boxShadow: "0px 0px 10px 2px rgba(224, 10, 171, 0.4)",
                    },
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{ "&.Mui-checked": { color: "#ffffff" } }}
                  />
                }
                label="Recuérdame"
                sx={{
                  color: "#ffffff",
                  justifyContent: "flex-start",
                  width: "100%",
                  "& .MuiSvgIcon-root": {
                    color: "#ffffff",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#E10AAB",
                  boxShadow: "0px 0px 10px 2px rgba(224, 10, 171, 0.4)",
                }}
              >
                Iniciar Sesión
              </Button>
              {loginError && (
                <Typography variant="body2" color="error" align="center">
                  {loginError}
                </Typography>
              )}
              <Grid container justifyContent="center">
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#ffffff" }}
                    >
                      ¿Todavía no tienes una cuenta?{" "}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="body2"
                      >
                        Registrarse
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${Image_Login})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "-20px 0px 20px rgba(0, 0, 0, 0.6)",
          }}
        />
      </Grid>
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Parte superior derecha
        sx={{ width: '30%' }} // Tamaño reducido
      >
        <Alert 
          onClose={handleClose} 
          severity={alert?.type} 
          sx={{ 
            backgroundColor: `${alert?.type === 'error' ? '#FF3860' : '#1AA197'}`, // Fondo negro
            color: '#ffffff', 
            fontSize: '1.2rem', // Tamaño de fuente aumentado
            border: `1px solid ${alert?.type === 'error' ? '#FF3860' : '#1AA197'}`, // Borde blanco
            boxShadow: `0px 0px 10px 2px ${alert?.type === 'error' ? 'rgba(255, 0, 0, 0.4)' : 'rgba(26, 161, 151, 0.4)'}`, // Sombra del cuadro
            padding: '16px', // Espaciado interno
          }}
        >
          <AlertTitle>{alert?.type === 'error' ? 'Error' : 'Éxito'}</AlertTitle>
          {alert?.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
