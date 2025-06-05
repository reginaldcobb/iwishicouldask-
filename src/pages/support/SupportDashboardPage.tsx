import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box,
  Card, 
  CardContent, 
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Badge
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Link as RouterLink } from 'react-router-dom';

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
      id={`support-tabpanel-${index}`}
      aria-labelledby={`support-tab-${index}`}
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

interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  user: { username: string; id: number; email: string };
  createdAt: string;
  updatedAt: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'account' | 'technical' | 'billing' | 'feature' | 'other';
  assignedTo: { username: string; id: number } | null;
}

interface UserInquiry {
  id: number;
  question: string;
  user: { username: string; id: number; email: string };
  createdAt: string;
  status: 'pending' | 'answered';
}

const SupportDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [userInquiries, setUserInquiries] = useState<UserInquiry[]>([]);
  const [stats, setStats] = useState({
    openTickets: 0,
    resolvedToday: 0,
    pendingInquiries: 0,
    averageResponseTime: '3.5 hours',
    urgentTickets: 0,
    satisfactionRate: '94%'
  });
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [ticketToAssign, setTicketToAssign] = useState<number | null>(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [inquiryToRespond, setInquiryToRespond] = useState<number | null>(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        setLoading(true);
        
        // For demonstration, use mock data
        setSupportTickets([
          {
            id: 1,
            subject: "Cannot access my account",
            description: "I've been trying to log in for the past two days but keep getting an error message saying 'Invalid credentials'.",
            user: { username: "frustrated_user", id: 42, email: "frustrated@example.com" },
            createdAt: "2023-07-25 09:15:22",
            updatedAt: "2023-07-25 09:15:22",
            status: 'open',
            priority: 'high',
            category: 'account',
            assignedTo: null
          },
          {
            id: 2,
            subject: "Payment failed but money was deducted",
            description: "I tried to upgrade to premium but got an error. My bank shows the transaction went through but I don't have premium access.",
            user: { username: "premium_seeker", id: 56, email: "premium@example.com" },
            createdAt: "2023-07-24 14:30:45",
            updatedAt: "2023-07-25 10:20:33",
            status: 'in_progress',
            priority: 'urgent',
            category: 'billing',
            assignedTo: { username: "support_alex", id: 5 }
          },
          {
            id: 3,
            subject: "Feature request: Dark mode",
            description: "Would it be possible to add a dark mode option? It would be much easier on the eyes when using the site at night.",
            user: { username: "night_owl", id: 78, email: "owl@example.com" },
            createdAt: "2023-07-23 22:45:12",
            updatedAt: "2023-07-24 11:05:27",
            status: 'open',
            priority: 'low',
            category: 'feature',
            assignedTo: null
          },
          {
            id: 4,
            subject: "App crashes on Android",
            description: "The mobile app keeps crashing when I try to view my notifications. I'm using a Samsung Galaxy S21 with Android 12.",
            user: { username: "mobile_user", id: 91, email: "mobile@example.com" },
            createdAt: "2023-07-22 16:20:38",
            updatedAt: "2023-07-25 13:40:15",
            status: 'resolved',
            priority: 'medium',
            category: 'technical',
            assignedTo: { username: "support_taylor", id: 8 }
          }
        ]);
        
        setUserInquiries([
          {
            id: 1,
            question: "How do I change my profile picture?",
            user: { username: "new_member", id: 103, email: "newbie@example.com" },
            createdAt: "2023-07-25 11:30:42",
            status: 'pending'
          },
          {
            id: 2,
            question: "Can I merge two accounts?",
            user: { username: "double_account", id: 117, email: "double@example.com" },
            createdAt: "2023-07-24 09:15:33",
            status: 'pending'
          },
          {
            id: 3,
            question: "How do I delete my question?",
            user: { username: "regretful_asker", id: 125, email: "regret@example.com" },
            createdAt: "2023-07-23 15:45:21",
            status: 'answered'
          }
        ]);
        
        setStats({
          openTickets: 15,
          resolvedToday: 8,
          pendingInquiries: 12,
          averageResponseTime: '3.5 hours',
          urgentTickets: 2,
          satisfactionRate: '94%'
        });
      } catch (err) {
        console.error('Error fetching support data:', err);
        setError('Failed to load support data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSupportData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAssignTicket = async (ticketId: number) => {
    try {
      // Update local state
      setSupportTickets(supportTickets.map(ticket => 
        ticket.id === ticketId ? {
          ...ticket, 
          assignedTo: { username: user?.username || "current_user", id: user?.id || 0 },
          status: 'in_progress'
        } : ticket
      ));
    } catch (err) {
      console.error('Error assigning ticket:', err);
    } finally {
      setAssignDialogOpen(false);
      setTicketToAssign(null);
    }
  };

  const handleResolveTicket = async (id: number) => {
    try {
      // Update local state
      setSupportTickets(supportTickets.map(ticket => 
        ticket.id === id ? {...ticket, status: 'resolved'} : ticket
      ));
      setStats({
        ...stats,
        openTickets: stats.openTickets - 1,
        resolvedToday: stats.resolvedToday + 1
      });
    } catch (err) {
      console.error('Error resolving ticket:', err);
    }
  };

  const handleRespondToInquiry = async (inquiryId: number) => {
    try {
      if (!responseText.trim()) {
        return;
      }
      
      // Update local state
      setUserInquiries(userInquiries.map(inquiry => 
        inquiry.id === inquiryId ? {...inquiry, status: 'answered'} : inquiry
      ));
      setStats({
        ...stats,
        pendingInquiries: stats.pendingInquiries - 1
      });
      setResponseText('');
    } catch (err) {
      console.error('Error responding to inquiry:', err);
    } finally {
      setResponseDialogOpen(false);
      setInquiryToRespond(null);
    }
  };

  const handleAssignDialogOpen = (id: number) => {
    setTicketToAssign(id);
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = () => {
    setAssignDialogOpen(false);
    setTicketToAssign(null);
  };

  const handleResponseDialogOpen = (id: number) => {
    setInquiryToRespond(id);
    setResponseDialogOpen(true);
  };

  const handleResponseDialogClose = () => {
    setResponseDialogOpen(false);
    setInquiryToRespond(null);
    setResponseText('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ my: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Support Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.openTickets}
                </Typography>
                <Typography variant="body2">
                  Open Tickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.resolvedToday}
                </Typography>
                <Typography variant="body2">
                  Resolved Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.pendingInquiries}
                </Typography>
                <Typography variant="body2">
                  Pending Inquiries
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.averageResponseTime}
                </Typography>
                <Typography variant="body2">
                  Avg Response Time
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.urgentTickets}
                </Typography>
                <Typography variant="body2">
                  Urgent Tickets
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.satisfactionRate}
                </Typography>
                <Typography variant="body2">
                  Satisfaction Rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Tabs Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="support tabs"
          >
            <Tab label="Support Tickets" id="support-tab-0" aria-controls="support-tabpanel-0" />
            <Tab label="User Inquiries" id="support-tab-1" aria-controls="support-tabpanel-1" />
          </Tabs>
        </Box>
        
        {/* Support Tickets Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Support Tickets
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supportTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>#{ticket.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ticket.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                          {ticket.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <RouterLink to={`/users/${ticket.user.id}`} style={{ textDecoration: 'none' }}>
                          {ticket.user.username}
                        </RouterLink>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)} 
                        color={
                          ticket.category === 'account' ? 'primary' : 
                          ticket.category === 'billing' ? 'secondary' : 
                          ticket.category === 'technical' ? 'info' :
                          ticket.category === 'feature' ? 'success' :
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} 
                        color={
                          ticket.priority === 'urgent' ? 'error' : 
                          ticket.priority === 'high' ? 'warning' : 
                          ticket.priority === 'medium' ? 'info' : 
                          'default'
                        }
                        size="small"
                        icon={ticket.priority === 'urgent' ? <PriorityHighIcon /> : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={ticket.status === 'in_progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)} 
                        color={
                          ticket.status === 'resolved' ? 'success' : 
                          ticket.status === 'in_progress' ? 'info' : 
                          ticket.status === 'open' ? 'warning' : 
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{ticket.createdAt.split(' ')[0]}</TableCell>
                    <TableCell>
                      {ticket.assignedTo ? (
                        <RouterLink to={`/users/${ticket.assignedTo.id}`} style={{ textDecoration: 'none' }}>
                          {ticket.assignedTo.username}
                        </RouterLink>
                      ) : (
                        <Chip label="Unassigned" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={RouterLink}
                        to={`/support/tickets/${ticket.id}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      
                      {ticket.status === 'open' && (
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => handleAssignDialogOpen(ticket.id)}
                        >
                          <ChatIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {ticket.status === 'in_progress' && ticket.assignedTo && ticket.assignedTo.id === (user?.id || 0) && (
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleResolveTicket(ticket.id)}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      <IconButton 
                        size="small" 
                        color="secondary"
                        component="a"
                        href={`mailto:${ticket.user.email}`}
                      >
                        <EmailIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* User Inquiries Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            User Inquiries
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>#{inquiry.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {inquiry.question}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                          {inquiry.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <RouterLink to={`/users/${inquiry.user.id}`} style={{ textDecoration: 'none' }}>
                          {inquiry.user.username}
                        </RouterLink>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)} 
                        color={inquiry.status === 'answered' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{inquiry.createdAt.split(' ')[0]}</TableCell>
                    <TableCell>
                      {inquiry.status === 'pending' && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<ChatIcon />}
                          onClick={() => handleResponseDialogOpen(inquiry.id)}
                        >
                          Respond
                        </Button>
                      )}
                      {inquiry.status === 'answered' && (
                        <IconButton 
                          size="small" 
                          color="primary"
                          component={RouterLink}
                          to={`/support/inquiries/${inquiry.id}`}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton 
                        size="small" 
                        color="secondary"
                        component="a"
                        href={`mailto:${inquiry.user.email}`}
                      >
                        <EmailIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
      
      {/* Assign Ticket Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={handleAssignDialogClose}
        aria-labelledby="assign-dialog-title"
        aria-describedby="assign-dialog-description"
      >
        <DialogTitle id="assign-dialog-title">Assign Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="assign-dialog-description">
            Are you sure you want to assign this support ticket to yourself? You will be responsible for resolving the issue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => ticketToAssign !== null && handleAssignTicket(ticketToAssign)} 
            color="primary" 
            variant="contained"
          >
            Assign to Me
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog
        open={responseDialogOpen}
        onClose={handleResponseDialogClose}
        aria-labelledby="response-dialog-title"
        aria-describedby="response-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="response-dialog-title">Respond to Inquiry</DialogTitle>
        <DialogContent>
          <DialogContentText id="response-dialog-description" sx={{ mb: 2 }}>
            Please provide a helpful response to the user's inquiry.
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={6}
            label="Your Response"
            fullWidth
            variant="outlined"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResponseDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => inquiryToRespond !== null && handleRespondToInquiry(inquiryToRespond)} 
            color="primary" 
            variant="contained"
            disabled={!responseText.trim()}
          >
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportDashboardPage;
