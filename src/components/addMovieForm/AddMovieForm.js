import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../features/movies/moviesThunks';
import { useToast } from '../../hoc/ToastProvider'
import TextField from '../shared/TextField';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

const AddMovieForm = () => {
  const [movieData, setMovieData] = useState({
    image: '',
    name: '',
    premiered: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const currentYear = new Date().getFullYear();

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePremieredYearChange = (e) => {
    setMovieData({
      ...movieData,
      premiered: e.target.value,
    });
  };
  
  const [imageUrl, setImageUrl] = useState('');
  const [showUrlDialog, setShowUrlDialog] = useState(false);

  const handlePlaceholderClick = () => {
    setShowUrlDialog(true);
  };

  const handleUrlInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUrlDialogClose = () => {
    setShowUrlDialog(false);
  };

  const handleUrlDialogSubmit = () => {
    setMovieData({
      ...movieData,
      image: imageUrl,
    });
    setShowUrlDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const year = parseInt(movieData.premiered);
  if (isNaN(year) || year < 1888 || year > currentYear) {
    console.error('Invalid year');
    return;
  }
    try {
      dispatch(addMovie( movieData ));
      console.log('movie added:', movieData.name);
      showToast('Movie added successfully!', 'success');
      navigate('/movies');
    } catch (error) {
      console.error(error);
      showToast('Error adding movie', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='edit-movie-form'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '16px', sm: '32px' },
          py: { xs: '1.5rem', sm: '0' }, // padding top & bottom
          height: { sm: '50vh' },
        }}
        noValidate
        autoComplete='off'>
        <Box
          className='placeholder-image'
          onClick={handlePlaceholderClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#eee',
            width: { sm: '31vw', md: '22vw', lg: '20vw' },
            height: { xs: '47vh', sm: '50vh', md: '50vh', lg: '50vh' },
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          <AddPhotoAlternateRoundedIcon
            className='add-photo-icon'
            style={{ fontSize: 72, color: '#aaa' }}
          />
        </Box>
        <Box
          className='edit-movie-fields-actions'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            mt: { xs: '0.75rem', sm: 0 },
          }}>
          <Box
            className='movie-fields-wrpaper'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <label className='movie-label-name' htmlFor='moviename'>
              Movie Name
            </label>
            <TextField
              id='moviename'
              name='name'
              type='text'
              value={movieData.name}
              onChange={handleInputChange}
            />
            <label className='movie-label-year' htmlFor='premiered'>
              Premiered Year
            </label>
            <TextField
              id='premiered'
              name='premiered'
              type='number'
              inputProps={{ min: 1888, max: currentYear }}
              value={movieData.premiered}
              onChange={handlePremieredYearChange}
            />
          </Box>
          <div className='edit-action-buttons'>
            <Button
              size='large'
              variant='contained'
              sx={{
                borderRadius: '7px',
                padding: '0 2.3rem',
                '&:hover': {
                  backgroundColor: '#6b48c8',
                },
              }}
              onClick={handleSubmit}>
              Add
            </Button>
            <Button
              size='large'
              variant='contained'
              color='danger'
              sx={{
                color: 'white',
                borderRadius: '7px',

                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
              onClick={() => navigate(`/movies`)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Box>

      <Dialog open={showUrlDialog} onClose={handleUrlDialogClose}>
        <DialogTitle>Enter Image URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='URL'
            type='text'
            value={imageUrl}
            onChange={handleUrlInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUrlDialogClose}>Cancel</Button>
          <Button onClick={handleUrlDialogSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddMovieForm;
