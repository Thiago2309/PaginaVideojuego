import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import Image_Register from "../../assets/images/Login_and_Register/Image_Login.jpeg";

const defaultTheme = createTheme();

const Register: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      auth.login();
      navigate("/");
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
                id="fullName"
                label="Nombre completo"
                name="fullName"
                autoComplete="fullName"
                autoFocus
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
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
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
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
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#ffffff" }}
                    >
                      ¿Cuentas ya con alguna cuenta?{" "}
                      <Link component={RouterLink} to="/login" variant="body2">
                        Iniciar Sesión
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
    </ThemeProvider>
  );
};

export default Register;
