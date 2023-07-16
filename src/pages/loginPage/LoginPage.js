import LoginForm from '../../components/loginForm/LoginForm';
import './loginPageStyles.css';

const LoginPage = () => {
  return (
    <div className='login-page-container'>
    <div className='login-form-wrapper'>
      <LoginForm />
    </div>
    </div>
  );
};

export default LoginPage;
