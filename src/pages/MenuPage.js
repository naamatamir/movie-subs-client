import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Container from '../components/shared/Container';
import Button from '../components/shared/Button';

const MenuPage = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const isAdmin = decodedToken.isAdmin;
    const userPermissions = decodedToken.permissions;
  
    const handleMoviesNavigation = () => {
      if (isAdmin || userPermissions.includes('viewMovies')) {
        navigate('/movies');
      } else {
        alert('You do not have permission to view movies');
      }
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };
  
    return (
      <Container className='menu-wrapper' height='100vh'>
        {isAdmin && (
          <Button onClick={() => navigate('/users')}>Users</Button>
        )}
        <Button onClick={handleMoviesNavigation}>Movies</Button>
        <Button onClick={() => navigate('/members')}>Members</Button>
        <Button onClick={logout}>Log out</Button>
      </Container>
    );
  };

export default MenuPage;
