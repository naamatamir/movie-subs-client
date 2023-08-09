
import LoadingSpinnerWithLabel from '../SpinnerWithProgress';
import './loadingOverlayStyles.css'

const LoadingOverlay = ({loading}) => {
  if (!loading) {
    return null; 
  }

  return (
    <div className='loading-overlay'>
      <LoadingSpinnerWithLabel/>
    </div>
  );
};

export default LoadingOverlay;

