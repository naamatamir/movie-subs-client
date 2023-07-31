import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '../shared/Button';
import Typography from '@mui/material/Typography';
// import TextField from '../shared/TextField';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import jwt_decode from 'jwt-decode';
import Tooltip from '@mui/material/Tooltip';
import './registerFormStyles.css';

const RegisterForm = () => {
  const [registerValue, setRegisterValue] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegisterValue({
      ...registerValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerValue.password !== registerValue.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GATEWAY_URL}/authUsers/register`,
        // 'http://localhost:8002/authUsers/register',
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

        // Decode the token, extract permissions, and save them in local storage
        const decodedToken = jwt_decode(token);
        const permissions = decodedToken.permissions;
        localStorage.setItem('permissions', JSON.stringify(permissions));

        console.log('Registration successful');
        navigate('/menu');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      alert(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. White spaces are not allowed.'
      );
      console.error('Failed to create account', error);
    }
  };

  return (
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
            <label className='sign-up-label' htmlFor='createdAt'>
              Password
            </label>
            <Tooltip
              title='Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. White spaces are not allowed.'
              placement='right'>
              <TextField
                id='password'
                name='password'
                type='password'
                value={registerValue.password}
                onChange={handleInputChange}
              />
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='sign-up-label' htmlFor='sessionTimeout'>
              Confirm Password
            </label>
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={registerValue.confirmPassword}
              onChange={handleInputChange}
            />
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
  );
};

export default RegisterForm;
