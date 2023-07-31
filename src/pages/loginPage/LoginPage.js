import PageHeader from '../../components/shared/PageHeader';
import LoginForm from '../../components/loginForm/LoginForm';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import './loginPageStyles.css';

const LoginPage = () => {
  return (
    <div className='login-page-container'>
        <div className='header-wrapper'>
        <MovieFilterOutlinedIcon
          sx={{ color: '#845adf', fontSize: '2.5rem', mr: 1 }}
        />
        <PageHeader title='REEL CONTROL' />
      </div>
    <div className='login-form-wrapper'>
      <LoginForm />
    </div>
    </div>
  );
};

export default LoginPage;
