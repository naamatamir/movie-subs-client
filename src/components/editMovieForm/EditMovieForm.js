import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { updateMovie } from '../../features/movies/moviesThunks';
import { useToast } from '../../hoc/ToastProvider';
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@emotion/react';
import './editMovieFormStyles.css';

const EditMovieForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const movie = location.state?.movie || {};

  const [imageUrl, setImageUrl] = useState('');
  const [showUrlDialog, setShowUrlDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const theme = useTheme();

  const [movieData, setMovieData] = useState({
    image: movie.image || '',
    name: movie.name || '',
    premiered: movie.premiered ? new Date(movie.premiered).getFullYear() : '',
  });
  const currentYear = new Date().getFullYear();

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
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
    try {
      movieData.premiered = new Date(movieData.premiered.toString());
      dispatch(updateMovie({ id, movieData }));
      console.log('dispatch edit movie:', movieData);
      showToast('Movie updated successfully!', 'success');
      console.log('movie updated:', movieData);
    } catch (error) {
      console.error(error);
      showToast('Error updating movie', 'error');
    }
    navigate('/movies');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className='edit-movie-form'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '16px', sm: '32px' },
          py: { xs: '1.5rem', sm: '0' },
          height: { sm: '50vh' },
        }}
        noValidate
        autoComplete='off'>
        <img
          className='movie-img'
          src={movieData.image}
          alt={movieData.name}
          onClick={handleImageClick}
        />
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
              onChange={handleInputChange}
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
        <DialogActions>
          <Button
            onClick={handleUrlDialogSubmit}
            bgColor={theme.palette.primary.main}
            hoverColor='#6b48c8'>
            Submit
          </Button>
          <Button
            bgColor={theme.palette.secondary.main}
            onClick={() => {
              setMovieData({ ...movieData, image: '' });
              setShowUrlDialog(false);
            }}>
            Remove
          </Button>
          <Button
            onClick={handleUrlDialogClose}
            bgColor={theme.palette.danger.main}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EditMovieForm;
