import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem, Avatar, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };
  
  const isAdmin = user?.roles.includes('Admin') || user?.roles.includes('Super Admin');
  
  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileMenuToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              I Wish I Could Ask...
            </Typography>
            
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Button
                  component={RouterLink}
                  to="/questions"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Questions
                </Button>
                <Button
                  component={RouterLink}
                  to="/entities"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  People & Organizations
                </Button>
                <Button
                  component={RouterLink}
                  to="/leaderboard"
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  Leaderboard
                </Button>
                {isAuthenticated && (
                  <Button
                    component={RouterLink}
                    to="/ask-question"
                    color="inherit"
                    sx={{ mx: 1 }}
                  >
                    Ask a Question
                  </Button>
                )}
              </Box>
            )}
            
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  {!isMobile && (
                    <IconButton
                      component={RouterLink}
                      to="/notifications"
                      color="inherit"
                      sx={{ mr: 2 }}
                    >
                      <Badge badgeContent={3} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  )}
                  
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{ p: 0 }}
                    aria-controls="user-menu"
                    aria-haspopup="true"
                  >
                    <Avatar alt={user?.username}>
                      {user?.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                      Profile
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/notifications" onClick={handleMenuClose}>
                      Notifications
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem component={RouterLink} to="/admin/dashboard" onClick={handleMenuClose}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box>
                  <Button
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    sx={{ mr: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleMobileMenuToggle}
        >
          <List>
            <ListItem component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={RouterLink} to="/questions">
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>
            <ListItem component={RouterLink} to="/entities">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People & Organizations" />
            </ListItem>
            <ListItem component={RouterLink} to="/leaderboard">
              <ListItemIcon>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
            {isAuthenticated && (
              <>
                <ListItem component={RouterLink} to="/ask-question">
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ask a Question" />
                </ListItem>
                <ListItem component={RouterLink} to="/notifications">
                  <ListItemIcon>
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem component={RouterLink} to="/profile">
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                {isAdmin && (
                  <ListItem component={RouterLink} to="/admin/dashboard">
                    <ListItemIcon>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </ListItem>
                )}
                <Divider />
                <ListItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Divider />
                <ListItem component={RouterLink} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem component={RouterLink} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
