import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem,
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Divider,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';
import InfoIcon from '@mui/icons-material/Info';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user has a specific role
  const hasRole = (role: string) => {
    return user?.roles.includes(role);
  };

  const isAdmin = hasRole('Admin');
  const isEditor = hasRole('Editor');
  const isModerator = hasRole('Moderator');
  const isSupport = hasRole('Support');

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        display: { xs: 'block', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          I Wish I Could Ask...
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/" onClick={onClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/questions" onClick={onClose}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/entities" onClick={onClose}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Entities" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/leaderboard" onClick={onClose}>
            <ListItemIcon>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/about" onClick={onClose}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {isAuthenticated && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/notifications" onClick={onClose}>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/profile" onClick={onClose}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      
      {/* Role-specific navigation items */}
      {(isAdmin || isEditor || isModerator || isSupport) && (
        <>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Staff Access
            </Typography>
          </Box>
          <List>
            {isAdmin && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/admin" onClick={onClose}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
            {isEditor && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/editor" onClick={onClose}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Editor Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
            {isModerator && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/moderator" onClick={onClose}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Moderator Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
            {isSupport && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/support" onClick={onClose}>
                  <ListItemIcon>
                    <SupportIcon />
                  </ListItemIcon>
                  <ListItemText primary="Support Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Divider />
        </>
      )}
    </Drawer>
  );
};

export default Sidebar;
