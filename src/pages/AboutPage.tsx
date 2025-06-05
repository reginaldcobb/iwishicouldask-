import React from 'react';
import { Typography, Box, Container, Button, Paper, GridLegacy as Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          About I Wish I Could Ask...
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box component="img" src="/hero-image.svg" alt="People asking questions" sx={{ width: '100%', height: 'auto' }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              I Wish I Could Ask... is a platform that connects curious minds with experts, celebrities, organizations, and thought leaders from around the world. Our mission is to facilitate meaningful conversations and knowledge sharing across different domains and expertise.
            </Typography>
            
            <Typography variant="h5" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="body1" paragraph>
              Users can browse our extensive database of people and organizations, submit questions they've always wanted to ask, and get answers from verified experts. The community can upvote questions and engage with answers through comments and discussions.
            </Typography>
            
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in the power of curiosity, respectful dialogue, and accessible knowledge. Our platform is designed to be inclusive, educational, and engaging for everyone, regardless of background or expertise.
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Join Our Community
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Whether you're looking to ask questions, share your expertise, or simply explore interesting conversations, I Wish I Could Ask... has something for everyone.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mx: 1, borderRadius: 2 }}
            >
              Sign Up - It's Free!
            </Button>
            <Button
              component={RouterLink}
              to="/questions"
              variant="outlined"
              size="large"
              sx={{ mx: 1, borderRadius: 2 }}
            >
              Browse Questions
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutPage;
