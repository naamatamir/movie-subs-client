import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMembers, selectMembersLoading } from '../../features/members/membersSlice';
import { getMembers } from '../../features/members/membersThunks';
import { getSubscriptions } from '../../features/subscriptions/subscriptionsThunks';
import PageHeader from '../../components/shared/PageHeader';
import MemberCard from '../../components/memberCard/MemberCard';
import { IconButton, Box } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Container from '../../components/shared/Container'
import './membersPageStyles.css'
import { selectSubscriptions } from '../../features/subscriptions/subscriptionsSlice';
import LoadingOverlay from '../../components/shared/loadingOverlay/LoadingOverlay';
import { getMovies } from '../../features/movies/moviesThunks';

const MembersPage = () => {
  const members = useSelector(selectMembers);
  const subscriptions = useSelector(selectSubscriptions)
  const isMembersLoading = useSelector(selectMembersLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getSubscriptions());
    dispatch(getMovies());
  }, [dispatch]);

  const sortedMembers =
  members?.length > 0
    ? [...members].sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      })
    : [];

  return (
    <>
       <LoadingOverlay loading={isMembersLoading}/>
        <Box className="members-header-container">
        <PageHeader title='Members'  />
        <IconButton
          aria-label='add'
          className='user-action-button add'
          color='primary'
          size='large'
          sx={{padding:0}}
          onClick={() => navigate('/members/add')}>
          <AddCircleRoundedIcon
            fontSize="inherit" sx={{ fontSize: '1.8rem' }}
          />
        </IconButton>
      </Box>
          <Container className='members-cards-container'>
      {sortedMembers && sortedMembers.length > 0 ? (
        sortedMembers.map((member, index) => {
         return member && <MemberCard key={member._id} member={member} index={index} subscriptions={subscriptions}/> ;
        })
      ) : (
        <p>No members found</p>
  )
  }
  </Container>
    </>
  );
};

export default MembersPage;
