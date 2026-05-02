import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Alert, 
  AlertTitle, 
  Snackbar, 
  Box, 
  Paper,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import useNotification from '../hooks/useNotification';

const AlertsShowcase = () => {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('This is a functional alert!');
  const navigate = useNavigate();
  const notification = useNotification();

  const handleMuiAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleCustomNotification = (type, message) => {
    notification[type](message);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px', paddingBottom: '80px' }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="800" color="var(--text-bright)" gutterBottom>
          SupportOS Alerts Showcase
        </Typography>
        <Typography variant="body1" color="var(--text)">
          Testing both MUI and Custom Design System alerts.
        </Typography>
      </Box>

      <Paper variant="outlined" style={{ padding: '32px', borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <Typography variant="h6" fontWeight="700" gutterBottom>
          MUI Library Alerts
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Functional alerts using the @mui/material library.
        </Typography>
        
        <Stack spacing={2} direction="row" mb={4}>
          <Button variant="contained" color="success" onClick={() => handleMuiAlert('success', 'MUI: Operation completed successfully!')}>
            Success Alert
          </Button>
          <Button variant="contained" color="error" onClick={() => handleMuiAlert('error', 'MUI: Something went wrong!')}>
            Error Alert
          </Button>
          <Button variant="contained" color="warning" onClick={() => handleMuiAlert('warning', 'MUI: Please check your settings.')}>
            Warning Alert
          </Button>
          <Button variant="contained" color="info" onClick={() => handleMuiAlert('info', 'MUI: Here is some information.')}>
            Info Alert
          </Button>
        </Stack>

        <Divider style={{ margin: '32px 0' }} />

        <Typography variant="h6" fontWeight="700" gutterBottom>
          Custom SupportOS Notifications
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Premium ChronoTask-style toasts from our custom design system.
        </Typography>

        <Stack spacing={2} direction="row">
          <Button 
            variant="outlined" 
            style={{ color: 'var(--success)', borderColor: 'var(--success)' }} 
            onClick={() => handleCustomNotification('success', 'SupportOS: Changes saved successfully!')}
          >
            Custom Success
          </Button>
          <Button 
            variant="outlined" 
            style={{ color: 'var(--error)', borderColor: 'var(--error)' }} 
            onClick={() => handleCustomNotification('error', 'SupportOS: Failed to delete tenant.')}
          >
            Custom Error
          </Button>
          <Button 
            variant="outlined" 
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }} 
            onClick={() => handleCustomNotification('info', 'SupportOS: New ticket assigned to you.')}
          >
            Custom Info
          </Button>
        </Stack>
      </Paper>

      <Box mt={4} textAlign="center">
        <Button onClick={() => navigate('/login')}>Back to Login</Button>
      </Box>

      {/* MUI Snackbar for Alerts */}
      <Snackbar 
        open={open} 
        autoHideDuration={4000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity={alertType} sx={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <AlertTitle>{alertType.toUpperCase()}</AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AlertsShowcase;
