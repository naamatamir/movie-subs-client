import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import AppRoutes from './routes/routes';
import { ToastProvider } from './hoc/ToastProvider';
import LoadingOverlay from './components/shared/loadingOverlay/LoadingOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userPermissions = JSON.parse(localStorage.getItem('permissions'));
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setPermissions(userPermissions);
      }
    } catch (error) {
      console.error('Failed to verify authentication', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingOverlay loading={isLoading} />;
  }

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className='App'>
      <ToastProvider>
        <Router>
          <AppRoutes isAuthenticated={isAuthenticated} permissions={permissions} />
        </Router>
      </ToastProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
