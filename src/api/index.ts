import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login/', { email, password }),
  register: (username: string, email: string, password: string) => 
    api.post('/auth/register/', { username, email, password }),
  verifyToken: () => 
    api.post('/auth/token/verify/'),
  refreshToken: () => 
    api.post('/auth/token/refresh/'),
};

// User API
export const userAPI = {
  getProfile: () => 
    api.get('/users/profile/'),
  updateProfile: (data: any) => 
    api.patch('/users/profile/', data),
  getUserBadges: () => 
    api.get('/users/badges/'),
  getTopUsers: () => 
    api.get('/users/top/'),
};

// Questions API
export const questionsAPI = {
  getQuestions: (params?: any) => 
    api.get('/questions/', { params }),
  getQuestion: (id: number) => 
    api.get(`/questions/${id}/`),
  createQuestion: (data: any) => 
    api.post('/questions/', data),
  updateQuestion: (id: number, data: any) => 
    api.patch(`/questions/${id}/`, data),
  deleteQuestion: (id: number) => 
    api.delete(`/questions/${id}/`),
  upvoteQuestion: (id: number) => 
    api.post(`/questions/${id}/upvote/`),
  downvoteQuestion: (id: number) => 
    api.post(`/questions/${id}/downvote/`),
  getUserQuestions: () => 
    api.get('/questions/user/'),
  getTopQuestions: () => 
    api.get('/questions/top/'),
  getQuestionsByEntity: (entitySlug: string) => 
    api.get(`/questions/entity/${entitySlug}/`),
};

// Answers API
export const answersAPI = {
  getAnswers: (questionId: number) => 
    api.get(`/questions/${questionId}/answers/`),
  createAnswer: (questionId: number, data: any) => 
    api.post(`/questions/${questionId}/answers/`, data),
  updateAnswer: (id: number, data: any) => 
    api.patch(`/answers/${id}/`, data),
  deleteAnswer: (id: number) => 
    api.delete(`/answers/${id}/`),
  upvoteAnswer: (id: number) => 
    api.post(`/answers/${id}/upvote/`),
  downvoteAnswer: (id: number) => 
    api.post(`/answers/${id}/downvote/`),
  getUserAnswers: () => 
    api.get('/answers/user/'),
};

// Comments API
export const commentsAPI = {
  getComments: (parentType: string, parentId: number) => 
    api.get(`/${parentType}s/${parentId}/comments/`),
  createComment: (parentType: string, parentId: number, data: any) => 
    api.post(`/${parentType}s/${parentId}/comments/`, data),
  updateComment: (id: number, data: any) => 
    api.patch(`/comments/${id}/`, data),
  deleteComment: (id: number) => 
    api.delete(`/comments/${id}/`),
  upvoteComment: (id: number) => 
    api.post(`/comments/${id}/upvote/`),
  downvoteComment: (id: number) => 
    api.post(`/comments/${id}/downvote/`),
};

// Entities API
export const entitiesAPI = {
  getEntities: (params?: any) => 
    api.get('/entities/', { params }),
  getEntity: (id: number) => 
    api.get(`/entities/${id}/`),
  getEntityBySlug: (slug: string) => 
    api.get(`/entities/slug/${slug}/`),
  createEntity: (data: any) => 
    api.post('/entities/', data),
  updateEntity: (id: number, data: any) => 
    api.patch(`/entities/${id}/`, data),
  deleteEntity: (id: number) => 
    api.delete(`/entities/${id}/`),
  getTopEntities: () => 
    api.get('/entities/top/'),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => 
    api.get('/categories/'),
  getCategory: (id: number) => 
    api.get(`/categories/${id}/`),
  getCategoryBySlug: (slug: string) => 
    api.get(`/categories/slug/${slug}/`),
};

// Tags API
export const tagsAPI = {
  getTags: () => 
    api.get('/tags/'),
  getTag: (id: number) => 
    api.get(`/tags/${id}/`),
  getTagBySlug: (slug: string) => 
    api.get(`/tags/slug/${slug}/`),
};

// Notifications API
export const notificationsAPI = {
  getNotifications: () => 
    api.get('/notifications/'),
  markAsRead: (id: number) => 
    api.post(`/notifications/${id}/read/`),
  markAllAsRead: () => 
    api.post('/notifications/read-all/'),
  deleteNotification: (id: number) => 
    api.delete(`/notifications/${id}/`),
};

// Reports API
export const reportsAPI = {
  createReport: (data: any) => 
    api.post('/reports/', data),
};

// Admin API
export const adminAPI = {
  getStats: () => 
    api.get('/admin/stats/'),
  getPendingQuestions: () => 
    api.get('/admin/questions/pending/'),
  approveQuestion: (id: number) => 
    api.post(`/admin/questions/${id}/approve/`),
  rejectQuestion: (id: number) => 
    api.post(`/admin/questions/${id}/reject/`),
  getReportedContent: () => 
    api.get('/admin/reports/'),
  resolveReport: (id: number) => 
    api.post(`/admin/reports/${id}/resolve/`),
  rejectReport: (id: number) => 
    api.post(`/admin/reports/${id}/reject/`),
  deleteContent: (id: number, type: string) => 
    api.delete(`/admin/${type}s/${id}/`),
  getUsers: () => 
    api.get('/admin/users/'),
  updateUserStatus: (id: number, isActive: boolean) => 
    api.patch(`/admin/users/${id}/`, { is_active: isActive }),
  getEntities: () => 
    api.get('/admin/entities/'),
  updateEntityVerification: (id: number, isVerified: boolean) => 
    api.patch(`/admin/entities/${id}/`, { is_verified: isVerified }),
  updateEntityAvailability: (id: number, isAvailable: boolean) => 
    api.patch(`/admin/entities/${id}/`, { is_available: isAvailable }),
};

export default api;
