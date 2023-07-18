import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { updateMovie } from '../../features/movies/moviesThunks';
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
import './editMovieFormStyles.css';

const EditMovieForm = () => {
  const location = useLocation();
  const { id } = useParams();
  const movie = location.state?.movie|| {};

  const [imageUrl, setImageUrl] = useState('');
  const [showUrlDialog, setShowUrlDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();

  const [movieData, setMovieData] = useState({
    image: movie.image || '',
    name: movie.name || '',
    premiered: movie.premiered
      ? new Date(movie.premiered).getFullYear()
      : '',
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

  const handleSubmit =  (e) => {
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
        <img className='movie-img' src={movieData.image} alt={movieData.name} onClick={handleImageClick}/>
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
          <div className='edit-action-buttons'>
            <Button
              type="submit"
              size='large'
              variant='contained'
              sx={{
                borderRadius: '7px',
                '&:hover': {
                  backgroundColor: '#6b48c8',
                },
              }} >
              Update
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
          <Button onClick={() => {setMovieData({...movieData, image: ''}); setShowUrlDialog(false);}}>Remove</Button>
    <Button onClick={handleUrlDialogSubmit}>Submit</Button>
  </DialogActions>
</Dialog>

    </form>
  );
};

export default EditMovieForm;
