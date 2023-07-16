import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from './shared/TextField';
import Button from './shared/Button';
import { useTheme } from '@emotion/react';
import { useToast } from '../hoc/ToastProvider'
import {addMember} from '../features/members/membersThunks'

const AddMemberForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const showToast = useToast();

  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    city: '',
  });

  const handleInputChange = (event) => {
    setMemberData({
      ...memberData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addMember (memberData ));
      console.log(memberData);
      showToast('Member added successfully!', 'success');
      navigate('/members');
  } catch (error) {
    console.error(error);
    showToast('Error adding member', 'error');
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='add-member-card'
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
              InputLabelProps={{
                shrink: false,
              }}
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
              InputLabelProps={{
                shrink: false,
              }}
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
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
      </Box>
      <br/>
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
          hoverColor='#6b48c8'>
          Add
        </Button>
        <Button
          bgColor={theme.palette.danger.main}
          hoverColor='#d32f2f'
          size='large'
          onClick={() => navigate(`/members`)}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default AddMemberForm;
