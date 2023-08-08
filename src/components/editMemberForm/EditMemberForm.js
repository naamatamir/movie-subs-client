import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateMember} from '../../features/members/membersThunks'
import { useToast } from '../../hoc/ToastProvider'
import Box from '@mui/material/Box';
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import './editMemberFormStyles.css'


const EditMemberForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const { member = {} } = location.state || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const showToast = useToast();

  const [memberData, setMemberData] = useState({
    name: member.name || '',
    email: member.email || '',

    city: member.city || '',
  });

  const handleInputChange = (e) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateMember({ id, memberData }));
      console.log('member updated:', memberData);
      showToast('Member updated successfully!', 'success');
      navigate('/members');
    } catch (error) {
      console.error(error);
      showToast('Error adding movie', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='edit-member-card'
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
            <label className='member-label' htmlFor='name'>
              Member Name
            </label>
            <TextField
              id='name'
              name='name'
              type='text'
              value={memberData.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='member-label' htmlFor='email'>
              Email
            </label>
            <TextField
              id='email'
              name='email'
              type='text'
              value={memberData.email}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <label className='member-label' htmlFor='city'>
              City
            </label>
            <TextField
              id='city'
              name='city'
              type='text'
              value={memberData.city}
              onChange={handleInputChange}
            />
          </Box>
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
            size='large'
            bgColor={theme.palette.danger.main}
            onClick={() => navigate(`/members`)}
            hoverColor='#d32f2f'>
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EditMemberForm;
