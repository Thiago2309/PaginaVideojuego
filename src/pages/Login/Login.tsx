import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import Image_Login from "../../assets/images/Login_and_Register/Image_Login.jpeg";

const defaultTheme = createTheme();

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("Requerido"),
      password: Yup.string().required("Requerido"),
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
              Iniciar Sesión
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
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
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
    </ThemeProvider>
  );
};

export default Login;
