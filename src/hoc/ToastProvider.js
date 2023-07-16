import { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [closeTimeout, setCloseTimeout] = useState(null); 
  const [closeAction, setCloseAction] = useState(null); 

  const showToast = (message, severity, duration = 6000, onClose) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
    setCloseAction(() => onClose); 
    if (onClose) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, duration);
      setCloseTimeout(timeoutId); 
    }
  };

  const hideToast = () => {
    setOpen(false);
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    if (closeAction) {
      closeAction();
      setCloseAction(null); 
    }
  };

  const getAlertColor = (severity) => {
    if (severity === 'success') {
      return '#23b7e5';
    } else if (severity === 'error') {
      return '#f44336';
    }
    return undefined;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <MuiAlert
          icon={
            severity === 'success' ? (
              <TaskAltIcon fontSize='inherit' sx={{ color: 'white' }} />
            ) : (
              <ErrorOutlineIcon fontSize='inherit' sx={{ color: 'white' }} />
            )
          }
          onClose={hideToast}
          severity={severity}
          sx={{
            width: '100%',
            color: 'white',
            backgroundColor: getAlertColor(severity),
          }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast;
};

export { ToastProvider, useToast };