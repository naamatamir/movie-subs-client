import PageHeader from '../../components/shared/PageHeader';
import RegisterForm from '../../components/registerForm/RegisterForm';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import './createAccountPageStyles.css';

const CreateAcoountPage = () => {
  return (
    <div className='create-account-page-container'>
      <div className='header-wrapper'>
        <MovieFilterOutlinedIcon
          sx={{ color: '#845adf', fontSize: '2.5rem', mr: 1 }}
        />
        <PageHeader title='REEL CONTROL' />
      </div>
      <div className='create-account-form-wrapper'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default CreateAcoountPage;
