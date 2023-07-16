import PageHeader from '../../components/shared/PageHeader';
import AddMemberForm from '../../components/AddMemberForm'
import './addMemberPageStyles.css'

const AddMemberPage = () => {
  return (
    <>
      <PageHeader title='Add Member' />
      <div className='add-member-form-wrapper'>
      <AddMemberForm />
      </div>
    </>
  );
};

export default AddMemberPage;
