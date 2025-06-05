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
  TextField,
  CircularProgress,
  Chip,
  Switch,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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

interface PendingQuestion {
  id: number;
  title: string;
  content: string;
  entity: { name: string; slug: string };
  askedBy: { username: string; id: number };
  createdAt: string;
}

interface ReportedContent {
  id: number;
  contentType: string;
  content: string;
  reportedBy: { username: string; id: number }[];
  reason: string;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  isActive: boolean;
  dateJoined: string;
  lastLogin: string;
}

interface Entity {
  id: number;
  name: string;
  slug: string;
  categories: string[];
  isVerified: boolean;
  isAvailable: boolean;
  createdAt: string;
}

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingQuestions, setPendingQuestions] = useState<PendingQuestion[]>([]);
  const [reportedContent, setReportedContent] = useState<ReportedContent[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    totalAnswers: 0,
    totalEntities: 0,
    pendingQuestions: 0,
    reportedContent: 0
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: number, type: string} | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        
        // For demonstration, use mock data
        setPendingQuestions([
          {
            id: 1,
            title: "Is it true that you secretly funded alien research?",
            content: "I've heard rumors that you have been funding research into extraterrestrial life forms. Can you confirm or deny this?",
            entity: { name: "Elon Musk", slug: "elon-musk" },
            askedBy: { username: "conspiracy_theorist", id: 5 },
            createdAt: "2023-07-25"
          },
          {
            id: 2,
            title: "Why did you really leave your previous company?",
            content: "There are many theories about why you left. What's the real story that wasn't covered in the press?",
            entity: { name: "Bill Gates", slug: "bill-gates" },
            askedBy: { username: "tech_insider", id: 8 },
            createdAt: "2023-07-24"
          },
          {
            id: 3,
            title: "Can you explain your controversial statement about climate change?",
            content: "Last month you made a statement that many found controversial regarding climate policy. Could you elaborate on what you meant?",
            entity: { name: "United Nations", slug: "united-nations" },
            askedBy: { username: "eco_warrior", id: 12 },
            createdAt: "2023-07-23"
          }
        ]);
        
        setReportedContent([
          {
            id: 1,
            contentType: "question",
            content: "Do you believe the moon landing was faked?",
            reportedBy: [{ username: "science_lover", id: 3 }, { username: "space_explorer", id: 7 }],
            reason: "Inappropriate conspiracy theory",
            createdAt: "2023-07-25"
          },
          {
            id: 2,
            contentType: "answer",
            content: "I think your company's products are terrible and you should be ashamed of yourself.",
            reportedBy: [{ username: "tech_enthusiast", id: 9 }],
            reason: "Offensive content",
            createdAt: "2023-07-24"
          },
          {
            id: 3,
            contentType: "comment",
            content: "This answer is completely wrong and the person who wrote it is an idiot.",
            reportedBy: [{ username: "curious_mind", id: 2 }, { username: "quantum_fan", id: 4 }],
            reason: "Harassment",
            createdAt: "2023-07-23"
          }
        ]);
        
        setUsers([
          {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            roles: ["Admin", "Super Admin"],
            isActive: true,
            dateJoined: "2023-01-01",
            lastLogin: "2023-07-25"
          },
          {
            id: 2,
            username: "curious_mind",
            email: "curious@example.com",
            roles: ["User"],
            isActive: true,
            dateJoined: "2023-01-15",
            lastLogin: "2023-07-24"
          },
          {
            id: 3,
            username: "science_lover",
            email: "science@example.com",
            roles: ["User", "Moderator"],
            isActive: true,
            dateJoined: "2023-02-01",
            lastLogin: "2023-07-23"
          },
          {
            id: 4,
            username: "quantum_fan",
            email: "quantum@example.com",
            roles: ["User"],
            isActive: true,
            dateJoined: "2023-02-15",
            lastLogin: "2023-07-22"
          },
          {
            id: 5,
            username: "conspiracy_theorist",
            email: "conspiracy@example.com",
            roles: ["User"],
            isActive: false,
            dateJoined: "2023-03-01",
            lastLogin: "2023-07-10"
          }
        ]);
        
        setEntities([
          {
            id: 1,
            name: "Albert Einstein",
            slug: "albert-einstein",
            categories: ["Science", "History"],
            isVerified: true,
            isAvailable: true,
            createdAt: "2023-01-01"
          },
          {
            id: 2,
            name: "NASA",
            slug: "nasa",
            categories: ["Science", "Government"],
            isVerified: true,
            isAvailable: true,
            createdAt: "2023-01-15"
          },
          {
            id: 3,
            name: "Elon Musk",
            slug: "elon-musk",
            categories: ["Business", "Technology"],
            isVerified: true,
            isAvailable: false,
            createdAt: "2023-02-01"
          },
          {
            id: 4,
            name: "United Nations",
            slug: "united-nations",
            categories: ["Government", "International"],
            isVerified: true,
            isAvailable: true,
            createdAt: "2023-02-15"
          },
          {
            id: 5,
            name: "Taylor Swift",
            slug: "taylor-swift",
            categories: ["Entertainment", "Music"],
            isVerified: false,
            isAvailable: false,
            createdAt: "2023-03-01"
          }
        ]);
        
        setStats({
          totalUsers: 1250,
          totalQuestions: 4875,
          totalAnswers: 3620,
          totalEntities: 350,
          pendingQuestions: 42,
          reportedContent: 18
        });
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admin data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApproveQuestion = async (id: number) => {
    try {
      // Update local state
      setPendingQuestions(pendingQuestions.filter((question) => question.id !== id));
      setStats({
        ...stats,
        pendingQuestions: stats.pendingQuestions - 1
      });
    } catch (err) {
      console.error('Error approving question:', err);
    }
  };

  const handleRejectQuestion = async (id: number) => {
    try {
      // Update local state
      setPendingQuestions(pendingQuestions.filter((question) => question.id !== id));
      setStats({
        ...stats,
        pendingQuestions: stats.pendingQuestions - 1
      });
    } catch (err) {
      console.error('Error rejecting question:', err);
    }
  };

  const handleResolveReport = async (id: number) => {
    try {
      // Update local state
      setReportedContent(reportedContent.filter((report) => report.id !== id));
      setStats({
        ...stats,
        reportedContent: stats.reportedContent - 1
      });
    } catch (err) {
      console.error('Error resolving report:', err);
    }
  };

  const handleDeleteContent = async (id: number, type: string) => {
    try {
      // Update local state
      if (type === 'report') {
        setReportedContent(reportedContent.filter((report) => report.id !== id));
        setStats({
          ...stats,
          reportedContent: stats.reportedContent - 1
        });
      }
    } catch (err) {
      console.error('Error deleting content:', err);
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteDialogOpen = (id: number, type: string) => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleToggleUserActive = async (id: number, currentStatus: boolean) => {
    try {
      // Update local state
      setUsers(users.map((user) => 
        user.id === id ? { ...user, isActive: !currentStatus } : user
      ));
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  const handleToggleEntityVerified = async (id: number, currentStatus: boolean) => {
    try {
      // Update local state
      setEntities(entities.map((entity) => 
        entity.id === id ? { ...entity, isVerified: !currentStatus } : entity
      ));
    } catch (err) {
      console.error('Error updating entity verification status:', err);
    }
  };

  const handleToggleEntityAvailable = async (id: number, currentStatus: boolean) => {
    try {
      // Update local state
      setEntities(entities.map((entity) => 
        entity.id === id ? { ...entity, isAvailable: !currentStatus } : entity
      ));
    } catch (err) {
      console.error('Error updating entity availability status:', err);
    }
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
        Admin Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalUsers}
                </Typography>
                <Typography variant="body2">
                  Total Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalQuestions}
                </Typography>
                <Typography variant="body2">
                  Total Questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalAnswers}
                </Typography>
                <Typography variant="body2">
                  Total Answers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalEntities}
                </Typography>
                <Typography variant="body2">
                  Total Entities
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.pendingQuestions}
                </Typography>
                <Typography variant="body2">
                  Pending Questions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.reportedContent}
                </Typography>
                <Typography variant="body2">
                  Reported Content
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
            aria-label="admin tabs"
          >
            <Tab label="Moderation" id="admin-tab-0" aria-controls="admin-tabpanel-0" />
            <Tab label="Users" id="admin-tab-1" aria-controls="admin-tabpanel-1" />
            <Tab label="Entities" id="admin-tab-2" aria-controls="admin-tabpanel-2" />
          </Tabs>
        </Box>
        
        {/* Moderation Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Pending Questions
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Entity</TableCell>
                  <TableCell>Asked By</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingQuestions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No pending questions
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {question.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {question.content.length > 100 
                            ? `${question.content.substring(0, 100)}...` 
                            : question.content}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <RouterLink to={`/entities/${question.entity.slug}`} style={{ textDecoration: 'none' }}>
                          {question.entity.name}
                        </RouterLink>
                      </TableCell>
                      <TableCell>
                        <RouterLink to={`/users/${question.askedBy.id}`} style={{ textDecoration: 'none' }}>
                          {question.askedBy.username}
                        </RouterLink>
                      </TableCell>
                      <TableCell>{question.createdAt}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="success" 
                          onClick={() => handleApproveQuestion(question.id)}
                          title="Approve"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleRejectQuestion(question.id)}
                          title="Reject"
                        >
                          <CancelIcon />
                        </IconButton>
                        <IconButton 
                          color="primary" 
                          component={RouterLink} 
                          to={`/questions/${question.id}`}
                          title="View"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography variant="h6" gutterBottom>
            Reported Content
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No reported content
                    </TableCell>
                  </TableRow>
                ) : (
                  reportedContent.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Chip 
                          label={report.contentType.charAt(0).toUpperCase() + report.contentType.slice(1)} 
                          color={
                            report.contentType === 'question' 
                              ? 'primary' 
                              : report.contentType === 'answer' 
                                ? 'secondary' 
                                : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {report.content.length > 100 
                          ? `${report.content.substring(0, 100)}...` 
                          : report.content}
                      </TableCell>
                      <TableCell>
                        {report.reportedBy.map((user, index) => (
                          <React.Fragment key={user.id}>
                            <RouterLink to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                              {user.username}
                            </RouterLink>
                            {index < report.reportedBy.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{report.createdAt}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="success" 
                          onClick={() => handleResolveReport(report.id)}
                          title="Resolve"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteDialogOpen(report.id, 'report')}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton 
                          color="primary" 
                          title="View"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Users Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            User Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <RouterLink to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                        {user.username}
                      </RouterLink>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.roles.map((role, index) => (
                        <Chip 
                          key={role} 
                          label={role} 
                          size="small" 
                          color={role === 'Admin' || role === 'Super Admin' ? 'primary' : 'default'}
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={user.isActive} 
                            onChange={() => handleToggleUserActive(user.id, user.isActive)}
                            color="primary"
                          />
                        }
                        label={user.isActive ? 'Active' : 'Inactive'}
                      />
                    </TableCell>
                    <TableCell>{user.dateJoined}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        component={RouterLink} 
                        to={`/users/${user.id}`}
                        title="View"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Entities Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Entity Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entities.map((entity) => (
                  <TableRow key={entity.id}>
                    <TableCell>
                      <RouterLink to={`/entities/${entity.slug}`} style={{ textDecoration: 'none' }}>
                        {entity.name}
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      {entity.categories.map((category) => (
                        <Chip 
                          key={category} 
                          label={category} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={entity.isVerified} 
                            onChange={() => handleToggleEntityVerified(entity.id, entity.isVerified)}
                            color="primary"
                          />
                        }
                        label={entity.isVerified ? 'Verified' : 'Unverified'}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={entity.isAvailable} 
                            onChange={() => handleToggleEntityAvailable(entity.id, entity.isAvailable)}
                            color="primary"
                          />
                        }
                        label={entity.isAvailable ? 'Available' : 'Unavailable'}
                      />
                    </TableCell>
                    <TableCell>{entity.createdAt}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        component={RouterLink} 
                        to={`/entities/${entity.slug}`}
                        title="View"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this content? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => itemToDelete && handleDeleteContent(itemToDelete.id, itemToDelete.type)} 
            color="error" 
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardPage;
