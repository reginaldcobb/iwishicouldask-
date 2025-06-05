import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, TextField, Button, MenuItem, FormControl, InputLabel, Select, Chip, GridLegacy as Grid, CircularProgress, Alert, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Entity, Category, Tag } from '../../types';

const AskQuestionPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch entities, categories, and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real implementation, these would be API calls
        // const [entitiesResponse, categoriesResponse, tagsResponse] = await Promise.all([
        //   entitiesAPI.getEntities(),
        //   categoriesAPI.getCategories(),
        //   tagsAPI.getTags()
        // ]);
        
        // Mock data for demonstration
        setEntities([
          {
            id: 1,
            name: 'Albert Einstein',
            description: 'Theoretical physicist who developed the theory of relativity.',
            slug: 'albert-einstein',
            categories: [{ id: 1, name: 'Science', description: 'Scientific figures and organizations', slug: 'science', createdAt: '2023-01-01', updatedAt: '2023-01-01' }],
            image: 'https://example.com/einstein.jpg',
            isVerified: true,
            isAvailable: true,
            bio: 'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
          },
          {
            id: 2,
            name: 'NASA',
            description: 'The National Aeronautics and Space Administration.',
            slug: 'nasa',
            categories: [{ id: 1, name: 'Science', description: 'Scientific figures and organizations', slug: 'science', createdAt: '2023-01-01', updatedAt: '2023-01-01' }],
            image: 'https://example.com/nasa.jpg',
            isVerified: true,
            isAvailable: true,
            bio: 'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program.',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
          },
          {
            id: 3,
            name: 'Taylor Swift',
            description: 'American singer-songwriter.',
            slug: 'taylor-swift',
            categories: [{ id: 3, name: 'Entertainment', description: 'Entertainment figures and organizations', slug: 'entertainment', createdAt: '2023-01-01', updatedAt: '2023-01-01' }],
            image: 'https://example.com/taylor.jpg',
            isVerified: true,
            isAvailable: false,
            bio: 'Taylor Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting has received critical praise.',
            createdAt: '2023-01-01',
            updatedAt: '2023-01-01'
          }
        ]);
        
        setCategories([
          { id: 1, name: 'Science', description: 'Scientific figures and organizations', slug: 'science', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
          { id: 2, name: 'Technology', description: 'Technology figures and organizations', slug: 'technology', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
          { id: 3, name: 'Entertainment', description: 'Entertainment figures and organizations', slug: 'entertainment', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
          { id: 4, name: 'Business', description: 'Business figures and organizations', slug: 'business', createdAt: '2023-01-01', updatedAt: '2023-01-01' },
          { id: 5, name: 'Politics', description: 'Political figures and organizations', slug: 'politics', createdAt: '2023-01-01', updatedAt: '2023-01-01' }
        ]);
        
        setTags([
          { id: 1, name: 'Physics', slug: 'physics', description: 'Questions related to physics' },
          { id: 2, name: 'Space', slug: 'space', description: 'Questions related to space exploration' },
          { id: 3, name: 'Music', slug: 'music', description: 'Questions related to music' },
          { id: 4, name: 'Career', slug: 'career', description: 'Questions about career choices and paths' },
          { id: 5, name: 'Personal', slug: 'personal', description: 'Personal questions' },
          { id: 6, name: 'Technology', slug: 'technology', description: 'Questions related to technology' },
          { id: 7, name: 'History', slug: 'history', description: 'Questions about historical events or context' }
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load necessary data. Please try again later.');
      }
    };
    
    fetchData();
  }, []);
  
  // Filter entities based on selected category
  const filteredEntities = selectedCategory 
    ? entities.filter(entity => 
        entity.categories.some(category => category.name === selectedCategory)
      )
    : entities;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !selectedEntity) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setError(null);
      setLoading(true);
      
      // In a real implementation, this would be an API call
      // await questionsAPI.createQuestion({
      //   title,
      //   content,
      //   entityId: selectedEntity.id,
      //   tags: selectedTags.map(tag => tag.id)
      // });
      
      // For demonstration, simulate successful submission
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        
        // Redirect to questions page after a short delay
        setTimeout(() => {
          navigate('/questions');
        }, 2000);
      }, 1500);
    } catch (err) {
      console.error('Error submitting question:', err);
      setError('Failed to submit your question. Please try again.');
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Your question has been submitted successfully! It will be reviewed by our moderators.
          </Alert>
          <Typography variant="body1">
            Redirecting to questions page...
          </Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ask a Question
        </Typography>
        <Typography variant="body1" paragraph>
          Submit your question to a person or organization. Our moderators will review it before publishing.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="category-select-label">Filter by Category (Optional)</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Filter by Category (Optional)"
                  >
                    <MenuItem value="">
                      <em>All Categories</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Autocomplete
                  id="entity-select"
                  options={filteredEntities}
                  getOptionLabel={(option) => option.name}
                  value={selectedEntity}
                  onChange={(event, newValue) => {
                    setSelectedEntity(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Person or Organization *"
                      variant="outlined"
                      required
                      error={!selectedEntity && title.length > 0}
                      helperText={!selectedEntity && title.length > 0 ? "Please select a person or organization" : ""}
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1">{option.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.categories.map(cat => cat.name).join(', ')}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Question Title *"
                  fullWidth
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  helperText="Be specific and imagine you're asking a question to the person or organization"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Question Details *"
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  helperText="Include all the information someone would need to answer your question"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-select"
                  options={tags}
                  getOptionLabel={(option) => option.name}
                  value={selectedTags}
                  onChange={(event, newValue) => {
                    setSelectedTags(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags (Optional)"
                      variant="outlined"
                      helperText="Add up to 5 tags to categorize your question"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.id}
                      />
                    ))
                  }
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    * Required fields
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Submit Question'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AskQuestionPage;
