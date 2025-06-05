import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

// Public Pages
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/questions/QuestionsPage';
import QuestionDetailPage from './pages/questions/QuestionDetailPage';
import AskQuestionPage from './pages/questions/AskQuestionPage';
import EntitiesPage from './pages/entities/EntitiesPage';
import EntityDetailPage from './pages/entities/EntityDetailPage';
import CategoryPage from './pages/entities/CategoryPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Pages
import ProfilePage from './pages/user/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';

// Role-specific Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import EditorDashboardPage from './pages/editor/EditorDashboardPage';
import ModeratorDashboardPage from './pages/moderator/ModeratorDashboardPage';
import SupportDashboardPage from './pages/support/SupportDashboardPage';

// Layout
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Outlet /></Layout>}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="questions/:id" element={<QuestionDetailPage />} />
        <Route path="entities" element={<EntitiesPage />} />
        <Route path="entities/:slug" element={<EntityDetailPage />} />
        <Route path="categories/:slug" element={<CategoryPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsOfServicePage />} />
        
        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected User Routes */}
        <Route path="ask" element={
          <PrivateRoute>
            <AskQuestionPage />
          </PrivateRoute>
        } />
        <Route path="profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="notifications" element={
          <PrivateRoute>
            <NotificationsPage />
          </PrivateRoute>
        } />
        
        {/* Role-specific Routes */}
        <Route path="admin" element={
          <PrivateRoute requiredRole="Admin">
            <AdminDashboardPage />
          </PrivateRoute>
        } />
        <Route path="editor" element={
          <PrivateRoute requiredRole="Editor">
            <EditorDashboardPage />
          </PrivateRoute>
        } />
        <Route path="moderator" element={
          <PrivateRoute requiredRole="Moderator">
            <ModeratorDashboardPage />
          </PrivateRoute>
        } />
        <Route path="support" element={
          <PrivateRoute requiredRole="Support">
            <SupportDashboardPage />
          </PrivateRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
