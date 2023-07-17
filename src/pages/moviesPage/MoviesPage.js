import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMovies,selectMoviesLoading } from '../../features/movies/moviesSlice';
import { getMovies } from '../../features/movies/moviesThunks';
import { getSubscriptions } from '../../features/subscriptions/subscriptionsThunks';
import { getMembers } from '../../features/members/membersThunks';
import PageHeader from '../../components/shared/PageHeader';
import MovieCard from '../../components/movieCard/MovieCard';
import { IconButton, Box } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { selectPermissions } from '../../features/permissions/permissionsSlice';
import jwtDecode from 'jwt-decode';
import LoadingOverlay from '../../components/shared/loadingOverlay/LoadingOverlay';
import './moviesPageStyles.css';
import axios from 'axios';

const MoviesPage = () => {
  const movies = useSelector(selectMovies);
  const permissions = useSelector(selectPermissions);
  const isMoviesLoading = useSelector(selectMoviesLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      let decodedToken;

      try {
        decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.isAdmin);

        dispatch(getMovies());
        dispatch(getSubscriptions());
        dispatch(getMembers());
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch]);


  const handleAddClick = () => {
    if (
      isAdmin ||
      permissions.includes('createMovie')) {
      navigate('/movies/add');
    } else {
      alert('You do not have permission to add movies');
    }
  };

  const sortedMovies =
  movies?.length > 0
    ? [...movies].sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      })
    : [];

  return (
    <>
      <LoadingOverlay loading={isMoviesLoading} />
       <Box className="movies-header-container">
        <PageHeader title='Movies'  />
        <IconButton
          aria-label='add'
          className='movie-action-button add'
          color='primary'
          size='large'
          sx={{ padding: 0 }}
          onClick={handleAddClick}
        >
          <AddCircleRoundedIcon
            fontSize="inherit" sx={{ fontSize: '1.8rem' }}
          />
        </IconButton>
      </Box>
      <div className='movies-cards-container'>
        {sortedMovies  && sortedMovies.length > 0 ? (
          sortedMovies.map((movie, index) => (
            movie && <MovieCard key={movie._id} movie={movie} permissions={permissions}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p>No movies found</p>
      )}
      </div>
      </>
  );
};

export default MoviesPage;
