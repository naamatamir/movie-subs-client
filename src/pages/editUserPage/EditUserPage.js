import PageHeader from '../../components/shared/PageHeader';
import EditUserForm from '../../components/editUserForm/EditUserForm';
import './editUserPageStyles.css';

const EditUserPage = () => {
  return (
    <>
      {' '}
      <PageHeader title='Edit User' />
      <div className='edit-user-form-wrapper'>
        <EditUserForm />
      </div>
    </>
  );
};

export default EditUserPage;
