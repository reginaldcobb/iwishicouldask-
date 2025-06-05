import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, GridLegacy as Grid, Card, CardContent, Tabs, Tab, Chip, Avatar, Button, CircularProgress, Divider, IconButton, TextField, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAuth } from '../../contexts/AuthContext';
import { Question, Answer, Comment } from '../../types';

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
      id={`question-tabpanel-${index}`}
      aria-labelledby={`question-tab-${index}`}
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

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls
        // const [questionResponse, answersResponse] = await Promise.all([
        //   questionsAPI.getQuestion(Number(id)),
        //   answersAPI.getAnswers(Number(id))
        // ]);
        
        // Mock data for demonstration
        // Simulate API delay
        setTimeout(() => {
          // Mock question data
          const mockQuestion: Question = {
            id: Number(id),
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
            askedBy: {
              id: 2,
              username: "curious_mind",
              email: "curious@example.com",
              roles: ["User"],
              reputationPoints: 120,
              dateJoined: "2023-01-15"
            },
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
          };
          
          // Mock answers data
          const mockAnswers: Answer[] = [
            {
              id: 1,
              content: "My interest in physics began when I was a young boy and my father showed me a compass. I was fascinated by the invisible forces that could move the needle. Later, I became deeply interested in mathematics and the works of scientists who came before me. The beauty of theoretical physics is that it allows us to understand the fundamental laws that govern our universe. I was particularly drawn to the inconsistencies between Newtonian mechanics and Maxwell's equations, which eventually led me to develop the theory of relativity. Throughout my career, I've been guided by the principle that the most beautiful theories are the simplest ones that can explain complex phenomena.",
              question: mockQuestion,
              answeredBy: {
                id: 1,
                username: "albert_einstein",
                email: "einstein@example.com",
                roles: ["User"],
                reputationPoints: 5000,
                dateJoined: "2023-01-01"
              },
              upvotes: 567,
              downvotes: 3,
              isPremium: false,
              createdAt: "2023-06-16",
              updatedAt: "2023-06-16"
            }
          ];
          
          // Mock comments data
          const mockComments: Comment[] = [
            {
              id: 1,
              content: "This is such an insightful answer! Thank you for sharing your journey.",
              user: {
                id: 3,
                username: "science_lover",
                email: "science@example.com",
                roles: ["User", "Moderator"],
                reputationPoints: 350,
                dateJoined: "2023-02-01"
              },
              parentType: "answer",
              parentId: 1,
              upvotes: 45,
              downvotes: 0,
              createdAt: "2023-06-17",
              updatedAt: "2023-06-17"
            },
            {
              id: 2,
              content: "I've always wondered about this too. Great question!",
              user: {
                id: 4,
                username: "quantum_fan",
                email: "quantum@example.com",
                roles: ["User"],
                reputationPoints: 120,
                dateJoined: "2023-02-15"
              },
              parentType: "question",
              parentId: Number(id),
              upvotes: 23,
              downvotes: 0,
              createdAt: "2023-06-16",
              updatedAt: "2023-06-16"
            }
          ];
          
          setQuestion(mockQuestion);
          setAnswers(mockAnswers);
          setComments(mockComments);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching question data:', err);
        setError('Failed to load question data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchQuestionData();
  }, [id]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleUpvoteQuestion = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      return;
    }
    
    // In a real implementation, this would be an API call
    // questionsAPI.upvoteQuestion(Number(id))
    //   .then(response => {
    //     setQuestion(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
    //   })
    //   .catch(err => {
    //     console.error('Error upvoting question:', err);
    //   });
    
    // For demonstration, update state directly
    setQuestion(prev => prev ? { ...prev, upvotes: prev.upvotes + 1 } : null);
  };
  
  const handleDownvoteQuestion = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      return;
    }
    
    // In a real implementation, this would be an API call
    // questionsAPI.downvoteQuestion(Number(id))
    //   .then(response => {
    //     setQuestion(prev => prev ? { ...prev, downvotes: prev.downvotes + 1 } : null);
    //   })
    //   .catch(err => {
    //     console.error('Error downvoting question:', err);
    //   });
    
    // For demonstration, update state directly
    setQuestion(prev => prev ? { ...prev, downvotes: prev.downvotes + 1 } : null);
  };
  
  const handleUpvoteAnswer = (answerId: number) => {
    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      return;
    }
    
    // In a real implementation, this would be an API call
    // answersAPI.upvoteAnswer(answerId)
    //   .then(response => {
    //     setAnswers(prev => prev.map(answer => 
    //       answer.id === answerId ? { ...answer, upvotes: answer.upvotes + 1 } : answer
    //     ));
    //   })
    //   .catch(err => {
    //     console.error('Error upvoting answer:', err);
    //   });
    
    // For demonstration, update state directly
    setAnswers(prev => prev.map(answer => 
      answer.id === answerId ? { ...answer, upvotes: answer.upvotes + 1 } : answer
    ));
  };
  
  const handleDownvoteAnswer = (answerId: number) => {
    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      return;
    }
    
    // In a real implementation, this would be an API call
    // answersAPI.downvoteAnswer(answerId)
    //   .then(response => {
    //     setAnswers(prev => prev.map(answer => 
    //       answer.id === answerId ? { ...answer, downvotes: answer.downvotes + 1 } : answer
    //     ));
    //   })
    //   .catch(err => {
    //     console.error('Error downvoting answer:', err);
    //   });
    
    // For demonstration, update state directly
    setAnswers(prev => prev.map(answer => 
      answer.id === answerId ? { ...answer, downvotes: answer.downvotes + 1 } : answer
    ));
  };
  
  const handleCommentSubmit = (parentType: 'question' | 'answer', parentId: number) => {
    if (!isAuthenticated || !newComment.trim()) {
      return;
    }
    
    setSubmittingComment(true);
    
    // In a real implementation, this would be an API call
    // commentsAPI.createComment(parentType, parentId, { content: newComment })
    //   .then(response => {
    //     const newCommentObj = response.data;
    //     setComments(prev => [...prev, newCommentObj]);
    //     setNewComment('');
    //   })
    //   .catch(err => {
    //     console.error('Error submitting comment:', err);
    //   })
    //   .finally(() => {
    //     setSubmittingComment(false);
    //   });
    
    // For demonstration, simulate API call and update state
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Math.floor(Math.random() * 1000) + 10, // Random ID for demo
        content: newComment,
        user: user!,
        parentType,
        parentId,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setComments(prev => [...prev, newCommentObj]);
      setNewComment('');
      setSubmittingComment(false);
    }, 1000);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !question) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography color="error" variant="h6">
            {error || "Question not found"}
          </Typography>
          <Button 
            component={RouterLink} 
            to="/questions" 
            variant="contained" 
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Back to Questions
          </Button>
        </Box>
      </Container>
    );
  }
  
  const questionComments = comments.filter(comment => comment.parentType === 'question' && comment.parentId === question.id);
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Question Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h1" gutterBottom>
                {question.title}
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
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Asked by{' '}
                  <Link 
                    component={RouterLink} 
                    to={`/users/${question.askedBy.username}`}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {question.askedBy.username}
                  </Link>
                  {' '}on {new Date(question.createdAt).toLocaleDateString()}
                </Typography>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {question.viewCount} views
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="body1" paragraph>
                {question.content}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    color="primary" 
                    onClick={handleUpvoteQuestion}
                    disabled={!isAuthenticated}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    {question.upvotes}
                  </Typography>
                  <IconButton 
                    color="error" 
                    onClick={handleDownvoteQuestion}
                    disabled={!isAuthenticated}
                  >
                    <ThumbDownIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    {question.downvotes}
                  </Typography>
                </Box>
                
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                  <IconButton color="primary">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Question Comments */}
              {questionComments.length > 0 && (
                <Box sx={{ mt: 3, pl: 2, borderLeft: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Comments:
                  </Typography>
                  {questionComments.map((comment) => (
                    <Box key={comment.id} sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        {comment.content}
                        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          – {comment.user.username}, {new Date(comment.createdAt).toLocaleDateString()}
                        </Typography>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              
              {/* Add Comment to Question */}
              {isAuthenticated && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={submittingComment}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCommentSubmit('question', question.id)}
                    disabled={!newComment.trim() || submittingComment}
                    sx={{ borderRadius: 2 }}
                  >
                    {submittingComment ? <CircularProgress size={24} /> : 'Comment'}
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
        
        {/* Entity Card */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              <Avatar
                src={question.entity.image}
                alt={question.entity.name}
                sx={{ width: 100, height: 100, mx: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5" component="h2">
                  {question.entity.name}
                </Typography>
                {question.entity.isVerified && (
                  <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                )}
              </Box>
              <Typography variant="body2" paragraph>
                {question.entity.bio}
              </Typography>
              <Button
                component={RouterLink}
                to={`/entities/${question.entity.slug}`}
                variant="outlined"
                size="small"
                sx={{ borderRadius: 2 }}
              >
                View Profile
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
              aria-label="question tabs"
            >
              <Tab label={`Answers (${answers.length})`} id="question-tab-0" aria-controls="question-tabpanel-0" />
              <Tab label="Related Questions" id="question-tab-1" aria-controls="question-tabpanel-1" />
            </Tabs>
          </Box>
          
          {/* Answers Tab */}
          <TabPanel value={tabValue} index={0}>
            {answers.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No answers yet
                </Typography>
                <Typography variant="body1" paragraph>
                  Be the first to answer this question!
                </Typography>
                {isAuthenticated ? (
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Write an Answer
                  </Button>
                ) : (
                  <Button 
                    component={RouterLink} 
                    to="/login" 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 2 }}
                  >
                    Log in to Answer
                  </Button>
                )}
              </Box>
            ) : (
              <Box>
                {answers.map((answer) => {
                  const answerComments = comments.filter(comment => comment.parentType === 'answer' && comment.parentId === answer.id);
                  
                  return (
                    <Paper key={answer.id} elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={`https://ui-avatars.com/api/?name=${answer.answeredBy.username}&background=random`} 
                          alt={answer.answeredBy.username} 
                        />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="subtitle1">
                            {answer.answeredBy.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Answered on {new Date(answer.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" paragraph>
                        {answer.content}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleUpvoteAnswer(answer.id)}
                            disabled={!isAuthenticated}
                          >
                            <ThumbUpIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>
                            {answer.upvotes}
                          </Typography>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDownvoteAnswer(answer.id)}
                            disabled={!isAuthenticated}
                          >
                            <ThumbDownIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>
                            {answer.downvotes}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                          <IconButton color="primary">
                            <ShareIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      {/* Answer Comments */}
                      {answerComments.length > 0 && (
                        <Box sx={{ mt: 3, pl: 2, borderLeft: 1, borderColor: 'divider' }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Comments:
                          </Typography>
                          {answerComments.map((comment) => (
                            <Box key={comment.id} sx={{ mb: 2 }}>
                              <Typography variant="body2">
                                {comment.content}
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  – {comment.user.username}, {new Date(comment.createdAt).toLocaleDateString()}
                                </Typography>
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                      
                      {/* Add Comment to Answer */}
                      {isAuthenticated && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'flex-start' }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={submittingComment}
                            sx={{ mr: 2 }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleCommentSubmit('answer', answer.id)}
                            disabled={!newComment.trim() || submittingComment}
                            sx={{ borderRadius: 2 }}
                          >
                            {submittingComment ? <CircularProgress size={24} /> : 'Comment'}
                          </Button>
                        </Box>
                      )}
                    </Paper>
                  );
                })}
                
                {isAuthenticated && (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<CommentIcon />}
                      sx={{ borderRadius: 2 }}
                    >
                      Write Your Answer
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </TabPanel>
          
          {/* Related Questions Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {/* Mock related questions */}
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} key={item}>
                  <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography 
                        variant="h6" 
                        component={RouterLink}
                        to={`/questions/${item + 10}`}
                        sx={{ 
                          textDecoration: 'none',
                          color: 'text.primary',
                          '&:hover': {
                            color: 'primary.main',
                          }
                        }}
                      >
                        {item === 1 
                          ? "What was your biggest challenge in developing the theory of relativity?" 
                          : item === 2 
                            ? "How did your work in the patent office influence your scientific thinking?"
                            : "If you could continue your research today, what would you focus on?"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Asked to Albert Einstein • {180 - (item * 30)} upvotes • {item} {item === 1 ? 'answer' : 'answers'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionDetailPage;
