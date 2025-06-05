import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, GridLegacy as Grid, Card, CardContent, Avatar, Button, CircularProgress, Divider, Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, Chip, Link } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Link as RouterLink } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`leaderboard-tabpanel-${index}`}
      aria-labelledby={`leaderboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const LeaderboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [topQuestions, setTopQuestions] = useState<any[]>([]);
  const [topEntities, setTopEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('all');
  
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // const [usersResponse, questionsResponse, entitiesResponse] = await Promise.all([
        //   leaderboardAPI.getTopUsers(timeRange),
        //   leaderboardAPI.getTopQuestions(timeRange),
        //   leaderboardAPI.getTopEntities(timeRange)
        // ]);
        
        // Mock data for demonstration
        setTimeout(() => {
          // Mock top users data
          const mockTopUsers: User[] = [
            {
              id: 1,
              username: "science_guru",
              email: "science@example.com",
              roles: ["User", "Moderator"],
              reputationPoints: 5240,
              dateJoined: "2023-01-05",
              avatarUrl: "https://ui-avatars.com/api/?name=Science+Guru&background=random"
            },
            {
              id: 2,
              username: "curious_mind",
              email: "curious@example.com",
              roles: ["User"],
              reputationPoints: 4150,
              dateJoined: "2023-01-15",
              avatarUrl: "https://ui-avatars.com/api/?name=Curious+Mind&background=random"
            },
            {
              id: 3,
              username: "tech_explorer",
              email: "tech@example.com",
              roles: ["User"],
              reputationPoints: 3780,
              dateJoined: "2023-02-01",
              avatarUrl: "https://ui-avatars.com/api/?name=Tech+Explorer&background=random"
            },
            {
              id: 4,
              username: "history_buff",
              email: "history@example.com",
              roles: ["User"],
              reputationPoints: 3450,
              dateJoined: "2023-02-10",
              avatarUrl: "https://ui-avatars.com/api/?name=History+Buff&background=random"
            },
            {
              id: 5,
              username: "space_enthusiast",
              email: "space@example.com",
              roles: ["User"],
              reputationPoints: 3120,
              dateJoined: "2023-02-15",
              avatarUrl: "https://ui-avatars.com/api/?name=Space+Enthusiast&background=random"
            },
            {
              id: 6,
              username: "quantum_fan",
              email: "quantum@example.com",
              roles: ["User"],
              reputationPoints: 2890,
              dateJoined: "2023-02-20",
              avatarUrl: "https://ui-avatars.com/api/?name=Quantum+Fan&background=random"
            },
            {
              id: 7,
              username: "climate_advocate",
              email: "climate@example.com",
              roles: ["User"],
              reputationPoints: 2650,
              dateJoined: "2023-03-01",
              avatarUrl: "https://ui-avatars.com/api/?name=Climate+Advocate&background=random"
            },
            {
              id: 8,
              username: "music_lover",
              email: "music@example.com",
              roles: ["User"],
              reputationPoints: 2480,
              dateJoined: "2023-03-10",
              avatarUrl: "https://ui-avatars.com/api/?name=Music+Lover&background=random"
            },
            {
              id: 9,
              username: "policy_wonk",
              email: "policy@example.com",
              roles: ["User"],
              reputationPoints: 2340,
              dateJoined: "2023-03-15",
              avatarUrl: "https://ui-avatars.com/api/?name=Policy+Wonk&background=random"
            },
            {
              id: 10,
              username: "art_aficionado",
              email: "art@example.com",
              roles: ["User"],
              reputationPoints: 2210,
              dateJoined: "2023-03-20",
              avatarUrl: "https://ui-avatars.com/api/?name=Art+Aficionado&background=random"
            }
          ];
          
          // Mock top questions data
          const mockTopQuestions = [
            {
              id: 1,
              title: "What inspired you to pursue theoretical physics?",
              upvotes: 342,
              views: 1256,
              answerCount: 1,
              askedBy: "curious_mind",
              entity: "Albert Einstein",
              entitySlug: "albert-einstein"
            },
            {
              id: 2,
              title: "Is there a plan to send humans to Mars in the next decade?",
              upvotes: 287,
              views: 980,
              answerCount: 2,
              askedBy: "space_enthusiast",
              entity: "NASA",
              entitySlug: "nasa"
            },
            {
              id: 3,
              title: "How do you handle the pressure of being a global icon?",
              upvotes: 256,
              views: 845,
              answerCount: 0,
              askedBy: "music_lover",
              entity: "Taylor Swift",
              entitySlug: "taylor-swift"
            },
            {
              id: 4,
              title: "What actions are being taken to address climate change globally?",
              upvotes: 198,
              views: 756,
              answerCount: 3,
              askedBy: "climate_advocate",
              entity: "United Nations",
              entitySlug: "united-nations"
            },
            {
              id: 5,
              title: "What was your most challenging moment in your career?",
              upvotes: 176,
              views: 690,
              answerCount: 1,
              askedBy: "tech_explorer",
              entity: "Taylor Swift",
              entitySlug: "taylor-swift"
            },
            {
              id: 6,
              title: "How do you see the future of electric vehicles evolving?",
              upvotes: 165,
              views: 620,
              answerCount: 2,
              askedBy: "tech_explorer",
              entity: "Elon Musk",
              entitySlug: "elon-musk"
            },
            {
              id: 7,
              title: "What historical period would you most like to visit and why?",
              upvotes: 154,
              views: 580,
              answerCount: 1,
              askedBy: "history_buff",
              entity: "Neil deGrasse Tyson",
              entitySlug: "neil-degrasse-tyson"
            },
            {
              id: 8,
              title: "How do you approach creating characters that resonate with audiences?",
              upvotes: 143,
              views: 540,
              answerCount: 0,
              askedBy: "art_aficionado",
              entity: "J.K. Rowling",
              entitySlug: "jk-rowling"
            },
            {
              id: 9,
              title: "What role do you see for quantum computing in the next decade?",
              upvotes: 132,
              views: 510,
              answerCount: 2,
              askedBy: "quantum_fan",
              entity: "IBM",
              entitySlug: "ibm"
            },
            {
              id: 10,
              title: "How do you balance innovation with regulatory compliance?",
              upvotes: 121,
              views: 480,
              answerCount: 1,
              askedBy: "policy_wonk",
              entity: "Apple",
              entitySlug: "apple"
            }
          ];
          
          // Mock top entities data
          const mockTopEntities = [
            {
              id: 1,
              name: "NASA",
              slug: "nasa",
              questionCount: 243,
              answerCount: 156,
              upvotes: 1250,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/220px-NASA_logo.svg.png",
              category: "Science"
            },
            {
              id: 2,
              name: "Taylor Swift",
              slug: "taylor-swift",
              questionCount: 312,
              answerCount: 87,
              upvotes: 980,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Taylor_Swift_2023.png/220px-Taylor_Swift_2023.png",
              category: "Entertainment"
            },
            {
              id: 3,
              name: "Albert Einstein",
              slug: "albert-einstein",
              questionCount: 156,
              answerCount: 98,
              upvotes: 870,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
              category: "Science"
            },
            {
              id: 4,
              name: "United Nations",
              slug: "united-nations",
              questionCount: 189,
              answerCount: 145,
              upvotes: 760,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/220px-Flag_of_the_United_Nations.svg.png",
              category: "Government"
            },
            {
              id: 5,
              name: "Elon Musk",
              slug: "elon-musk",
              questionCount: 210,
              answerCount: 65,
              upvotes: 720,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
              category: "Business"
            },
            {
              id: 6,
              name: "Apple",
              slug: "apple",
              questionCount: 178,
              answerCount: 120,
              upvotes: 680,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/220px-Apple_logo_black.svg.png",
              category: "Technology"
            },
            {
              id: 7,
              name: "Neil deGrasse Tyson",
              slug: "neil-degrasse-tyson",
              questionCount: 145,
              answerCount: 110,
              upvotes: 650,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Neil_deGrasse_Tyson_2017.jpg/220px-Neil_deGrasse_Tyson_2017.jpg",
              category: "Science"
            },
            {
              id: 8,
              name: "J.K. Rowling",
              slug: "jk-rowling",
              questionCount: 132,
              answerCount: 45,
              upvotes: 590,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/220px-J._K._Rowling_2010.jpg",
              category: "Entertainment"
            },
            {
              id: 9,
              name: "IBM",
              slug: "ibm",
              questionCount: 120,
              answerCount: 95,
              upvotes: 540,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/220px-IBM_logo.svg.png",
              category: "Technology"
            },
            {
              id: 10,
              name: "World Health Organization",
              slug: "who",
              questionCount: 165,
              answerCount: 130,
              upvotes: 510,
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/220px-WHO_logo.svg.png",
              category: "Health"
            }
          ];
          
          setTopUsers(mockTopUsers);
          setTopQuestions(mockTopQuestions);
          setTopEntities(mockTopEntities);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to load leaderboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, [timeRange]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleTimeRangeChange = (range: 'week' | 'month' | 'all') => {
    setTimeRange(range);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Button 
            component={RouterLink} 
            to="/" 
            variant="contained" 
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Leaderboard
        </Typography>
        <Typography variant="body1" paragraph>
          Discover the top contributors, most popular questions, and trending entities in our community.
        </Typography>
        
        {/* Time Range Selector */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Tabs 
              value={timeRange} 
              onChange={(e, value) => handleTimeRangeChange(value)}
              aria-label="time range tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="All Time" value="all" />
              <Tab label="This Month" value="month" />
              <Tab label="This Week" value="week" />
            </Tabs>
          </Paper>
        </Box>
        
        {/* Category Tabs */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="leaderboard tabs"
              centered
            >
              <Tab 
                label="Top Users" 
                id="leaderboard-tab-0" 
                aria-controls="leaderboard-tabpanel-0" 
                icon={<PeopleIcon />}
                iconPosition="start"
              />
              <Tab 
                label="Popular Questions" 
                id="leaderboard-tab-1" 
                aria-controls="leaderboard-tabpanel-1" 
                icon={<QuestionAnswerIcon />}
                iconPosition="start"
              />
              <Tab 
                label="Trending Entities" 
                id="leaderboard-tab-2" 
                aria-controls="leaderboard-tabpanel-2" 
                icon={<EmojiEventsIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>
          
          {/* Top Users Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {topUsers.map((user, index) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    {index < 3 && (
                      <Avatar
                        sx={{
                          position: 'absolute',
                          top: -15,
                          right: -15,
                          width: 40,
                          height: 40,
                          bgcolor: 
                            index === 0 
                              ? 'warning.main' 
                              : index === 1 
                                ? 'grey.400' 
                                : '#cd7f32',
                          border: '2px solid white',
                          zIndex: 1
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    )}
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={user.avatarUrl}
                          alt={user.username}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography 
                            variant="h6" 
                            component={RouterLink}
                            to={`/users/${user.username}`}
                            sx={{ 
                              textDecoration: 'none',
                              color: 'text.primary',
                              '&:hover': {
                                color: 'primary.main',
                              }
                            }}
                          >
                            {user.username}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {user.roles.includes('Moderator') && (
                              <Chip 
                                label="Moderator" 
                                color="primary" 
                                size="small" 
                                sx={{ mr: 1 }}
                              />
                            )}
                            <Typography variant="body2" color="text.secondary">
                              Member since {new Date(user.dateJoined).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" color="primary">
                          {user.reputationPoints.toLocaleString()} points
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button
                          component={RouterLink}
                          to={`/users/${user.username}`}
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 2 }}
                        >
                          View Profile
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          
          {/* Popular Questions Tab */}
          <TabPanel value={tabValue} index={1}>
            <List>
              {topQuestions.map((question, index) => (
                <React.Fragment key={question.id}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <ListItem 
                      component={RouterLink}
                      to={`/questions/${question.id}`}
                      sx={{ 
                        textDecoration: 'none',
                        color: 'text.primary',
                        py: 2
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: 
                              index === 0 
                                ? 'warning.main' 
                                : index === 1 
                                  ? 'grey.400' 
                                  : index === 2 
                                    ? '#cd7f32' 
                                    : 'primary.main'
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {question.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
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
                              {' '}by{' '}
                              <Link 
                                component={RouterLink}
                                to={`/users/${question.askedBy}`}
                                sx={{ 
                                  textDecoration: 'none',
                                  fontWeight: 'bold',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  }
                                }}
                              >
                                {question.askedBy}
                              </Link>
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                {question.upvotes} upvotes
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                {question.views} views
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Paper>
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
          
          {/* Trending Entities Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {topEntities.map((entity, index) => (
                <Grid item xs={12} sm={6} md={4} key={entity.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'visible',
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
                    {index < 3 && (
                      <Avatar
                        sx={{
                          position: 'absolute',
                          top: -15,
                          right: -15,
                          width: 40,
                          height: 40,
                          bgcolor: 
                            index === 0 
                              ? 'warning.main' 
                              : index === 1 
                                ? 'grey.400' 
                                : '#cd7f32',
                          border: '2px solid white',
                          zIndex: 1
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    )}
                    <Box 
                      sx={{ 
                        height: 140, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.100'
                      }}
                    >
                      <img
                        src={entity.image}
                        alt={entity.name}
                        style={{ 
                          maxHeight: '100%', 
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
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
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Questions
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {entity.questionCount}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Answers
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {entity.answerCount}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Upvotes
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {entity.upvotes}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Box>
        
        {/* Join Community Section */}
        {!isAuthenticated && (
          <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Join Our Community
            </Typography>
            <Typography variant="body1" paragraph>
              Sign up to ask questions, earn reputation points, and appear on the leaderboard!
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Create an Account
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default LeaderboardPage;
