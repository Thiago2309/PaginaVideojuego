import React, { useState } from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import Image_Register from "../../assets/images/Login_and_Register/Image_Login.jpeg";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
const defaultTheme = createTheme();

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertState {
  type: AlertType;
  message: string;
}


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      usuarioNombre: "",
      correo: "",
      contraseña: "",
      confirmPassword: "",
      fkRol: 1, 
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre Requerido"),
      apellido: Yup.string().required("Apellido Requerido"),
      usuarioNombre: Yup.string().required("Nombre de Usuario Requerido"),
      correo: Yup.string().email("Correo electrónico inválido").required("Correo requerido"),
      contraseña: Yup.string().required("Contraseña requerida"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("contraseña")], "Las contraseñas deben coincidir")
        .required("Confirmar contraseña requerida"),
      fkRol: Yup.number().required("Rol requerido").oneOf([1], "Rol inválido"), 
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          nombre: values.nombre,
          apellido: values.apellido,
          usuarioNombre: values.usuarioNombre,
          correo: values.correo,
          contraseña: values.contraseña,
          fkRol: values.fkRol,
        };

        await axios.post('https://localhost:7029/Usuarios/RegistroDeUsuario', payload);
        setAlert({ type: 'success', message: 'Inicio de sesión exitoso' });
        setOpen(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirigir después de 2 segundos
      } catch (error) {
        console.error("Error durante el registro:", error);
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
          }}
        >
          <Box
            sx={{
              my: "auto",
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
              Registrarse
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="name"
                autoFocus
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
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
                id="apellido"
                label="Apellidos"
                name="apellido"
                autoComplete="lastname"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                helperText={formik.touched.apellido && formik.errors.apellido}
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
                id="usuarioNombre"
                label="Nombre de Usuario"
                name="usuarioNombre"
                autoComplete="userName"
                value={formik.values.usuarioNombre}
                onChange={formik.handleChange}
                error={formik.touched.usuarioNombre && Boolean(formik.errors.usuarioNombre)}
                helperText={formik.touched.usuarioNombre && formik.errors.usuarioNombre}
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
                id="correo"
                label="Correo Electrónico"
                name="correo"
                autoComplete="email"
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
                error={formik.touched.contraseña && Boolean(formik.errors.contraseña)}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                Registrarse
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#ffffff" }}
                  >
                    ¿Cuentas ya con una cuenta?{" "}
                    <Link component={RouterLink} to="/login" variant="body2" sx={{ color: "#E10AAB" }}>
                      Iniciar Sesión
                    </Link>
                  </Typography>
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
            backgroundImage: `url(${Image_Register})`,
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
            backgroundColor: '#000000', // Fondo negro
            color: '#ffffff', 
            fontSize: '1em',
            padding: '10px',
            border: `2px solid ${alert?.type === 'error' ? '#FF3860' : '#E10AAB'}`, // Borde rojo para error, rosa neón para éxito
            "& .MuiAlert-icon": {
              color: alert?.type === 'error' ? '#FF3860' : '#E10AAB', // Color rojo para error, rosa neón para éxito
            }
          }}
        >
          <AlertTitle>{alert?.type === 'success' ? 'Correcto' : 'Error'}</AlertTitle> {/* Cambio de texto */}
          {alert?.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Register;

