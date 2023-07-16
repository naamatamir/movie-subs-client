import PageHeader from '../../components/shared/PageHeader';
import EditMovieForm from '../../components/editMovieForm/EditMovieForm';
import './editMoviePageStyles.css';

const EditMoviePage = () => {
  return (
    <>
      <PageHeader title='Edit Movie' />
      <div className='edit-movie-form-wrapper'>
        <EditMovieForm />
      </div>
    </>
  );
};

export default EditMoviePage;
