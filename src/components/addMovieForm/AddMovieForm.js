import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../features/movies/moviesThunks';
import { useToast } from '../../hoc/ToastProvider';
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useTheme } from '@emotion/react';

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
  const theme = useTheme();

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
      dispatch(addMovie(movieData));
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
          <Box
            className='edit-action-buttons'
            sx={{
              mt: 2,
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
                '& > :not(style)': {
                  width: '25ch',
                },
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
              onClick={() => navigate(`/movies`)}
              hoverColor='#d32f2f'>
              Cancel
            </Button>
          </Box>
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
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button
            onClick={handleUrlDialogSubmit}
            bgColor={theme.palette.primary.main}
            hoverColor='#6b48c8'>
            Submit
          </Button>
          <Button
            onClick={handleUrlDialogClose}
            bgColor={theme.palette.danger.main}   hoverColor='#d32f2f'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AddMovieForm;
