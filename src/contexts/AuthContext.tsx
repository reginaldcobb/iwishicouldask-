import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkLoggedIn = async () => {
      try {
        // In a real implementation, this would verify the token with the backend
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('userRole');
        
        if (token) {
          // Mock user data for demonstration
          let roles = ['User'];
          
          // Add stored role if available
          if (storedRole) {
            if (!roles.includes(storedRole)) {
              roles.push(storedRole);
            }
          }
          
          setUser({
            id: 1,
            username: 'demo_user',
            email: 'demo@example.com',
            roles: roles,
            reputationPoints: 350,
            dateJoined: '2023-01-01'
          });
        }
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      // const response = await authAPI.login(email, password);
      // localStorage.setItem('token', response.data.token);
      
      // For demonstration, simulate successful login
      localStorage.setItem('token', 'mock-jwt-token');
      
      // Set default roles
      let roles = ['User'];
      
      // Add specific role if provided
      if (role) {
        localStorage.setItem('userRole', role);
        if (!roles.includes(role)) {
          roles.push(role);
        }
      }
      
      // Mock user data
      setUser({
        id: 1,
        username: 'demo_user',
        email: email,
        roles: roles,
        reputationPoints: 350,
        dateJoined: '2023-01-01'
      });
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      // const response = await authAPI.register(username, email, password);
      // localStorage.setItem('token', response.data.token);
      
      // For demonstration, simulate successful registration
      localStorage.setItem('token', 'mock-jwt-token');
      
      // Mock user data
      setUser({
        id: 1,
        username: username,
        email: email,
        roles: ['User'],
        reputationPoints: 0,
        dateJoined: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
  };
  
  const switchRole = (role: string) => {
    if (user) {
      localStorage.setItem('userRole', role);
      
      // Update user roles
      let roles = ['User'];
      if (!roles.includes(role)) {
        roles.push(role);
      }
      
      setUser({
        ...user,
        roles: roles
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
      login, 
      register, 
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
