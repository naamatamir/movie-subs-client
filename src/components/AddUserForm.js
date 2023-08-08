import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/users/usersThunks';
import { useToast } from '../hoc/ToastProvider';
import Box from '@mui/material/Box';
import TextField from './shared/TextField';
import Button from './shared/Button';
import Typography from '@mui/material/Typography';
import CheckboxGroup from './shared/CheckboxGroup';
import { useTheme } from '@emotion/react';
import { addPermission } from '../features/permissions/permissionsThunks';

const AddUserForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    createdAt: '',
    sessionTimeout: '',
    userPermissions: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const theme = useTheme();

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (e.target.name === 'username') {
      value = value.toLowerCase();
    } else if (e.target.name === 'firstName' || e.target.name === 'lastName') {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
};

  const handlePermissionChange = (newPermissions) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      userPermissions: newPermissions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(userData));
      const { id } = userData;
      await dispatch(
        addPermission({
          authUserId: id,
          permissionData: userData.userPermissions,
        })
      ).unwrap();
      console.log('user added:', userData);
      showToast('User added successfully!', 'success');
      navigate('/users');
    } catch (error) {
      console.error(error);
      showToast('Error adding user', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='add-user-card'
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '16px',
        }}
        noValidate
        autoComplete='off'>
        <Box
          className='first-row-fields-wrpaper'
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: '16px',
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='user-label' htmlFor='username'>
              User Name
            </label>
            <TextField
              id='username'
              name='username'
              type='text'
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='user-label' htmlFor='firstName'>
              First Name
            </label>
            <TextField
              id='firstName'
              name='firstName'
              type='text'
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='user-label' htmlFor='lastName'>
              Last Name
            </label>
            <TextField
              id='lastName'
              name='lastName'
              type='text'
              InputLabelProps={{
                shrink: false,
              }}
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
            <label className='user-label' htmlFor='createdAt'>
              Created At
            </label>
            <TextField
              id='createdAt'
              name='createdAt'
              type='date'
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='user-label' htmlFor='sessionTimeout'>
              Session Timeout
            </label>
            <TextField
              id='sessionTimeout'
              name='sessionTimeout'
              type='number'
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Box
          className='checkboxes-wrapper'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography className='add-user-typography' variant='h6'>
            Permissions
          </Typography>
          <CheckboxGroup
            userPermissions={userData.userPermissions}
            onCheckChange={handlePermissionChange}
          />
        </Box>
        <Box
          className='add-action-buttons'
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
            type='submit '
            size='large'
            bgColor={theme.palette.primary.main}
            hoverColor='#6b48c8'
            // onSubmit={handleSubmit}
          >
            Add
          </Button>
          <Button
            bgColor={theme.palette.danger.main}
            hoverColor='#d32f2f'
            size='large'
            onClick={() => navigate(`/users`)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddUserForm;
