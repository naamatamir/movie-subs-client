import PageHeader from '../../components/shared/PageHeader';
import AddMovieForm from '../../components/addMovieForm/AddMovieForm';
import './addMoviePageStyles.css';

const AddMoviePage = () => {
  return (
    <>
      <PageHeader title='Add Movie'/>
      <div className='add-movie-form-wrapper'>
        <AddMovieForm />
      </div>
    </>
  );
};

export default AddMoviePage;
