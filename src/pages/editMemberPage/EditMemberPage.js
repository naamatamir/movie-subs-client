import PageHeader from '../../components/shared/PageHeader';
import EditMemberForm from '../../components/editMemberForm/EditMemberForm'
import './editMemberPageStyles.css';

const EditMemberPage = () => {
  return (
    <>
        <PageHeader title='Edit Member' />
      <div className='edit-member-form-wrapper'>
        <EditMemberForm />
      </div>
    </>
  );
};

export default EditMemberPage;
