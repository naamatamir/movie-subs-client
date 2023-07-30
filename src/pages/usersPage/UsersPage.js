import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  selectUsersLoading,
} from '../../features/users/usersSlice';
import { getUsers } from '../../features/users/usersThunks';
import { getPermissions } from '../../features/permissions/permissionsThunks';
import PageHeader from '../../components/shared/PageHeader';
import Container from '../../components/shared/Container';
import UserCard from '../../components/userCard/UserCard';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box } from '@mui/material';
import LoadingOverlay from '../../components/shared/loadingOverlay/LoadingOverlay';
import './usersPageStyles.css';

const UsersPage = () => {
  const users = useSelector(selectUsers);
  const isUsersLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers())
      // .then(() => {
      dispatch(getPermissions());
    // });
  }, [dispatch]);

  const sortedUsers =
    users?.length > 0
      ? [...users].sort((a, b) => a.firstName.localeCompare(b.firstName))
      : [];

  return (
    <>
      <LoadingOverlay loading={isUsersLoading} />
      <Box className='users-header-container'>
        <PageHeader title='Users' />
        <IconButton
          aria-label='add'
          className='user-action-button add'
          color='primary'
          size='large'
          sx={{ padding: 0 }}
          onClick={() => navigate('/users/add')}>
          <AddCircleRoundedIcon
            fontSize='inherit'
            sx={{ fontSize: '1.8rem' }}
          />
        </IconButton>
      </Box>
      <Container className='users-cards-container'>
        {sortedUsers && sortedUsers.length > 0 ? (
          sortedUsers.map((user, index) => {
            return (
              user && <UserCard key={user._id} user={user} index={index} />
            );
          })
        ) : (
          <p>No users found</p>
        )}
      </Container>
    </>
  );
};

export default UsersPage;
