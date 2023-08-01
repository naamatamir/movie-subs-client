import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/users/usersThunks';
import {
  updatePermission,
  addPermission,
} from '../../features/permissions/permissionsThunks';
import { selectPermissions } from '../../features/permissions/permissionsSlice';
import { useToast } from '../../hoc/ToastProvider';
import Box from '@mui/material/Box';
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import Typography from '@mui/material/Typography';
import CheckboxGroup from '../shared/CheckboxGroup';
import { useTheme } from '@emotion/react';
import './editUserFormStyles.css';

const EditUserForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const { user = {}, userPermissions = [] } = location.state || {};
  const permissions = useSelector(selectPermissions);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();

  const theme = useTheme();

  const [userData, setUserData] = useState({
    _id: user._id || '',
    username: user.username || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    createdAt: user.createdAt
      ? new Date(user.createdAt).toISOString().slice(0, 10)
      : '',
    sessionTimeout: user.sessionTimeout || '',
    userPermissions: userPermissions,
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionChange = (newPermissions) => {
    setUserData({
      ...userData,
      userPermissions: newPermissions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id, userData })).unwrap();
      const permissionDocument = permissions.find(
        (doc) => doc.authUserId === userData._id
      );
      if (permissionDocument) {
        const permissionId = permissionDocument._id;
        await dispatch(
          updatePermission({
            id: permissionId,
            permissionData: userData.userPermissions,
          })
        ).unwrap();
      } else {
        console.log(
          'No permission document found for this user. Creating a new one.'
        );
        await dispatch(
          addPermission({
            authUserId: userData._id,
            permissionData: userData.userPermissions,
          })
        ).unwrap();
      }
      showToast('User updated successfully!', 'success');
      navigate('/users');
      console.log('user updated:', userData);
    } catch (error) {
      console.error(error);
      showToast('Error updating user', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='edit-user-card'
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
              value={userData.username}
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
              value={userData.firstName}
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
              value={userData.lastName}
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
              value={userData.createdAt}
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
              value={userData.sessionTimeout}
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
          <Typography className='edit-user-typography' variant='h6'>
            Permissions
          </Typography>

          <CheckboxGroup
            userPermissions={userPermissions}
            onCheckChange={handlePermissionChange}
          />
        </Box>
        <Box
          className='edit-action-buttons'
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
            type='submit'
            size='large'
            bgColor={theme.palette.primary.main}
            hoverColor='#6b48c8'>
            Update
          </Button>
          <Button
            type='submit'
            size='large'
            bgColor={theme.palette.danger.main}
            onClick={() => navigate(`/users`)}
            hoverColor='#d32f2f'>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EditUserForm;
