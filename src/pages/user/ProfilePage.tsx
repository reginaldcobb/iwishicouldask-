import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, GridLegacy as Grid, Card, CardContent, Avatar, Button, CircularProgress, Divider, Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, Chip, Badge, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Question, Answer, Badge as UserBadge } from '../../types';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
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

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  const isOwnProfile = currentUser?.username === username;
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // const [userResponse, questionsResponse, answersResponse, badgesResponse] = await Promise.all([
        //   usersAPI.getUser(username),
        //   questionsAPI.getUserQuestions(username),
        //   answersAPI.getUserAnswers(username),
        //   badgesAPI.getUserBadges(username)
        // ]);
        
        // Mock data for demonstration
        setTimeout(() => {
          // Mock user data
          const mockUser: User = {
            id: 2,
            username: username || 'user',
            email: `${username}@example.com`,
            roles: isOwnProfile ? ['User', 'Moderator'] : ['User'],
            reputationPoints: 350,
            dateJoined: '2023-01-15',
            bio: 'Curious mind with a passion for learning and sharing knowledge. I love asking questions about science, technology, and history.',
            location: 'New York, USA',
            website: 'https://example.com',
            avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`,
            socialLinks: {
              twitter: `https://twitter.com/${username}`,
              linkedin: `https://linkedin.com/in/${username}`,
              github: `https://github.com/${username}`
            }
          };
          
          // Mock questions data
          const mockQuestions: Question[] = [
            {
              id: 1,
              title: "What inspired you to pursue theoretical physics?",
              content: "I've always been fascinated by your work in theoretical physics, especially the theory of relativity. What initially sparked your interest in this field? Was there a specific moment or person that inspired you to pursue this path?",
              entity: {
                id: 1,
                name: "Albert Einstein",
                description: "Theoretical physicist who developed the theory of relativity.",
                slug: "albert-einstein",
                categories: [{ id: 1, name: "Science", description: "Scientific figures and organizations", slug: "science", createdAt: "2023-01-01", updatedAt: "2023-01-01" }],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
                isVerified: true,
                isAvailable: true,
                bio: "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.",
                createdAt: "2023-01-01",
                updatedAt: "2023-01-01"
              },
              askedBy: mockUser,
              tags: [
                { id: 1, name: "Physics", slug: "physics", description: "Questions related to physics" },
                { id: 7, name: "History", slug: "history", description: "Questions about historical events or context" }
              ],
              upvotes: 342,
              downvotes: 5,
              viewCount: 1256,
              isPremium: false,
              isSponsored: false,
              status: "approved",
              createdAt: "2023-06-15",
              updatedAt: "2023-06-15"
            },
            {
              id: 2,
              title: "Is there a plan to send humans to Mars in the next decade?",
              content: "With recent advancements in space technology, I'm curious about NASA's timeline for human missions to Mars. Are there concrete plans for the next decade?",
              entity: {
                id: 2,
                name: "NASA",
                description: "The National Aeronautics and Space Administration.",
                slug: "nasa",
                categories: [{ id: 1, name: "Science", description: "Scientific figures and organizations", slug: "science", createdAt: "2023-01-01", updatedAt: "2023-01-01" }],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/220px-NASA_logo.svg.png",
                isVerified: true,
                isAvailable: true,
                bio: "The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program.",
                createdAt: "2023-01-01",
                updatedAt: "2023-01-01"
              },
              askedBy: mockUser,
              tags: [
                { id: 2, name: "Space", slug: "space", description: "Questions related to space exploration" }
              ],
              upvotes: 287,
              downvotes: 2,
              viewCount: 980,
              isPremium: false,
              isSponsored: false,
              status: "approved",
              createdAt: "2023-06-10",
              updatedAt: "2023-06-10"
            },
            {
              id: 3,
              title: "What actions are being taken to address climate change globally?",
              content: "As climate change becomes an increasingly urgent issue, I'm interested in understanding what concrete actions the United Nations is taking to coordinate global efforts to address this challenge.",
              entity: {
                id: 3,
                name: "United Nations",
                description: "An intergovernmental organization that aims to maintain international peace and security.",
                slug: "united-nations",
                categories: [{ id: 5, name: "Politics", description: "Political figures and organizations", slug: "politics", createdAt: "2023-01-01", updatedAt: "2023-01-01" }],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/220px-Flag_of_the_United_Nations.svg.png",
                isVerified: true,
                isAvailable: true,
                bio: "The United Nations is an intergovernmental organization that aims to maintain international peace and security, develop friendly relations among nations, achieve international cooperation, and be a center for harmonizing the actions of nations.",
                createdAt: "2023-01-01",
                updatedAt: "2023-01-01"
              },
              askedBy: mockUser,
              tags: [
                { id: 8, name: "Climate", slug: "climate", description: "Questions related to climate and environment" },
                { id: 9, name: "Policy", slug: "policy", description: "Questions about policies and regulations" }
              ],
              upvotes: 198,
              downvotes: 8,
              viewCount: 756,
              isPremium: false,
              isSponsored: false,
              status: "approved",
              createdAt: "2023-05-20",
              updatedAt: "2023-05-20"
            }
          ];
          
          // Mock answers data
          const mockAnswers: Answer[] = [
            {
              id: 1,
              content: "Based on our current plans, NASA is indeed working towards sending humans to Mars in the 2030s. Our Artemis program, which aims to return humans to the Moon by 2025, is a crucial stepping stone for Mars missions. The technologies and capabilities we develop for lunar exploration will directly contribute to our Mars mission architecture. We're currently developing the Space Launch System (SLS) and Orion spacecraft, as well as researching habitat modules, in-situ resource utilization, and addressing the health challenges of long-duration spaceflight. While the timeline may evolve based on technological developments, funding, and international partnerships, we remain committed to the goal of human Mars exploration within the next decade or shortly thereafter.",
              question: {
                id: 4,
                title: "What is NASA's timeline for sending humans to Mars?",
                entity: {
                  id: 2,
                  name: "NASA",
                  slug: "nasa",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/220px-NASA_logo.svg.png",
                  isVerified: true
                }
              } as Question,
              answeredBy: {
                id: 5,
                username: "nasa_official",
                email: "nasa@example.com",
                roles: ["User"],
                reputationPoints: 5000,
                dateJoined: "2023-01-01"
              },
              upvotes: 156,
              downvotes: 2,
              isPremium: false,
              createdAt: "2023-06-25",
              updatedAt: "2023-06-25"
            },
            {
              id: 2,
              content: "The United Nations Framework Convention on Climate Change (UNFCCC) is the primary international mechanism for addressing climate change. Through the Paris Agreement, adopted in 2015, countries have committed to limiting global warming to well below 2°C above pre-industrial levels, with efforts to limit it to 1.5°C. Each country submits Nationally Determined Contributions (NDCs) outlining their climate actions. The UN also coordinates climate finance through the Green Climate Fund, supports technology transfer to developing nations, and provides platforms for knowledge sharing and capacity building. Additionally, the UN Sustainable Development Goals (particularly Goal 13) integrate climate action across multiple sectors. While progress has been made, we acknowledge that current commitments are insufficient to meet the Paris Agreement goals, and we continue to urge countries to enhance their ambition and implementation efforts.",
              question: {
                id: 3,
                title: "What actions are being taken to address climate change globally?",
                entity: {
                  id: 3,
                  name: "United Nations",
                  slug: "united-nations",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/220px-Flag_of_the_United_Nations.svg.png",
                  isVerified: true
                }
              } as Question,
              answeredBy: {
                id: 6,
                username: "un_representative",
                email: "un@example.com",
                roles: ["User"],
                reputationPoints: 4500,
                dateJoined: "2023-01-05"
              },
              upvotes: 203,
              downvotes: 5,
              isPremium: false,
              createdAt: "2023-05-22",
              updatedAt: "2023-05-22"
            }
          ];
          
          // Mock badges data
          const mockBadges: UserBadge[] = [
            {
              id: 1,
              name: "Curious Mind",
              description: "Asked 10 questions",
              level: "bronze",
              icon: "question_mark",
              earnedAt: "2023-02-10"
            },
            {
              id: 2,
              name: "Popular Question",
              description: "Asked a question with 100+ upvotes",
              level: "silver",
              icon: "trending_up",
              earnedAt: "2023-06-20"
            },
            {
              id: 3,
              name: "Good Citizen",
              description: "Voted on 50 questions or answers",
              level: "bronze",
              icon: "how_to_vote",
              earnedAt: "2023-03-15"
            }
          ];
          
          setUser(mockUser);
          setQuestions(mockQuestions);
          setAnswers(mockAnswers);
          setBadges(mockBadges);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [username, isOwnProfile, currentUser]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography color="error" variant="h6">
            {error || "User not found"}
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
        {/* Profile Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} md={2}>
              <Avatar
                src={user.avatarUrl}
                alt={user.username}
                sx={{ width: 120, height: 120, mx: { xs: 'auto', sm: 0 } }}
              />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h4" component="h1">
                  {user.username}
                </Typography>
                {user.roles.includes('Moderator') && (
                  <Chip 
                    label="Moderator" 
                    color="primary" 
                    size="small" 
                    sx={{ ml: 2 }}
                  />
                )}
              </Box>
              <Typography variant="body1" paragraph>
                {user.bio}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEventsIcon color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {user.reputationPoints} reputation points
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <QuestionAnswerIcon color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {questions.length} questions • {answers.length} answers
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge badgeContent={badges.length} color="primary">
                    <Chip 
                      label="Badges" 
                      variant="outlined" 
                      size="small" 
                      component={RouterLink}
                      to="#badges"
                      onClick={() => setTabValue(2)}
                      clickable
                    />
                  </Badge>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              {isOwnProfile ? (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/settings/profile"
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                >
                  Follow
                </Button>
              )}
            </Grid>
          </Grid>
          
          {/* Additional Profile Info */}
          <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Member since
                </Typography>
                <Typography variant="body1">
                  {new Date(user.dateJoined).toLocaleDateString()}
                </Typography>
              </Grid>
              {user.location && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {user.location}
                  </Typography>
                </Grid>
              )}
              {user.website && (
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Website
                  </Typography>
                  <Typography variant="body1">
                    <a href={user.website} target="_blank" rel="noopener noreferrer">
                      {user.website.replace(/^https?:\/\//, '')}
                    </a>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
        
        {/* Tabs Section */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="profile tabs"
            >
              <Tab label="Questions" id="profile-tab-0" aria-controls="profile-tabpanel-0" />
              <Tab label="Answers" id="profile-tab-1" aria-controls="profile-tabpanel-1" />
              <Tab label="Badges" id="profile-tab-2" aria-controls="profile-tabpanel-2" />
              {isOwnProfile && (
                <Tab label="Activity" id="profile-tab-3" aria-controls="profile-tabpanel-3" />
              )}
            </Tabs>
          </Box>
          
          {/* Questions Tab */}
          <TabPanel value={tabValue} index={0}>
            {questions.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No questions yet
                </Typography>
                <Typography variant="body1" paragraph>
                  {isOwnProfile ? "You haven't asked any questions yet." : `${user.username} hasn't asked any questions yet.`}
                </Typography>
                {isOwnProfile && (
                  <Button 
                    component={RouterLink} 
                    to="/ask-question" 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Ask a Question
                  </Button>
                )}
              </Box>
            ) : (
              <Grid container spacing={3}>
                {questions.map((question) => (
                  <Grid item xs={12} key={question.id}>
                    <Card sx={{ borderRadius: 2 }}>
                      <CardContent>
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
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Asked to{' '}
                            <Link 
                              component={RouterLink}
                              to={`/entities/${question.entity.slug}`}
                              sx={{ 
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                '&:hover': {
                                  textDecoration: 'underline',
                                }
                              }}
                            >
                              {question.entity.name}
                            </Link>
                            {' '}on {new Date(question.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {question.tags.map((tag) => (
                            <Chip 
                              key={tag.id} 
                              label={tag.name} 
                              size="small" 
                              component={RouterLink} 
                              to={`/tags/${tag.slug}`}
                              clickable
                              sx={{ mr: 0.5 }}
                            />
                          ))}
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThumbUpIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                              {question.upvotes} upvotes
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {question.viewCount} views
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
          
          {/* Answers Tab */}
          <TabPanel value={tabValue} index={1}>
            {answers.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No answers yet
                </Typography>
                <Typography variant="body1" paragraph>
                  {isOwnProfile ? "You haven't answered any questions yet." : `${user.username} hasn't answered any questions yet.`}
                </Typography>
                {isOwnProfile && (
                  <Button 
                    component={RouterLink} 
                    to="/questions" 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Browse Questions
                  </Button>
                )}
              </Box>
            ) : (
              <Grid container spacing={3}>
                {answers.map((answer) => (
                  <Grid item xs={12} key={answer.id}>
                    <Card sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          component={RouterLink}
                          to={`/questions/${answer.question.id}`}
                          sx={{ 
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                              color: 'primary.main',
                            }
                          }}
                        >
                          {answer.question.title}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Answered for{' '}
                            <Link 
                              component={RouterLink}
                              to={`/entities/${answer.question.entity.slug}`}
                              sx={{ 
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                '&:hover': {
                                  textDecoration: 'underline',
                                }
                              }}
                            >
                              {answer.question.entity.name}
                            </Link>
                            {' '}on {new Date(answer.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                          {answer.content.length > 200 
                            ? `${answer.content.substring(0, 200)}...` 
                            : answer.content}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThumbUpIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {answer.upvotes} upvotes
                            </Typography>
                          </Box>
                          <Button
                            component={RouterLink}
                            to={`/questions/${answer.question.id}`}
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            View Full Answer
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
          
          {/* Badges Tab */}
          <TabPanel value={tabValue} index={2}>
            {badges.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No badges yet
                </Typography>
                <Typography variant="body1" paragraph>
                  {isOwnProfile 
                    ? "You haven't earned any badges yet. Participate in the community to earn badges!" 
                    : `${user.username} hasn't earned any badges yet.`}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {badges.map((badge) => (
                  <Grid item xs={12} sm={6} md={4} key={badge.id}>
                    <Card sx={{ 
                      borderRadius: 2,
                      border: 1,
                      borderColor: 
                        badge.level === 'gold' 
                          ? 'warning.main' 
                          : badge.level === 'silver' 
                            ? 'grey.400' 
                            : 'brown'
                    }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            mx: 'auto',
                            mb: 2,
                            bgcolor: 
                              badge.level === 'gold' 
                                ? 'warning.main' 
                                : badge.level === 'silver' 
                                  ? 'grey.400' 
                                  : '#cd7f32'
                          }}
                        >
                          {badge.icon === 'question_mark' && 'Q'}
                          {badge.icon === 'trending_up' && 'T'}
                          {badge.icon === 'how_to_vote' && 'V'}
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          {badge.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {badge.description}
                        </Typography>
                        <Chip 
                          label={`${badge.level ? badge.level.charAt(0).toUpperCase() + badge.level.slice(1) : 'Unknown'} Badge`}
                          size="small"
                          sx={{ 
                            bgcolor: 
                              badge.level === 'gold' 
                                ? 'warning.light' 
                                : badge.level === 'silver' 
                                  ? 'grey.300' 
                                  : '#e6c8b0'
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </TabPanel>
          
          {/* Activity Tab (Only for own profile) */}
          {isOwnProfile && (
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Activity Feed
                </Typography>
                <Typography variant="body1" paragraph>
                  This feature is coming soon! You'll be able to see your recent activity, including questions, answers, comments, and votes.
                </Typography>
              </Box>
            </TabPanel>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
