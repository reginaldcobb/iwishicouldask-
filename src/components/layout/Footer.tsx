import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 5, 
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.dark,
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              I Wish I Could Ask...
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connect with experts, ask questions, and get answers from people and organizations you've always wanted to know about.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook" component="a" href="#" size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#" size="small">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" component="a" href="#" size="small">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/questions" color="inherit" display="block" sx={{ mb: 1 }}>
              Questions
            </Link>
            <Link component={RouterLink} to="/entities" color="inherit" display="block" sx={{ mb: 1 }}>
              People & Organizations
            </Link>
            <Link component={RouterLink} to="/leaderboard" color="inherit" display="block" sx={{ mb: 1 }}>
              Leaderboard
            </Link>
          </Grid>

          {/* Our Services */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Our Features
            </Typography>
            <Typography variant="body2" display="block" sx={{ mb: 1 }}>
              Ask Questions
            </Typography>
            <Typography variant="body2" display="block" sx={{ mb: 1 }}>
              Browse Experts
            </Typography>
            <Typography variant="body2" display="block" sx={{ mb: 1 }}>
              Get Verified Answers
            </Typography>
            <Typography variant="body2" display="block" sx={{ mb: 1 }}>
              Join Discussions
            </Typography>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">(555) 123-4567</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">info@iwishicouldask.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Available: 24/7</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 } }}>
            © {new Date().getFullYear()} I Wish I Could Ask... All rights reserved.
          </Typography>
          <Box>
            <Link component={RouterLink} to="/privacy" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
