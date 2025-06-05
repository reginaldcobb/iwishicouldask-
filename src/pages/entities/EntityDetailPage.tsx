import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  GridLegacy as Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  Avatar, 
  Divider,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  IconButton
} from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { entitiesAPI, questionsAPI } from '../../api';
import { Entity, Question } from '../../types';

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
      id={`entity-tabpanel-${index}`}
      aria-labelledby={`entity-tab-${index}`}
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

const EntityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        setLoading(true);
        if (!slug) return;
        
        // In a real implementation, these would be API calls
        // const [entityResponse, questionsResponse] = await Promise.all([
        //   entitiesAPI.getEntityBySlug(slug),
        //   questionsAPI.getQuestionsByEntity(slug)
        // ]);
        
        // setEntity(entityResponse.data);
        // setQuestions(questionsResponse.data.results);
        
        // For demonstration, use mock data
        const mockEntity: Entity = {
          id: 1,
          name: 'Albert Einstein',
          description: 'Theoretical physicist',
          slug: 'albert-einstein',
          categories: [
            { id: 1, name: 'Science', description: 'Scientific figures and organizations', slug: 'science', createdAt: '', updatedAt: '' }
          ],
          image: 'https://via.placeholder.com/400',
          isVerified: true,
          isAvailable: true,
          bio: 'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science. He is best known to the general public for his mass–energy equivalence formula E = mc², which has been dubbed "the world\'s most famous equation". He received the 1921 Nobel Prize in Physics "for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect", a pivotal step in the development of quantum theory.',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01'
        };
        
        const mockQuestions: Question[] = [
          {
            id: 1,
            title: "What would you say is your greatest achievement?",
            content: "I've always been curious about what you consider your most significant contribution to science and humanity.",
            entity: mockEntity,
            askedBy: {
              id: 2,
              username: "curious_mind",
              email: "curious@example.com",
              roles: [],
              reputationPoints: 120,
              dateJoined: "2023-01-01"
            },
            tags: [
              { id: 1, name: "Science", slug: "science", description: "Scientific topics" },
              { id: 2, name: "Physics", slug: "physics", description: "Physics topics" }
            ],
            upvotes: 245,
            downvotes: 12,
            viewCount: 1200,
            isPremium: false,
            isSponsored: false,
            status: "approved",
            createdAt: "2023-05-15",
            updatedAt: "2023-05-15"
          },
          {
            id: 2,
            title: "If you could change one thing about your theory of relativity, what would it be?",
            content: "Given the advancements in physics since your time, would you revise any aspects of your theory?",
            entity: mockEntity,
            askedBy: {
              id: 3,
              username: "physics_fan",
              email: "physics@example.com",
              roles: [],
              reputationPoints: 85,
              dateJoined: "2023-01-01"
            },
            tags: [
              { id: 1, name: "Science", slug: "science", description: "Scientific topics" },
              { id: 2, name: "Physics", slug: "physics", description: "Physics topics" }
            ],
            upvotes: 189,
            downvotes: 8,
            viewCount: 950,
            isPremium: false,
            isSponsored: false,
            status: "approved",
            createdAt: "2023-06-10",
            updatedAt: "2023-06-10"
          },
          {
            id: 3,
            title: "What are your thoughts on quantum mechanics and the uncertainty principle?",
            content: "You famously said 'God does not play dice with the universe.' How do you reconcile this with modern quantum theory?",
            entity: mockEntity,
            askedBy: {
              id: 4,
              username: "quantum_enthusiast",
              email: "quantum@example.com",
              roles: [],
              reputationPoints: 210,
              dateJoined: "2023-01-01"
            },
            tags: [
              { id: 1, name: "Science", slug: "science", description: "Scientific topics" },
              { id: 2, name: "Physics", slug: "physics", description: "Physics topics" },
              { id: 3, name: "Quantum", slug: "quantum", description: "Quantum physics topics" }
            ],
            upvotes: 156,
            downvotes: 5,
            viewCount: 820,
            isPremium: true,
            isSponsored: false,
            status: "approved",
            createdAt: "2023-07-05",
            updatedAt: "2023-07-05"
          }
        ];
        
        setEntity(mockEntity);
        setQuestions(mockQuestions);
      } catch (err) {
        console.error('Error fetching entity details:', err);
        setError('Failed to load entity details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntityDetails();
  }, [slug]);

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

  if (error || !entity) {
    return (
      <Typography color="error" sx={{ my: 4 }}>
        {error || 'Entity not found.'}
      </Typography>
    );
  }

  return (
    <Box>
      {/* Entity Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={entity.image || "https://via.placeholder.com/400"}
                alt={entity.name}
                sx={{ borderRadius: 2, maxHeight: 300, objectFit: 'cover' }}
              />
              {entity.isVerified && (
                <Chip 
                  label="Verified" 
                  color="primary"
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    fontWeight: 'bold'
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {entity.name}
              </Typography>
              <Chip 
                label={entity.isAvailable ? "Available for Questions" : "Currently Unavailable"}
                color={entity.isAvailable ? "success" : "default"}
              />
            </Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {entity.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {entity.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  component={RouterLink}
                  to={`/categories/${category.slug}`}
                  clickable
                />
              ))}
            </Box>
            
            <Typography variant="body1" paragraph>
              {entity.bio}
            </Typography>
            
            <Button
              variant="contained"
              component={RouterLink}
              to={`/ask-question?entity=${entity.id}`}
              startIcon={<QuestionAnswerIcon />}
              sx={{ mt: 2, borderRadius: 2 }}
              disabled={!entity.isAvailable}
            >
              Ask a Question
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="entity tabs"
            centered
          >
            <Tab label="Questions" id="entity-tab-0" aria-controls="entity-tabpanel-0" />
            <Tab label="About" id="entity-tab-1" aria-controls="entity-tabpanel-1" />
            <Tab label="Statistics" id="entity-tab-2" aria-controls="entity-tabpanel-2" />
          </Tabs>
        </Box>
        
        {/* Questions Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Questions for {entity.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse questions that have been asked to {entity.name} or ask your own.
            </Typography>
          </Box>
          
          {questions.length === 0 ? (
            <Typography sx={{ my: 4 }}>
              No questions have been asked yet. Be the first to ask a question!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {questions.map((question) => (
                <Grid item xs={12} key={question.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          component={RouterLink} 
                          to={`/questions/${question.id}`}
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {question.title}
                        </Typography>
                        {question.isPremium && (
                          <Chip 
                            label="Premium" 
                            size="small" 
                            color="secondary"
                          />
                        )}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {question.content.length > 150 
                          ? `${question.content.substring(0, 150)}...` 
                          : question.content}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {question.tags.map((tag) => (
                          <Chip
                            key={tag.id}
                            label={tag.name}
                            size="small"
                            component={RouterLink}
                            to={`/tags/${tag.slug}`}
                            clickable
                          />
                        ))}
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <ThumbUpIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">{question.upvotes}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <ThumbDownIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">{question.downvotes}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VisibilityIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">{question.viewCount}</Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={question.askedBy?.profileImage}
                            alt={question.askedBy?.username}
                            sx={{ width: 24, height: 24, mr: 1 }}
                          />
                          <Typography variant="body2">
                            {question.askedBy?.username}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to={`/questions?entity=${entity.id}`}
              sx={{ borderRadius: 2 }}
            >
              View All Questions
            </Button>
          </Box>
        </TabPanel>
        
        {/* About Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            About {entity.name}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" paragraph>
                {entity.bio}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Credentials & Background
              </Typography>
              <Typography variant="body1" paragraph>
                Albert Einstein was born in Ulm, in the Kingdom of Württemberg in the German Empire, on 14 March 1879. His parents were Hermann Einstein, a salesman and engineer, and Pauline Koch. In 1880, the family moved to Munich, where Einstein's father and his uncle Jakob founded Elektrotechnische Fabrik J. Einstein & Cie, a company that manufactured electrical equipment based on direct current.
              </Typography>
              <Typography variant="body1" paragraph>
                Einstein attended elementary school at the Luitpold Gymnasium in Munich. However, he felt alienated there and struggled with the institution's rigid pedagogical style. He also had what were considered to be speech challenges, though he developed a passion for classical music and playing the violin, which he would maintain throughout his life. Most significantly, Einstein was fascinated by concepts of science and mathematics from an early age.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Notable Achievements
              </Typography>
              <Typography variant="body1" component="ul">
                <li>Developed the theory of relativity, one of the two pillars of modern physics</li>
                <li>Formulated the mass-energy equivalence formula E = mc²</li>
                <li>Received the 1921 Nobel Prize in Physics for his discovery of the law of the photoelectric effect</li>
                <li>Published more than 300 scientific papers and 150 non-scientific works</li>
                <li>Named "Person of the Century" by Time magazine in 1999</li>
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Facts
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Born" secondary="March 14, 1879" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Died" secondary="April 18, 1955" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Nationality" secondary="German, Swiss, American" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Fields" secondary="Physics, Philosophy" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Institutions" secondary="Swiss Patent Office, University of Zurich, Charles University, Prussian Academy of Sciences, Kaiser Wilhelm Institute, University of Leiden, Institute for Advanced Study" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
              
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Categories
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {entity.categories.map((category) => (
                      <Chip
                        key={category.id}
                        label={category.name}
                        component={RouterLink}
                        to={`/categories/${category.slug}`}
                        clickable
                        sx={{ mb: 1 }}
                      />
                    ))}
                    <Chip label="Physics" />
                    <Chip label="Nobel Laureates" />
                    <Chip label="Historical Figures" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Statistics Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom>
            Statistics
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
                <Typography variant="h3" color="primary.main">
                  {questions.length}
                </Typography>
                <Typography variant="body1">
                  Questions Asked
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
                <Typography variant="h3" color="primary.main">
                  {Math.floor(questions.length * 0.8)}
                </Typography>
                <Typography variant="body1">
                  Questions Answered
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
                <Typography variant="h3" color="primary.main">
                  {questions.reduce((sum, q) => sum + q.upvotes, 0)}
                </Typography>
                <Typography variant="body1">
                  Total Upvotes
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
                <Typography variant="h3" color="primary.main">
                  {questions.reduce((sum, q) => sum + q.viewCount, 0)}
                </Typography>
                <Typography variant="body1">
                  Total Views
                </Typography>
              </Card>
            </Grid>
          </Grid>
          
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Most Popular Questions
          </Typography>
          <List>
            {questions
              .sort((a, b) => b.upvotes - a.upvotes)
              .slice(0, 5)
              .map((question) => (
                <ListItem 
                  key={question.id}
                  component={RouterLink}
                  to={`/questions/${question.id}`}
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText 
                    primary={question.title} 
                    secondary={`${question.upvotes} upvotes • ${question.viewCount} views`} 
                  />
                </ListItem>
              ))}
          </List>
          
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Question Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Array.from(new Set(questions.flatMap(q => q.tags.map(t => t.name)))).map((tagName) => (
              <Chip
                key={tagName}
                label={tagName}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </TabPanel>
      </Box>
      
      {/* Similar Entities */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Similar People & Organizations
        </Typography>
        <Grid container spacing={3}>
          {[
            { id: 7, name: 'Stephen Hawking', description: 'Theoretical physicist', image: 'https://via.placeholder.com/150' },
            { id: 8, name: 'Marie Curie', description: 'Physicist and chemist', image: 'https://via.placeholder.com/150' },
            { id: 9, name: 'Richard Feynman', description: 'Theoretical physicist', image: 'https://via.placeholder.com/150' }
          ].map((similarEntity) => (
            <Grid item xs={12} sm={4} key={similarEntity.id}>
              <Card 
                sx={{ 
                  display: 'flex',
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
                component={RouterLink}
                to={`/entities/${similarEntity.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={similarEntity.image}
                  alt={similarEntity.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      {similarEntity.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {similarEntity.description}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EntityDetailPage;
