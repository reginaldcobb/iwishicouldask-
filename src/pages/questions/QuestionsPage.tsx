import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  GridLegacy as Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  Avatar, 
  Pagination, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { questionsAPI } from '../../api';
import { Question } from '../../types';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const params = {
          page,
          sort: sortBy,
          status: filterStatus !== 'all' ? filterStatus : undefined,
          search: searchQuery || undefined,
        };
        
        const response = await questionsAPI.getQuestions(params);
        setQuestions(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page, sortBy, filterStatus, searchQuery]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value as string);
    setPage(1);
  };

  const handleFilterChange = (event: any) => {
    setFilterStatus(event.target.value as string);
    setPage(1);
  };

  // Mock data for demonstration (would be replaced by actual API data)
  const mockQuestions: Question[] = [
    {
      id: 1,
      title: "What would you say is your greatest achievement?",
      content: "I've always been curious about what you consider your most significant contribution to science and humanity.",
      entity: {
        id: 1,
        name: "Albert Einstein",
        slug: "albert-einstein",
        description: "Theoretical physicist",
        categories: [],
        isVerified: true,
        isAvailable: true,
        bio: "Theoretical physicist who developed the theory of relativity",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01"
      },
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
      title: "How do you plan to address climate change in the next decade?",
      content: "Given the increasing urgency of climate action, what specific measures will your organization implement?",
      entity: {
        id: 3,
        name: "United Nations",
        slug: "united-nations",
        description: "International organization",
        categories: [],
        isVerified: true,
        isAvailable: true,
        bio: "International organization that aims to maintain international peace and security",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01"
      },
      askedBy: {
        id: 3,
        username: "eco_warrior",
        email: "eco@example.com",
        roles: [],
        reputationPoints: 350,
        dateJoined: "2023-01-01"
      },
      tags: [
        { id: 3, name: "Climate", slug: "climate", description: "Climate topics" },
        { id: 4, name: "Policy", slug: "policy", description: "Policy topics" }
      ],
      upvotes: 189,
      downvotes: 8,
      viewCount: 950,
      isPremium: false,
      isSponsored: true,
      status: "approved",
      createdAt: "2023-06-10",
      updatedAt: "2023-06-10"
    },
    {
      id: 3,
      title: "What is the timeline for sending humans to Mars?",
      content: "I'm interested in understanding the realistic timeline and challenges for human Mars missions.",
      entity: {
        id: 2,
        name: "NASA",
        slug: "nasa",
        description: "Space agency",
        categories: [],
        isVerified: true,
        isAvailable: true,
        bio: "National Aeronautics and Space Administration",
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01"
      },
      askedBy: {
        id: 4,
        username: "space_enthusiast",
        email: "space@example.com",
        roles: [],
        reputationPoints: 210,
        dateJoined: "2023-01-01"
      },
      tags: [
        { id: 5, name: "Space", slug: "space", description: "Space topics" },
        { id: 6, name: "Mars", slug: "mars", description: "Mars topics" }
      ],
      upvotes: 156,
      downvotes: 5,
      viewCount: 820,
      isPremium: false,
      isSponsored: false,
      status: "approved",
      createdAt: "2023-07-05",
      updatedAt: "2023-07-05"
    }
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Questions
      </Typography>

      {/* Search and Filter Bar */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="most_votes">Most Votes</MenuItem>
                <MenuItem value="most_views">Most Views</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-status-label">Filter</InputLabel>
              <Select
                labelId="filter-status-label"
                value={filterStatus}
                label="Filter"
                onChange={handleFilterChange}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Questions</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="answered">Answered</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Ask Question Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/ask-question"
          sx={{ borderRadius: 2 }}
        >
          Ask a Question
        </Button>
      </Box>

      {/* Questions List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ my: 4 }}>
          {error}
        </Typography>
      ) : (
        <>
          {mockQuestions.length === 0 ? (
            <Typography sx={{ my: 4 }}>
              No questions found. Be the first to ask a question!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {mockQuestions.map((question) => (
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
                        {question.isSponsored && (
                          <Chip 
                            label="Sponsored" 
                            size="small" 
                            sx={{ bgcolor: 'warning.main', color: 'white' }}
                          />
                        )}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {question.content.length > 150 
                          ? `${question.content.substring(0, 150)}...` 
                          : question.content}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Asked to:
                        </Typography>
                        <Chip
                          avatar={<Avatar>{question.entity.name.charAt(0)}</Avatar>}
                          label={question.entity.name}
                          component={RouterLink}
                          to={`/entities/${question.entity.slug}`}
                          clickable
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(question.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                    </CardContent>
                    
                    <Divider />
                    
                    <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
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
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;
