import React from 'react';
import { Typography, Box, Container, Button, Paper, GridLegacy as Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
          <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Go to Homepage
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/questions"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Browse Questions
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
