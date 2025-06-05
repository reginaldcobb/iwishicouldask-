import React, { useState } from 'react';
import { Typography, Box, Container, GridLegacy as Grid, Card, CardContent, CardMedia, Button, TextField, InputAdornment, IconButton, Divider, Chip, Avatar, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for featured entities
  const featuredEntities = [
    {
      id: 1,
      name: 'Albert Einstein',
      slug: 'albert-einstein',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg',
      category: 'Science',
      description: 'Theoretical physicist who developed the theory of relativity.',
      questionCount: 156
    },
    {
      id: 2,
      name: 'NASA',
      slug: 'nasa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/220px-NASA_logo.svg.png',
      category: 'Science',
      description: 'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government.',
      questionCount: 243
    },
    {
      id: 3,
      name: 'United Nations',
      slug: 'united-nations',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/220px-Flag_of_the_United_Nations.svg.png',
      category: 'Government',
      description: 'An intergovernmental organization that aims to maintain international peace and security.',
      questionCount: 189
    },
    {
      id: 4,
      name: 'Taylor Swift',
      slug: 'taylor-swift',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Taylor_Swift_2023.png/220px-Taylor_Swift_2023.png',
      category: 'Entertainment',
      description: 'American singer-songwriter and one of the world\'s leading recording artists.',
      questionCount: 312
    }
  ];
  
  // Mock data for trending questions
  const trendingQuestions = [
    {
      id: 1,
      title: 'What inspired you to pursue theoretical physics?',
      entity: 'Albert Einstein',
      entitySlug: 'albert-einstein',
      upvotes: 342,
      answerCount: 1
    },
    {
      id: 2,
      title: 'Is there a plan to send humans to Mars in the next decade?',
      entity: 'NASA',
      entitySlug: 'nasa',
      upvotes: 287,
      answerCount: 2
    },
    {
      id: 3,
      title: 'How do you handle the pressure of being a global icon?',
      entity: 'Taylor Swift',
      entitySlug: 'taylor-swift',
      upvotes: 256,
      answerCount: 0
    },
    {
      id: 4,
      title: 'What actions are being taken to address climate change globally?',
      entity: 'United Nations',
      entitySlug: 'united-nations',
      upvotes: 198,
      answerCount: 3
    },
    {
      id: 5,
      title: 'What was your most challenging moment in your career?',
      entity: 'Taylor Swift',
      entitySlug: 'taylor-swift',
      upvotes: 176,
      answerCount: 1
    }
  ];
  
  // Mock data for categories
  const categories = [
    { id: 1, name: 'Science', count: 456 },
    { id: 2, name: 'Technology', count: 389 },
    { id: 3, name: 'Entertainment', count: 567 },
    { id: 4, name: 'Business', count: 298 },
    { id: 5, name: 'Politics', count: 345 },
    { id: 6, name: 'Sports', count: 412 },
    { id: 7, name: 'History', count: 276 },
    { id: 8, name: 'Art', count: 189 }
  ];
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real implementation, this would navigate to search results
    console.log('Search query:', searchQuery);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          borderRadius: { xs: 0, md: '0 0 20px 20px' }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                I Wish I Could Ask...
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                Connect with experts, ask questions, and get answers from people and organizations you've always wanted to know about.
              </Typography>
              
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search for people, organizations, or questions..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ 
                    bgcolor: 'white',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" edge="end">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
              
              {!isAuthenticated && (
                <Box sx={{ mt: 4 }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ mr: 2, borderRadius: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      borderRadius: 2,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="/hero-image.svg"
                alt="People asking questions"
                sx={{ 
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Featured Entities Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Featured People & Organizations
          </Typography>
          <Button 
            component={RouterLink} 
            to="/entities" 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {featuredEntities.map((entity) => (
            <Grid item xs={12} sm={6} md={3} key={entity.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
                component={RouterLink}
                to={`/entities/${entity.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={entity.image}
                  alt={entity.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip 
                    label={entity.category} 
                    size="small" 
                    sx={{ mb: 1 }} 
                    color="primary"
                  />
                  <Typography gutterBottom variant="h6" component="div">
                    {entity.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {entity.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {entity.questionCount} questions
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Trending Questions Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Trending Questions
            </Typography>
            <Button 
              component={RouterLink} 
              to="/questions" 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {trendingQuestions.map((question) => (
              <Grid item xs={12} key={question.id}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Typography 
                          variant="h6" 
                          component={RouterLink}
                          to={`/questions/${question.id}`}
                          sx={{ 
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                              color: 'primary.main',
                            }
                          }}
                        >
                          {question.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mt: 1 }}
                        >
                          Asked to{' '}
                          <Link 
                            component={RouterLink}
                            to={`/entities/${question.entitySlug}`}
                            sx={{ 
                              textDecoration: 'none',
                              fontWeight: 'bold',
                              '&:hover': {
                                textDecoration: 'underline',
                              }
                            }}
                          >
                            {question.entity}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                          <Typography variant="body2" color="text.secondary">
                            {question.upvotes} upvotes
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {isAuthenticated ? (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/ask-question"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Ask Your Question
              </Button>
            </Box>
          ) : (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body1" gutterBottom>
                Have a question you've always wanted to ask?
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Sign Up to Ask Questions
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      
      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Browse by Category
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 3,
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
                component={RouterLink}
                to={`/categories/${category.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} entities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'primary.light', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center">
            How It Works
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main', 
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  1
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Find People & Organizations
                </Typography>
                <Typography variant="body1">
                  Browse through our extensive database of experts, celebrities, companies, and organizations.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main', 
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  2
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Ask Your Questions
                </Typography>
                <Typography variant="body1">
                  Submit questions you've always wanted to ask. Vote on questions from other users.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: 'primary.main', 
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  3
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  Get Expert Answers
                </Typography>
                <Typography variant="body1">
                  Verified experts provide answers to top questions. Engage with the community through comments.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/about"
              variant="outlined"
              size="large"
              sx={{ 
                borderRadius: 2,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Join Community Section */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Join Our Growing Community
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Connect with thousands of curious minds and experts from around the world. Ask questions, share knowledge, and be part of meaningful conversations.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              10K+
            </Typography>
            <Typography variant="body1">
              Active Users
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              50K+
            </Typography>
            <Typography variant="body1">
              Questions Asked
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              5K+
            </Typography>
            <Typography variant="body1">
              Verified Entities
            </Typography>
          </Grid>
        </Grid>
        
        {!isAuthenticated && (
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4, borderRadius: 2 }}
          >
            Join Now - It's Free!
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
