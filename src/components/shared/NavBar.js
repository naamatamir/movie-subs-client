import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const isAdmin = decodedToken.isAdmin;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  let pages = ['Movies', 'Members'];

  if(isAdmin) {
    pages.unshift('Users');
  }
  pages.push('Log out');

  return (
    <AppBar position='sticky' sx={{ backgroundColor: '#845adf' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MovieFilterOutlinedIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: {
                xs: 'none',
                md: 'flex',
              },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.25rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Reel Control
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                page !== "Log out"
               ? <MenuItem
                  key={page}
                  component={Link}
                  to={`/${page}`}
                  onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                  : <MenuItem  key={page}
                  onClick={logout}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MovieFilterOutlinedIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.25rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Reel Control
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              page !== "Log out"
             ? <Button
                key={page}
                component={Link}
                to={`/${page}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
                </Button>
                : <Button  key={page}
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
                  </Button>
            ))}
          </Box>
          <Typography variant='p' color='inherit'>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
