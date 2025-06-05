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
  Divider
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Entity, Category } from '../../types';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    const fetchCategoryAndEntities = async () => {
      try {
        setLoading(true);
        
        // Find the category by slug
        const foundCategory = categories.find(cat => cat.slug === slug);
        if (!foundCategory) {
          setError('Category not found');
          setLoading(false);
          return;
        }
        
        setCategory(foundCategory);
        
        // In a real implementation, this would call the API with filters
        // const params = {
        //   page,
        //   search: searchQuery || undefined,
        //   category: foundCategory.id,
        // };
        // const response = await entitiesAPI.getEntities(params);
        // setEntities(response.data.results);
        // setTotalPages(Math.ceil(response.data.count / 10));
        
        // For demonstration, filter mock data
        let filteredEntities = mockEntities.filter(entity => 
          entity.categories.some(cat => cat.id === foundCategory.id)
        );
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredEntities = filteredEntities.filter(entity => 
            entity.name.toLowerCase().includes(query) || 
            entity.description.toLowerCase().includes(query) ||
            entity.bio.toLowerCase().includes(query)
          );
        }
        
        setEntities(filteredEntities);
        setTotalPages(Math.ceil(filteredEntities.length / 6));
        
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Failed to load category data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryAndEntities();
  }, [slug, page, searchQuery]);
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error || !category) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography color="error" variant="h6">
          {error || "Category not found"}
        </Typography>
        <Button 
          component={RouterLink} 
          to="/entities" 
          variant="contained" 
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Browse All Entities
        </Button>
      </Box>
    );
  }
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {category.name}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {category.description}
      </Typography>
      
      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder={`Search ${category.name} entities...`}
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
      
      <Divider sx={{ mb: 4 }} />
      
      {/* Entities Grid */}
      {entities.length === 0 ? (
        <Typography sx={{ my: 4 }}>
          No entities found in this category.
        </Typography>
      ) : (
        <>
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
                      {entity.categories.map((cat) => (
                        <Chip
                          key={cat.id}
                          label={cat.name}
                          size="small"
                          component={RouterLink}
                          to={`/categories/${cat.slug}`}
                          clickable
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
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
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          component={RouterLink} 
          to="/entities"
          sx={{ borderRadius: 2 }}
        >
          View All Entities
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryPage;
