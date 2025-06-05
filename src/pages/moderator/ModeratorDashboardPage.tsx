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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
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
      id={`moderator-tabpanel-${index}`}
      aria-labelledby={`moderator-tab-${index}`}
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

interface ReportedContent {
  id: number;
  contentType: 'question' | 'answer' | 'comment';
  content: string;
  reportedBy: { username: string; id: number }[];
  reason: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'rejected';
}

interface FlaggedUser {
  id: number;
  username: string;
  email: string;
  flagReason: string;
  flaggedBy: { username: string; id: number }[];
  flaggedAt: string;
  status: 'active' | 'suspended' | 'banned';
  violationCount: number;
}

const ModeratorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportedContent, setReportedContent] = useState<ReportedContent[]>([]);
  const [flaggedUsers, setFlaggedUsers] = useState<FlaggedUser[]>([]);
  const [stats, setStats] = useState({
    pendingReports: 0,
    resolvedToday: 0,
    flaggedUsers: 0,
    suspendedUsers: 0,
    bannedUsers: 0,
    totalReports: 0
  });
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionDetails, setActionDetails] = useState<{id: number, type: string, action: string} | null>(null);

  useEffect(() => {
    const fetchModeratorData = async () => {
      try {
        setLoading(true);
        
        // For demonstration, use mock data
        setReportedContent([
          {
            id: 1,
            contentType: "question",
            content: "Do you believe the moon landing was faked?",
            reportedBy: [{ username: "science_lover", id: 3 }, { username: "space_explorer", id: 7 }],
            reason: "Inappropriate conspiracy theory",
            createdAt: "2023-07-25",
            status: 'pending'
          },
          {
            id: 2,
            contentType: "answer",
            content: "I think your company's products are terrible and you should be ashamed of yourself.",
            reportedBy: [{ username: "tech_enthusiast", id: 9 }],
            reason: "Offensive content",
            createdAt: "2023-07-24",
            status: 'pending'
          },
          {
            id: 3,
            contentType: "comment",
            content: "This answer is completely wrong and the person who wrote it is an idiot.",
            reportedBy: [{ username: "curious_mind", id: 2 }, { username: "quantum_fan", id: 4 }],
            reason: "Harassment",
            createdAt: "2023-07-23",
            status: 'pending'
          },
          {
            id: 4,
            contentType: "question",
            content: "What is your personal home address and daily schedule?",
            reportedBy: [{ username: "security_expert", id: 11 }],
            reason: "Privacy violation",
            createdAt: "2023-07-22",
            status: 'resolved'
          }
        ]);
        
        setFlaggedUsers([
          {
            id: 1,
            username: "spam_poster",
            email: "spam@example.com",
            flagReason: "Posting promotional content repeatedly",
            flaggedBy: [{ username: "moderator_1", id: 20 }, { username: "regular_user", id: 15 }],
            flaggedAt: "2023-07-25",
            status: 'active',
            violationCount: 2
          },
          {
            id: 2,
            username: "rude_commenter",
            email: "rude@example.com",
            flagReason: "Repeated harassment of other users",
            flaggedBy: [{ username: "victim_user", id: 25 }],
            flaggedAt: "2023-07-24",
            status: 'suspended',
            violationCount: 5
          },
          {
            id: 3,
            username: "fake_account",
            email: "fake@example.com",
            flagReason: "Impersonating a public figure",
            flaggedBy: [{ username: "vigilant_user", id: 30 }, { username: "admin", id: 1 }],
            flaggedAt: "2023-07-23",
            status: 'banned',
            violationCount: 8
          }
        ]);
        
        setStats({
          pendingReports: 18,
          resolvedToday: 7,
          flaggedUsers: 12,
          suspendedUsers: 4,
          bannedUsers: 2,
          totalReports: 245
        });
      } catch (err) {
        console.error('Error fetching moderator data:', err);
        setError('Failed to load moderator data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchModeratorData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleResolveReport = async (id: number) => {
    try {
      // Update local state
      setReportedContent(reportedContent.map(report => 
        report.id === id ? {...report, status: 'resolved'} : report
      ));
      setStats({
        ...stats,
        pendingReports: stats.pendingReports - 1,
        resolvedToday: stats.resolvedToday + 1
      });
    } catch (err) {
      console.error('Error resolving report:', err);
    }
  };

  const handleRejectReport = async (id: number) => {
    try {
      // Update local state
      setReportedContent(reportedContent.map(report => 
        report.id === id ? {...report, status: 'rejected'} : report
      ));
      setStats({
        ...stats,
        pendingReports: stats.pendingReports - 1
      });
    } catch (err) {
      console.error('Error rejecting report:', err);
    }
  };

  const handleUserAction = async (id: number, action: string) => {
    try {
      // Update local state
      if (action === 'suspend') {
        setFlaggedUsers(flaggedUsers.map(user => 
          user.id === id ? {...user, status: 'suspended'} : user
        ));
        setStats({
          ...stats,
          suspendedUsers: stats.suspendedUsers + 1
        });
      } else if (action === 'ban') {
        setFlaggedUsers(flaggedUsers.map(user => 
          user.id === id ? {...user, status: 'banned'} : user
        ));
        setStats({
          ...stats,
          bannedUsers: stats.bannedUsers + 1
        });
      } else if (action === 'activate') {
        setFlaggedUsers(flaggedUsers.map(user => 
          user.id === id ? {...user, status: 'active'} : user
        ));
        setStats({
          ...stats,
          suspendedUsers: stats.suspendedUsers - 1
        });
      }
    } catch (err) {
      console.error('Error updating user status:', err);
    } finally {
      setActionDialogOpen(false);
      setActionDetails(null);
    }
  };

  const handleActionDialogOpen = (id: number, type: string, action: string) => {
    setActionDetails({ id, type, action });
    setActionDialogOpen(true);
  };

  const handleActionDialogClose = () => {
    setActionDialogOpen(false);
    setActionDetails(null);
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
        Moderator Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.pendingReports}
                </Typography>
                <Typography variant="body2">
                  Pending Reports
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
                  {stats.flaggedUsers}
                </Typography>
                <Typography variant="body2">
                  Flagged Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'warning.dark', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.suspendedUsers}
                </Typography>
                <Typography variant="body2">
                  Suspended Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.bannedUsers}
                </Typography>
                <Typography variant="body2">
                  Banned Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalReports}
                </Typography>
                <Typography variant="body2">
                  Total Reports
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
            aria-label="moderator tabs"
          >
            <Tab label="Reported Content" id="moderator-tab-0" aria-controls="moderator-tabpanel-0" />
            <Tab label="Flagged Users" id="moderator-tab-1" aria-controls="moderator-tabpanel-1" />
          </Tabs>
        </Box>
        
        {/* Reported Content Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Reported Content
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Content Type</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedContent.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Chip 
                        label={report.contentType.charAt(0).toUpperCase() + report.contentType.slice(1)} 
                        color={
                          report.contentType === 'question' ? 'primary' : 
                          report.contentType === 'answer' ? 'secondary' : 
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {report.content}
                      </Typography>
                    </TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell>
                      {report.reportedBy.map((reporter, index) => (
                        <React.Fragment key={reporter.id}>
                          <RouterLink to={`/users/${reporter.id}`} style={{ textDecoration: 'none' }}>
                            {reporter.username}
                          </RouterLink>
                          {index < report.reportedBy.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </TableCell>
                    <TableCell>{report.createdAt}</TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status.charAt(0).toUpperCase() + report.status.slice(1)} 
                        color={
                          report.status === 'resolved' ? 'success' : 
                          report.status === 'pending' ? 'warning' : 
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {report.status === 'pending' && (
                        <>
                          <IconButton 
                            size="small" 
                            color="primary"
                            component={RouterLink}
                            to={`/moderator/reports/${report.id}`}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleResolveReport(report.id)}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleRejectReport(report.id)}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleActionDialogOpen(report.id, 'content', 'delete')}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                      {report.status !== 'pending' && (
                        <IconButton 
                          size="small" 
                          color="primary"
                          component={RouterLink}
                          to={`/moderator/reports/${report.id}`}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Flagged Users Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Flagged Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Flag Reason</TableCell>
                  <TableCell>Violations</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Flagged At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flaggedUsers.map((flaggedUser) => (
                  <TableRow key={flaggedUser.id}>
                    <TableCell>
                      <RouterLink to={`/users/${flaggedUser.id}`} style={{ textDecoration: 'none' }}>
                        {flaggedUser.username}
                      </RouterLink>
                    </TableCell>
                    <TableCell>{flaggedUser.email}</TableCell>
                    <TableCell>{flaggedUser.flagReason}</TableCell>
                    <TableCell>
                      <Chip 
                        label={flaggedUser.violationCount} 
                        color={
                          flaggedUser.violationCount >= 5 ? 'error' : 
                          flaggedUser.violationCount >= 3 ? 'warning' : 
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={flaggedUser.status.charAt(0).toUpperCase() + flaggedUser.status.slice(1)} 
                        color={
                          flaggedUser.status === 'active' ? 'success' : 
                          flaggedUser.status === 'suspended' ? 'warning' : 
                          'error'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{flaggedUser.flaggedAt}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={RouterLink}
                        to={`/users/${flaggedUser.id}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      
                      {flaggedUser.status === 'active' && (
                        <IconButton 
                          size="small" 
                          color="warning"
                          onClick={() => handleActionDialogOpen(flaggedUser.id, 'user', 'suspend')}
                        >
                          <FlagIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {flaggedUser.status !== 'banned' && (
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleActionDialogOpen(flaggedUser.id, 'user', 'ban')}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {flaggedUser.status === 'suspended' && (
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleActionDialogOpen(flaggedUser.id, 'user', 'activate')}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
      
      {/* Action Confirmation Dialog */}
      <Dialog
        open={actionDialogOpen}
        onClose={handleActionDialogClose}
        aria-labelledby="action-dialog-title"
        aria-describedby="action-dialog-description"
      >
        <DialogTitle id="action-dialog-title">
          {actionDetails?.action === 'suspend' && 'Suspend User'}
          {actionDetails?.action === 'ban' && 'Ban User'}
          {actionDetails?.action === 'activate' && 'Activate User'}
          {actionDetails?.action === 'delete' && 'Delete Content'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="action-dialog-description">
            {actionDetails?.action === 'suspend' && 'Are you sure you want to suspend this user? They will be temporarily unable to interact with the platform.'}
            {actionDetails?.action === 'ban' && 'Are you sure you want to permanently ban this user? This action cannot be easily reversed.'}
            {actionDetails?.action === 'activate' && 'Are you sure you want to reactivate this user? They will regain access to the platform.'}
            {actionDetails?.action === 'delete' && 'Are you sure you want to delete this content? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => actionDetails !== null && handleUserAction(actionDetails.id, actionDetails.action)} 
            color="primary" 
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModeratorDashboardPage;
