import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import LoadingOverlay from '../shared/loadingOverlay/LoadingOverlay';
import Button from '../shared/Button';
import { Box, Typography, TextField, Link, Tooltip, IconButton, InputAdornment, OutlinedInput, FormControl } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './registerFormStyles.css';

const RegisterForm = (
) => {
  const [registerValue, setRegisterValue] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'username') {
      value = value.toLowerCase();
    } else if (e.target.name === 'firstName' || e.target.name === 'lastName') {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setRegisterValue({
      ...registerValue,
      [e.target.name]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerValue.password !== registerValue.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!isPasswordValid(registerValue.password)) {
      alert(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. White spaces are not allowed.'
      );
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GATEWAY_URL}/authUsers/register`,
        {
          username: registerValue.username,
          password: registerValue.password,
          firstName: registerValue.firstName,
          lastName: registerValue.lastName,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwt_decode(token);
        const permissions = decodedToken.permissions;
        localStorage.setItem('permissions', JSON.stringify(permissions));

        console.log('Registration successful');
        setIsLoading(false);
        navigate('/menu');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      alert(
        'Failed to create account. Please try again.'
      );
      console.error('Failed to create account', error);
      setIsLoading(false);
    }
  };

  return (
    <>
    <LoadingOverlay loading={isLoading} />
    <form onSubmit={handleSubmit}>
      <Box
        className='sign-up-form'
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
          Sign Up
        </Typography>
        <Box
          className='first-row-fields-wrpaper'
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: '16px',
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='sign-up-label' htmlFor='username'>
              User Name
            </label>
            <TextField
              id='username'
              name='username'
              type='text'
              value={registerValue.username}
              onChange={handleInputChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='sign-up-label' htmlFor='firstName'>
              First Name
            </label>
            <TextField
              id='firstName'
              name='firstName'
              type='text'
              value={registerValue.firstName}
              onChange={handleInputChange}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='sign-up-label' htmlFor='lastName'>
              Last Name
            </label>
            <TextField
              id='lastName'
              name='lastName'
              type='text'
              value={registerValue.lastName}
              onChange={handleInputChange}
              required
            />
          </Box>
        </Box>
        <Box
          className='second-row-fields-wrpaper'
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: '16px',
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label className='sign-up-label' htmlFor='createdAt'>
                Password
              </label>
              <Tooltip
                title='Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
                placement='top'
                enterTouchDelay={0}>
                <IconButton aria-label='password-info' sx={{ pt: 0, pb: 0 }}>
                  <HelpOutlineIcon style={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <FormControl variant='outlined' fullWidth>
              <OutlinedInput
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={registerValue.password}
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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='sign-up-label' htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <FormControl variant='outlined'>
              <OutlinedInput
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                value={registerValue.confirmPassword}
                onChange={handleInputChange}
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}
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
                      {showConfirmPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          className='sign-up-action-buttons'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            '& > :not(style)': {
              mt: 1,
              mb: 1,
              mr: 1.5,
              ml: 1.5,
              width: '25ch',
            },
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}>
          <Button
            className='create-account-btn'
            type='submit'
            fullWidth
            paddingVertical>
            Create Account
          </Button>
        </Box>
        <Typography sx={{ textAlign: 'center' }} color='text.secondary'>
          Already have an account?{' '}
          <Link href='/login' underline='none'>
            Sign In
          </Link>
        </Typography>
      </Box>
      </form>
      </>
  );
};

export default RegisterForm;
