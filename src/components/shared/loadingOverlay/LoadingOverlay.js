
import LoadingSpinner from '../LoadingSpinner';
import './loadingOverlayStyles.css'

const LoadingOverlay = ({loading}) => {
  if (!loading) {
    return null; 
  }

  return (
    <div className='loading-overlay'>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingOverlay;

