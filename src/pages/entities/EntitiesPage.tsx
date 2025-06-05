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
  TextField,
  InputAdornment,
  CircularProgress,
  Pagination,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { entitiesAPI } from '../../api';
import { Entity, Category } from '../../types';

const EntitiesPage: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Mock categories for demonstration
  const categories: Category[] = [
    { id: 1, name: 'Science', description: 'Scientific figures and organizations', slug: 'science', createdAt: '', updatedAt: '' },
    { id: 2, name: 'Business', description: 'Business leaders and companies', slug: 'business', createdAt: '', updatedAt: '' },
    { id: 3, name: 'Government', description: 'Government officials and organizations', slug: 'government', createdAt: '', updatedAt: '' },
    { id: 4, name: 'Entertainment', description: 'Entertainers and entertainment companies', slug: 'entertainment', createdAt: '', updatedAt: '' },
    { id: 5, name: 'Sports', description: 'Athletes and sports organizations', slug: 'sports', createdAt: '', updatedAt: '' },
    { id: 6, name: 'Technology', description: 'Tech leaders and companies', slug: 'technology', createdAt: '', updatedAt: '' },
  ];
  
  // Mock entities for demonstration
  const mockEntities: Entity[] = [
    {
      id: 1,
      name: 'Albert Einstein',
      description: 'Theoretical physicist',
      slug: 'albert-einstein',
      categories: [categories[0]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: true,
      bio: 'Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 2,
      name: 'NASA',
      description: 'Space agency',
      slug: 'nasa',
      categories: [categories[0]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: true,
      bio: 'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 3,
      name: 'Elon Musk',
      description: 'Entrepreneur and business magnate',
      slug: 'elon-musk',
      categories: [categories[1], categories[5]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: false,
      bio: 'Elon Reeve Musk is an entrepreneur and business magnate. He is the founder, CEO, and Chief Engineer at SpaceX; early-stage investor, CEO, and Product Architect of Tesla, Inc.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 4,
      name: 'United Nations',
      description: 'International organization',
      slug: 'united-nations',
      categories: [categories[2]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: true,
      bio: 'The United Nations is an intergovernmental organization that aims to maintain international peace and security, develop friendly relations among nations.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 5,
      name: 'Taylor Swift',
      description: 'Singer-songwriter',
      slug: 'taylor-swift',
      categories: [categories[3]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: false,
      bio: 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise and media coverage.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 6,
      name: 'LeBron James',
      description: 'Professional basketball player',
      slug: 'lebron-james',
      categories: [categories[4]],
      image: 'https://via.placeholder.com/150',
      isVerified: true,
      isAvailable: true,
      bio: 'LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association.',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
  ];
  
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would call the API with filters
        // const params = {
        //   page,
        //   search: searchQuery || undefined,
        //   category: selectedCategory || undefined,
        // };
        // const response = await entitiesAPI.getEntities(params);
        // setEntities(response.data.results);
        // setTotalPages(Math.ceil(response.data.count / 10));
        
        // For demonstration, filter mock data
        let filteredEntities = [...mockEntities];
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredEntities = filteredEntities.filter(entity => 
            entity.name.toLowerCase().includes(query) || 
            entity.description.toLowerCase().includes(query) ||
            entity.bio.toLowerCase().includes(query)
          );
        }
        
        if (selectedCategory) {
          filteredEntities = filteredEntities.filter(entity => 
            entity.categories.some(category => category.id === selectedCategory)
          );
        }
        
        setEntities(filteredEntities);
        setTotalPages(Math.ceil(filteredEntities.length / 6));
        
      } catch (err) {
        console.error('Error fetching entities:', err);
        setError('Failed to load entities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntities();
  }, [page, searchQuery, selectedCategory]);
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };
  
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setPage(1);
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        People & Organizations
      </Typography>
      
      <Typography variant="body1" paragraph>
        Browse people and organizations you can ask questions to. Filter by category or search for specific entities.
      </Typography>
      
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Search people and organizations..."
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
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              component={RouterLink}
              to="/ask-question"
              sx={{ height: '100%', borderRadius: 2 }}
            >
              Ask a Question
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {/* Categories Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <Grid container spacing={1}>
          {categories.map((category) => (
            <Grid item key={category.id}>
              <Chip
                label={category.name}
                onClick={() => handleCategorySelect(category.id)}
                color={selectedCategory === category.id ? "primary" : "default"}
                sx={{ 
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 1,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Divider sx={{ mb: 4 }} />
      
      {/* Entities Grid */}
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
          {entities.length === 0 ? (
            <Typography sx={{ my: 4 }}>
              No entities found matching your criteria.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {entities.map((entity) => (
                <Grid item xs={12} sm={6} md={4} key={entity.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                    }}
                    component={RouterLink}
                    to={`/entities/${entity.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={entity.image || "https://via.placeholder.com/200"}
                      alt={entity.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {entity.name}
                        </Typography>
                        <Box>
                          {entity.isVerified && (
                            <Chip 
                              label="Verified" 
                              color="primary"
                              size="small"
                            />
                          )}
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {entity.description}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {entity.bio.length > 100 
                          ? `${entity.bio.substring(0, 100)}...` 
                          : entity.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                        {entity.categories.map((category) => (
                          <Chip
                            key={category.id}
                            label={category.name}
                            size="small"
                          />
                        ))}
                      </Box>
                    </CardContent>
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
      
      {/* Featured Entities */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Most Popular Entities
        </Typography>
        <List>
          {mockEntities.slice(0, 3).map((entity) => (
            <ListItem 
              key={entity.id}
              component={RouterLink}
              to={`/entities/${entity.slug}`}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={entity.image} 
                  alt={entity.name}
                  sx={{ width: 50, height: 50 }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={entity.name} 
                secondary={`${entity.description} • ${Math.floor(Math.random() * 500) + 100} questions`} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default EntitiesPage;
