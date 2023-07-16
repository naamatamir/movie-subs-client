import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMovie } from '../../features/movies/moviesThunks';
import { selectSubscriptions } from '../../features/subscriptions/subscriptionsSlice';
import { selectMembers } from '../../features/members/membersSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';
import { useToast } from '../../hoc/ToastProvider';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import './movieCardStyles.css';

const MovieCard = ({ movie, permissions,
  isAdmin
}) => {
  const subscriptions = useSelector(selectSubscriptions);
  const members = useSelector(selectMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const showToast = useToast();

const id = movie._id

  let memberNames = [];
  let dates = [];
  let membersList = [];

  const movieId = String(movie._id);

  subscriptions.filter((subscription) => {
    return (
      subscription.movies.filter((movie) => {
        if (movie.movieId === movieId) {
          const memberId = subscription.memberId;
          const matchingMember = members.find(
            (member) => String(member._id) === memberId
          );

          if (matchingMember) {
            memberNames.push(matchingMember.name);
            dates.push(movie.date);
            membersList.push(matchingMember);
          }

          return true;
        }
        return false;
      }).length > 0
    );
  });

  const subscriptionsData = membersList.map((member, index) => ({
    id: index,
    name: member.name,
    date: new Date(dates[index]).getFullYear(),
    member:member,
  }));

  const handleMemberClick = (member) => {
    navigate(`/members/${member._id}/edit`, { state: { member } });
  };

  const handleEdit = () => {
    if (
      isAdmin ||
      permissions.includes('updateMovie')) {
      navigate(`${movie._id}/edit`, { state: {movie} });
    } else {
      alert('You do not have permission to edit movies');
    }
  };

  const handleDelete = (e) => {
    if (
      isAdmin ||
      permissions.includes('deleteMovie')) {
      try {
        dispatch(deleteMovie( id ));
        showToast(
          'Movie deleted successfully!', 
          'success', 
          6000, 
          () => window.location.reload()
        );
        console.log('movie deleted: ', id);
      } catch (error) {
        console.error(error);
        showToast('Error deleting movie', 'error');
      }
    } else {
      alert('You do not have permission to delete movies');
    }
  };

  return (
    <Card
      className='movie-card-wrapper'
      sx={{
        maxWidth: '375px',
        margin: {
          xs: 1,
          sm: 2,
        },
        display: 'flex',
        borderRadius: '10px',
      }}>
      <CardContent style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Typography
            gutterBottom
            variant='h6'
            sx={{ textAlign: 'left', marginBottom: 0 }}>
            {movie.name}
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ textAlign: 'left', marginBottom: 2 }}>
            ({new Date(movie.premiered).getFullYear()})
          </Typography>
          <div
            className='movie-action-buttons'
            style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              className='edit'
              onClick={handleEdit}
            >
              edit
            </Button>
            <Button className='delete' onClick={handleDelete}>delete</Button>
          </div>
          <div className='autocomplete-wrapper'>
            {subscriptionsData.length > 0 && (
              <Autocomplete
                disablePortal
                id={`subscriptions-autocomplete-${movie._id}`}
                size='small'
                options={subscriptionsData}
                getOptionLabel={(option) => option.name}
                sx={{
                  width: '147px', //'75%
                }}
                PopperComponent={({ children, ...props }) => (
                  <Popper
                    {...props}
                    disablePortal
                    popperOptions={{
                      modifiers: [{ name: 'flip', enabled: false }],
                    }}>
                    {children}
                  </Popper>
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <div
                    >
                      <span className='member-link'>
                        {option.name}
                        </span>
                      <div style={{ width: '100%', textAlign: 'left' }}>
                        <span>({option.date})</span>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label='Subscriptions'
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleMemberClick(newValue.member);
                  }
                }}
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardMedia
        component='img'
        sx={{
          width: '140px',
          backgroundImage: `url(${movie.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        image={movie.image}
        title={movie.name}
      />
    </Card>
  );
};

export default MovieCard;
