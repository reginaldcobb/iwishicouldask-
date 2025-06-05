import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, GridLegacy as Grid, Card, CardContent, Badge, Avatar, Button, CircularProgress, Divider, IconButton, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Switch } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Notification } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Link as RouterLink } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would be an API call
        // const response = await notificationsAPI.getNotifications();
        // setNotifications(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockNotifications: Notification[] = [
            {
              id: 1,
              user: user!,
              type: 'answer',
              content: 'Albert Einstein answered your question "What inspired you to pursue theoretical physics?"',
              relatedId: 1,
              relatedType: 'question',
              isRead: false,
              createdAt: '2023-07-25T10:30:00Z'
            },
            {
              id: 2,
              user: user!,
              type: 'upvote',
              content: 'Your question "Is there a plan to send humans to Mars in the next decade?" received 5 new upvotes',
              relatedId: 2,
              relatedType: 'question',
              isRead: false,
              createdAt: '2023-07-24T15:45:00Z'
            },
            {
              id: 3,
              user: user!,
              type: 'comment',
              content: 'science_lover commented on your answer to "What actions are being taken to address climate change globally?"',
              relatedId: 3,
              relatedType: 'answer',
              isRead: true,
              createdAt: '2023-07-23T09:15:00Z'
            },
            {
              id: 4,
              user: user!,
              type: 'badge',
              content: 'Congratulations! You earned the "Curious Mind" badge for asking 10 questions',
              relatedId: 1,
              relatedType: 'badge',
              isRead: true,
              createdAt: '2023-07-22T14:20:00Z'
            },
            {
              id: 5,
              user: user!,
              type: 'system',
              content: 'Welcome to I Wish I Could Ask! Complete your profile to get started.',
              relatedId: null,
              relatedType: null,
              isRead: true,
              createdAt: '2023-07-20T08:00:00Z'
            }
          ];
          
          setNotifications(mockNotifications);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [user]);
  
  const handleMarkAsRead = async (id: number) => {
    try {
      // In a real implementation, this would be an API call
      // await notificationsAPI.markAsRead(id);
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      // In a real implementation, this would be an API call
      // await notificationsAPI.markAllAsRead();
      
      // Update local state
      setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };
  
  const handleDeleteNotification = async (id: number) => {
    try {
      // In a real implementation, this would be an API call
      // await notificationsAPI.deleteNotification(id);
      
      // Update local state
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };
  
  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    // In a real implementation, this would update user preferences via API
  };
  
  const handleTogglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
    // In a real implementation, this would update user preferences via API
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer':
        return <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>;
      case 'upvote':
        return <Avatar sx={{ bgcolor: 'success.main' }}>U</Avatar>;
      case 'comment':
        return <Avatar sx={{ bgcolor: 'info.main' }}>C</Avatar>;
      case 'badge':
        return <Avatar sx={{ bgcolor: 'warning.main' }}>B</Avatar>;
      case 'system':
        return <Avatar sx={{ bgcolor: 'secondary.main' }}>S</Avatar>;
      default:
        return <Avatar>N</Avatar>;
    }
  };
  
  const getNotificationLink = (notification: Notification) => {
    if (!notification.relatedId) return null;
    
    switch (notification.relatedType) {
      case 'question':
        return `/questions/${notification.relatedId}`;
      case 'answer':
        return `/questions/${notification.relatedId}`;
      case 'comment':
        return `/questions/${notification.relatedId}`;
      case 'badge':
        return `/profile`;
      default:
        return null;
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  {unreadCount > 0 ? (
                    <Badge badgeContent={unreadCount} color="error" sx={{ mr: 1 }}>
                      <NotificationsActiveIcon color="primary" />
                    </Badge>
                  ) : (
                    <NotificationsOffIcon color="disabled" sx={{ mr: 1 }} />
                  )}
                  {unreadCount > 0 ? `${unreadCount} Unread Notifications` : 'No Unread Notifications'}
                </Typography>
                
                {unreadCount > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MarkEmailReadIcon />}
                    onClick={handleMarkAllAsRead}
                    sx={{ borderRadius: 2 }}
                  >
                    Mark All as Read
                  </Button>
                )}
              </Box>
              
              {notifications.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <NotificationsOffIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No Notifications
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    You don't have any notifications yet. Start asking questions and engaging with the community!
                  </Typography>
                </Box>
              ) : (
                <List sx={{ width: '100%' }}>
                  {notifications.map((notification) => (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                          borderRadius: 2,
                          mb: 1
                        }}
                      >
                        <ListItemAvatar>
                          {getNotificationIcon(notification.type)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              component={getNotificationLink(notification) ? RouterLink : 'span'}
                              to={getNotificationLink(notification) || ''}
                              sx={{
                                textDecoration: 'none',
                                color: 'text.primary',
                                fontWeight: notification.isRead ? 'normal' : 'bold',
                                '&:hover': {
                                  color: getNotificationLink(notification) ? 'primary.main' : 'inherit',
                                }
                              }}
                            >
                              {notification.content}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              {new Date(notification.createdAt).toLocaleString()}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          {!notification.isRead && (
                            <IconButton
                              edge="end"
                              aria-label="mark as read"
                              onClick={() => handleMarkAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <MarkEmailReadIcon />
                            </IconButton>
                          )}
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteNotification(notification.id)}
                            title="Delete notification"
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <Switch
                    edge="end"
                    checked={emailNotifications}
                    onChange={handleToggleEmailNotifications}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive notifications in browser"
                  />
                  <Switch
                    edge="end"
                    checked={pushNotifications}
                    onChange={handleTogglePushNotifications}
                  />
                </ListItem>
              </List>
              
              <Typography variant="subtitle2" sx={{ mt: 3, mb: 2 }}>
                Notify me about:
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Answers to my questions"
                  />
                  <Switch
                    edge="end"
                    checked={true}
                    size="small"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Comments on my answers"
                  />
                  <Switch
                    edge="end"
                    checked={true}
                    size="small"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Upvotes on my content"
                  />
                  <Switch
                    edge="end"
                    checked={true}
                    size="small"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="New badges earned"
                  />
                  <Switch
                    edge="end"
                    checked={true}
                    size="small"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="System announcements"
                  />
                  <Switch
                    edge="end"
                    checked={true}
                    size="small"
                  />
                </ListItem>
              </List>
              
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Save Settings
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NotificationsPage;
