import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPermissions } from '../../features/permissions/permissionsSlice';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../features/users/usersThunks';
import { useToast } from '../../hoc/ToastProvider';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Collapse,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './UserCardStyles.css';

const UserCard = ({ user, index }) => {
  const permissions = useSelector(selectPermissions);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const [expanded, setExpanded] = useState(false);

  // if (!user || !user._id || !permissions) {
  //   return null;
  // }

  const id = user?._id;

  const userPermissionsObject = permissions
    ? permissions.find((permission) => permission.authUserId === user?._id)
    : { permissions: [] };

  const userPermissions = userPermissionsObject?.permissions || [];

  const colors = ['purple', 'blue', 'green', 'red'];
  const userColor = colors[index % colors.length];

  const handleUpdate = () => {
    navigate(`/users/${user._id}/edit`, { state: { user, userPermissions } });
  };

  const handleDelete = (e) => {
    try {
      dispatch(deleteUser(id));
      showToast('User deleted successfully!', 'success', 6000, () =>
        window.location.reload()
      );
      console.log('user deleted: ', id);
    } catch (error) {
      console.error(error);
      showToast('Error deleting user', 'error');
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const permissionMapping = {
    viewMovies: 'View Movies',
    createMovie: 'Create Movie',
    updateMovie: 'Update Movie',
    deleteMovie: 'Delete Movie',
    viewSubscriptions: 'View Subscriptions',
    createSubscription: 'Create Subscription',
    updateSubscription: 'Update Subscription',
    deleteSubscription: 'Delete Subscription',
  };

  return (
    <Card
      className={`user-card-wrapper user-${userColor}`}
      sx={{
        minWidth: 330,
        '&.MuiCard-root': { height: 'auto', minHeight: '37vh' },
      }}>
      <CardHeader
        className='user-card-header'
        sx={{ paddingTop: 3 }}
        avatar={
          <Avatar aria-label='user' className={`avatar ${userColor}-avatar`}>
            {user && user.firstName && user.firstName[0]}
          </Avatar>
        }
        titleTypographyProps={{ align: 'left', variant: 'h5' }}
        title={`${user?.firstName || ''} ${user?.lastName || ''}`}
      />
      <CardContent
        className='user-card-content'
        sx={{
          textAlign: 'left',
          paddingTop: 0,
          paddingLeft: 3,
        }}>
        <Typography sx={{ lineHeight: 1.75 }}>
          User Name : <span className='user-data-value'>{user.username}</span>
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>
          Session Duration :{' '}
          <span className='user-data-value'>{user.sessionTimeout} min. </span>
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>
          Created Date :{' '}
          <span className='user-data-value'>
            {new Date(user.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}{' '}
          </span>
        </Typography>
      </CardContent>

      <div
        className='user-action-buttons'
        style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 'auto',
          }}>
          <Typography>Permissions</Typography>
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
            onClick={handleDelete}>
            <DeleteOutlinedIcon className='svg-icon' />
          </IconButton>
        </div>
      </div>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent sx={{ padding: 0, marginLeft: 3, textAlign: 'left' }}>
          {userPermissions.length > 0 ? (
            userPermissions.map((permission) => (
              <Typography
                key={permission}
                className='user-data-value'
                sx={{ lineHeight: 1.75 }}>
                {permissionMapping[permission] || permission}
              </Typography>
            ))
          ) : (
            <Typography className='user-data-value'>
              User does not have permissions
            </Typography>
          )}

          {/* {userPermissions.map((permission) => (
            <Typography
              key={permission}
              className='user-data-value'
              sx={{ lineHeight: 1.75 }}>
              {permissionMapping[permission] || permission}
            </Typography>
          ))} */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UserCard;
