import * as React from 'react';
import { AppBar, Toolbar, IconButton, Menu, Container, Avatar, Button, Tooltip, MenuItem, Box, Typography, Link, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo1 from '../../assets/images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logoutUser } from '../../store/reducers/userReducer';
import { Link as RouterLink } from 'react-router-dom';

const pages = ['Populares', 'Novedades', 'Ofertas', 'Noticias'];
const settings = ['Perfil', 'Ajustes', 'Dashboard', 'Cerrar Sesión'];
const pages = [
  { name: 'Populares', path: '/populares' },
  { name: 'Novedades', path: '/novedades' },
  { name: 'Ofertas', path: '/ofertas' }
];

const settings = [
  { name: 'Perfil', path: '/profile' },
  { name: 'Ajustes', path: '/ajustes' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Cerrar Sesión', path: '/logout' }
];

function Navegador() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.user); 
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleCloseUserMenu(); 
  };

  return (
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link component={RouterLink} to="/" sx={{ display: 'block' }}>
              <img src={Logo1} alt="logo" style={{ height: '40px' }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={RouterLink} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                </Stack>
              </IconButton>
            </Tooltip>
            <Typography variant="body1" sx={{ color: 'white', marginLeft: '8px' }}>
              {user.userName}
            </Typography>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.name === 'Cerrar Sesión' ? handleLogout : handleCloseUserMenu} component={RouterLink} to={setting.path}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
  );
}

export default Navegador;
