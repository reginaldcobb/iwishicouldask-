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
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
      id={`editor-tabpanel-${index}`}
      aria-labelledby={`editor-tab-${index}`}
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

interface PendingContent {
  id: number;
  title: string;
  content: string;
  entity: { name: string; slug: string };
  author: { username: string; id: number };
  createdAt: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  type: 'question' | 'answer' | 'article';
}

interface EditorialTask {
  id: number;
  title: string;
  description: string;
  assignedTo: { username: string; id: number } | null;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
}

const EditorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingContent, setPendingContent] = useState<PendingContent[]>([]);
  const [editorialTasks, setEditorialTasks] = useState<EditorialTask[]>([]);
  const [stats, setStats] = useState({
    totalContent: 0,
    pendingReview: 0,
    publishedToday: 0,
    rejectedContent: 0,
    openTasks: 0,
    completedTasks: 0
  });
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [taskToAssign, setTaskToAssign] = useState<number | null>(null);

  useEffect(() => {
    const fetchEditorData = async () => {
      try {
        setLoading(true);
        
        // For demonstration, use mock data
        setPendingContent([
          {
            id: 1,
            title: "The Future of Quantum Computing",
            content: "Quantum computing is poised to revolutionize the way we process information...",
            entity: { name: "IBM Research", slug: "ibm-research" },
            author: { username: "quantum_expert", id: 5 },
            createdAt: "2023-07-25",
            status: 'pending',
            type: 'article'
          },
          {
            id: 2,
            title: "Climate Change: The Next Decade",
            content: "As we approach a critical threshold in global climate patterns...",
            entity: { name: "United Nations", slug: "united-nations" },
            author: { username: "climate_scientist", id: 8 },
            createdAt: "2023-07-24",
            status: 'draft',
            type: 'article'
          },
          {
            id: 3,
            title: "Artificial Intelligence Ethics",
            content: "The rapid advancement of AI technologies raises important ethical questions...",
            entity: { name: "OpenAI", slug: "openai" },
            author: { username: "ai_researcher", id: 12 },
            createdAt: "2023-07-23",
            status: 'pending',
            type: 'article'
          },
          {
            id: 4,
            title: "Response to question about Mars mission",
            content: "Our Mars mission timeline has been adjusted due to recent technological breakthroughs...",
            entity: { name: "NASA", slug: "nasa" },
            author: { username: "space_admin", id: 15 },
            createdAt: "2023-07-22",
            status: 'pending',
            type: 'answer'
          }
        ]);
        
        setEditorialTasks([
          {
            id: 1,
            title: "Review Quantum Computing Article",
            description: "Review and fact-check the article on quantum computing advancements",
            assignedTo: null,
            priority: 'high',
            deadline: "2023-07-30",
            status: 'open'
          },
          {
            id: 2,
            title: "Edit Climate Change Report",
            description: "Edit and format the climate change report for publication",
            assignedTo: { username: "editor_jane", id: 7 },
            priority: 'medium',
            deadline: "2023-08-05",
            status: 'in_progress'
          },
          {
            id: 3,
            title: "Verify AI Ethics Sources",
            description: "Check and verify all sources cited in the AI ethics article",
            assignedTo: null,
            priority: 'medium',
            deadline: "2023-08-10",
            status: 'open'
          },
          {
            id: 4,
            title: "Proofread NASA Response",
            description: "Proofread and edit the official NASA response to the Mars mission question",
            assignedTo: { username: "editor_john", id: 9 },
            priority: 'low',
            deadline: "2023-07-28",
            status: 'completed'
          }
        ]);
        
        setStats({
          totalContent: 1250,
          pendingReview: 42,
          publishedToday: 15,
          rejectedContent: 8,
          openTasks: 12,
          completedTasks: 87
        });
      } catch (err) {
        console.error('Error fetching editor data:', err);
        setError('Failed to load editor data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEditorData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApproveContent = async (id: number) => {
    try {
      // Update local state
      setPendingContent(pendingContent.map(content => 
        content.id === id ? {...content, status: 'published'} : content
      ));
      setStats({
        ...stats,
        pendingReview: stats.pendingReview - 1,
        publishedToday: stats.publishedToday + 1
      });
    } catch (err) {
      console.error('Error approving content:', err);
    }
  };

  const handleRejectContent = async (id: number) => {
    try {
      // Update local state
      setPendingContent(pendingContent.map(content => 
        content.id === id ? {...content, status: 'rejected'} : content
      ));
      setStats({
        ...stats,
        pendingReview: stats.pendingReview - 1,
        rejectedContent: stats.rejectedContent + 1
      });
    } catch (err) {
      console.error('Error rejecting content:', err);
    }
  };

  const handleAssignTask = async (taskId: number) => {
    try {
      // Update local state
      setEditorialTasks(editorialTasks.map(task => 
        task.id === taskId ? {
          ...task, 
          assignedTo: { username: user?.username || "current_user", id: user?.id || 0 },
          status: 'in_progress'
        } : task
      ));
      setStats({
        ...stats,
        openTasks: stats.openTasks - 1
      });
    } catch (err) {
      console.error('Error assigning task:', err);
    } finally {
      setAssignDialogOpen(false);
      setTaskToAssign(null);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      // Update local state
      setEditorialTasks(editorialTasks.map(task => 
        task.id === id ? {...task, status: 'completed'} : task
      ));
      setStats({
        ...stats,
        openTasks: stats.openTasks - 1,
        completedTasks: stats.completedTasks + 1
      });
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const handleAssignDialogOpen = (id: number) => {
    setTaskToAssign(id);
    setAssignDialogOpen(true);
  };

  const handleAssignDialogClose = () => {
    setAssignDialogOpen(false);
    setTaskToAssign(null);
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
        Editor Dashboard
      </Typography>
      
      {/* Stats Overview */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.totalContent}
                </Typography>
                <Typography variant="body2">
                  Total Content
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.pendingReview}
                </Typography>
                <Typography variant="body2">
                  Pending Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.publishedToday}
                </Typography>
                <Typography variant="body2">
                  Published Today
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.rejectedContent}
                </Typography>
                <Typography variant="body2">
                  Rejected Content
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.openTasks}
                </Typography>
                <Typography variant="body2">
                  Open Tasks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4">
                  {stats.completedTasks}
                </Typography>
                <Typography variant="body2">
                  Completed Tasks
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
            aria-label="editor tabs"
          >
            <Tab label="Content Review" id="editor-tab-0" aria-controls="editor-tabpanel-0" />
            <Tab label="Editorial Tasks" id="editor-tab-1" aria-controls="editor-tabpanel-1" />
          </Tabs>
        </Box>
        
        {/* Content Review Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Content Pending Review
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Entity</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingContent.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>
                      <Chip 
                        label={content.type.charAt(0).toUpperCase() + content.type.slice(1)} 
                        color={content.type === 'article' ? 'primary' : content.type === 'answer' ? 'secondary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <RouterLink to={`/entities/${content.entity.slug}`} style={{ textDecoration: 'none' }}>
                        {content.entity.name}
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      <RouterLink to={`/users/${content.author.id}`} style={{ textDecoration: 'none' }}>
                        {content.author.username}
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={content.status.charAt(0).toUpperCase() + content.status.slice(1)} 
                        color={
                          content.status === 'published' ? 'success' : 
                          content.status === 'pending' ? 'warning' : 
                          content.status === 'rejected' ? 'error' : 
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{content.createdAt}</TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={RouterLink}
                        to={`/editor/content/${content.id}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="success"
                        onClick={() => handleApproveContent(content.id)}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleRejectContent(content.id)}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="info"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        {/* Editorial Tasks Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Editorial Tasks
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {editorialTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{task.title}</Typography>
                      <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} 
                        color={
                          task.priority === 'high' ? 'error' : 
                          task.priority === 'medium' ? 'warning' : 
                          'info'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {task.assignedTo ? (
                        <RouterLink to={`/users/${task.assignedTo.id}`} style={{ textDecoration: 'none' }}>
                          {task.assignedTo.username}
                        </RouterLink>
                      ) : (
                        <Chip label="Unassigned" size="small" />
                      )}
                    </TableCell>
                    <TableCell>{task.deadline}</TableCell>
                    <TableCell>
                      <Chip 
                        label={task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)} 
                        color={
                          task.status === 'completed' ? 'success' : 
                          task.status === 'in_progress' ? 'info' : 
                          'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {task.status === 'open' && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<AssignmentIcon />}
                          onClick={() => handleAssignDialogOpen(task.id)}
                        >
                          Assign to me
                        </Button>
                      )}
                      {task.status === 'in_progress' && task.assignedTo && task.assignedTo.id === (user?.id || 0) && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
      
      {/* Assign Task Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={handleAssignDialogClose}
        aria-labelledby="assign-dialog-title"
        aria-describedby="assign-dialog-description"
      >
        <DialogTitle id="assign-dialog-title">Assign Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="assign-dialog-description">
            Are you sure you want to assign this task to yourself? You will be responsible for completing it by the deadline.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => taskToAssign !== null && handleAssignTask(taskToAssign)} 
            color="primary" 
            variant="contained"
          >
            Assign to Me
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditorDashboardPage;
