import PageHeader from '../../components/shared/PageHeader';
import AddUserForm from '../../components/AddUserForm';
import './addUserPageStyles.css';

const AddUserPage = () => {
  return (
    <>
        <PageHeader title='Add User'  />
    <div className='add-user-form-wrapper'>
        <AddUserForm />
      </div>
      </>
  );
};

export default AddUserPage;
