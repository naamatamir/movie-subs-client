import { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import LoadingQuotes from '../LoadingQuotes';
import './loadingOverlayStyles.css';

const LoadingOverlay = ({ loading }) => {
  const [showQuotes, setShowQuotes] = useState(false);

  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setShowQuotes(true);
      }, 2000);
    } else {
      setShowQuotes(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <div className='loading-overlay-wrapper'>
      {showQuotes ? <LoadingQuotes /> : <LoadingSpinner />}
    </div>
  );
};

export default LoadingOverlay;
