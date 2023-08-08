import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import selectSubscriptions from '../../features/subscriptions/subscriptionsSlice';
import { getSubscriptions } from '../../features/subscriptions/subscriptionsThunks';
import { selectMovies } from '../../features/movies/moviesSlice';
import { useToast } from '../../hoc/ToastProvider';
import { deleteMember } from '../../features/members/membersThunks';
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button 
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './memberCardStyles.css';

const MemberCard = ({ member, index, subscriptions }) => {
  const movies = useSelector(selectMovies);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();

  const id = member._id;

  const [expanded, setExpanded] = useState(false);
  // const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const openDeleteDialog = () => {
    setOpenDialog(true);
  };
  
  let movieNames = [];
  let dates = [];
  let moviesList = [];

  const memberId = String(member._id);

  subscriptions.forEach((subscription) => {
    if (String(subscription.memberId) === memberId) {
      subscription.movies.forEach((movieSubscription) => {
        const matchingMovie = movies.find(
          (mov) => String(mov._id) === String(movieSubscription.movieId)
        );
        if (matchingMovie) {
          movieNames.push(matchingMovie.name);
          dates.push(movieSubscription.date);
          moviesList.push(matchingMovie);
        }
      });
    }
  });

  const subscriptionData = moviesList.map((movie, index) => ({
    id: index,
    name: movie.name,
    date: new Date(dates[index]).getFullYear(),
    movie: movie,
  }));

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie._id}/edit`, { state: { movie } });
  };

  const colors = ['purple', 'blue', 'green', 'red'];
  const memberColor = colors[index % colors.length];

  const avatarLetter = member?.name ? member.name.charAt(0) : '';

  const handleUpdate = () => {
    navigate(`/members/${member._id}/edit`, { state: { member } });
  };

  const handleDelete = (e) => {
    setOpenDialog(false);
    try {
      dispatch(deleteMember(id));
      showToast('Member deleted successfully!', 'success', 6000, () =>
        window.location.reload()
      );
      console.log('member deleted: ', id);
    } catch (error) {
      console.error(error);
      showToast('Error deleting member', 'error');
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className={`member-card-wrapper member-${memberColor}`}
      sx={{
        minWidth: 330,
        borderRadius: '10px',
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.2)',
        '&.MuiCard-root': { height: 'auto', minHeight: '37vh' },
      }}>
      <CardHeader
        className='member-card-header'
        sx={{ paddingTop: 3 }}
        avatar={
          <Avatar
            aria-label='member'
            className={`avatar ${memberColor}-member-avatar`}>
            {avatarLetter}
          </Avatar>
        }
        titleTypographyProps={{ align: 'left', variant: 'h5' }}
        title={member?.name || ''}
      />
      <CardContent
        className='member-card-content'
        sx={{
          textAlign: 'left',
          paddingTop: 0,
          paddingLeft: 3,
        }}>
        <Typography sx={{ lineHeight: 1.75 }}>
          Email : <span className='member-data-value'>{member.email} </span>
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>
          City : <span className='member-data-value'>{member.city} </span>
        </Typography>
      </CardContent>

      <div
        className='member-action-buttons'
        style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 'auto',
          }}>
          <Typography>Movies</Typography>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            style={{ paddingLeft: 0 }}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <div
          className='two-buttons'
          style={{ display: 'flex', marginLeft: 'auto', gap: 10 }}>
          <IconButton
            aria-label='edit'
            className='action-button edit'
            onClick={handleUpdate}>
            <BorderColorOutlinedIcon className='svg-icon' />
          </IconButton>
          <IconButton
            aria-label='delete'
            className='action-button delete'
            onClick={openDeleteDialog}>
            <DeleteOutlinedIcon className='svg-icon' />
          </IconButton>
        </div>
      </div>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent sx={{ padding: 0, marginLeft: 3, textAlign: 'left' }}>
          {subscriptionData.length > 0 ? (
            subscriptionData.map((subscription) => (
              <Typography
                key={subscription.id}
                className='movie-data-value'
                sx={{ lineHeight: 1.75 }}
                onClick={() => handleMovieClick(subscription.movie)}>
                <span className='movie-link'>{subscription.name}</span>
                {/* <br /> */}({subscription.date})
              </Typography>
            ))
          ) : (
            <Typography sx={{ lineHeight: 1.75 }}>
              no movie subscriptions
            </Typography>
          )}
        </CardContent>
      </Collapse>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' style={{ textAlign: 'center' }}>
          {'Delete Confirmation'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete{' '}
            {`${member?.name}`}?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            pb: 3,
          }}>
          <Button
            variant='contained'
            color='danger'
            sx={{
              color: 'white',
              borderRadius: '7px',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
            onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant='contained'
            color='secondary'
            sx={{
              color: 'white',
              borderRadius: '7px',
              '&:hover': {
                backgroundColor: '#1ca7d1',
              },
            }}
            onClick={() => setOpenDialog(false)}
            autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MemberCard;
