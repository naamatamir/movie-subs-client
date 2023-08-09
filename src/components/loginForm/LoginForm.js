import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingOverlay from '../shared/loadingOverlay/LoadingOverlay';
import Box from '@mui/material/Box';
import Button from '../shared/Button';
import { Typography, Link, FormControl, OutlinedInput, InputAdornment, IconButton, Alert } from '@mui/material';
import TextField from '../shared/TextField';
import jwt_decode from 'jwt-decode';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

const LoginForm = () => {
  const [loginValue, setLoginValue] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]:
        e.target.name === 'username'
          ? e.target.value.toLowerCase()
          : e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setLoginError(false);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GATEWAY_URL}/authUsers/login`,
        {
          username: loginValue.username,
          password: loginValue.password,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);

        // Decode the token, extract permissions, and save them in the local storage
        const decodedToken = jwt_decode(token);
        const permissions = decodedToken.permissions;
        localStorage.setItem('permissions', JSON.stringify(permissions));

        console.log('Login successful');
        setIsLoading(false);
        navigate('/menu');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Failed to login', error);
      setLoginError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
    <LoadingOverlay loading={isLoading} />
    <form onSubmit={handleSubmit}>
      <Box
        className='login-form'
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '16px',
        }}
        noValidate
        autoComplete='off'>
        <Typography
          variant='h5'
          component='div'
          sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Sign In
        </Typography>
        <Box
          className='login-row-fields-wrpaper'
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='login-label' htmlFor='username'>
              User Name
            </label>
            <TextField
              id='username'
              name='username'
              type='text'
              value={loginValue.username}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='login-label' htmlFor='password'>
              Password
            </label>
            <FormControl variant='outlined' fullWidth>
              <OutlinedInput
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={loginValue.password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      style={{
                        backgroundColor: '#d3d3d333',
                        borderRadius: '0',
                        height: '100%',
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: '13px',
                        zIndex: 1,
                      }}
                      edge='end'>
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelwidth={0}
              />
            </FormControl>
          </Box>
        </Box>
        {loginError && (
          <Alert
            severity='error'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            incorrect username <br /> or password
          </Alert>
        )}
        <Box
          className='login-action-buttons'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            '& > :not(style)': {
              mt: 1,
              mb: 1,
              mr: 1.5,
              ml: 1.5,
            },
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}>
          <Button className='login-btn' type='submit' paddingVertical>
            Sign In
          </Button>
        </Box>
        <Typography
          sx={{ mt: 1.5, textAlign: 'center' }}
          color='text.secondary'>
          Don't have an account?{' '}
          <Link href='/register' underline='none'>
            Sign Up
          </Link>
        </Typography>
      </Box>
      </form>
      </>
  );
};

export default LoginForm;
