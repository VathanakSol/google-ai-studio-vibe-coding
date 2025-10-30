import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USER: User = {
  id: 'u1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  phoneNumber: '+1 (555) 123-4567',
  address: {
    street: '123 Tech Street',
    city: 'Silicon Valley',
    state: 'CA',
    zipCode: '94025',
    country: 'USA'
  },
  orderHistory: ['ord123', 'ord456'],
  createdAt: '2025-01-01'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const storedAuth = localStorage.getItem('authState');
      return storedAuth ? JSON.parse(storedAuth) : {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
    } catch (error) {
      console.error('Failed to parse auth state:', error);
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === MOCK_USER.email && password === 'password123') {
        setAuthState({
          isAuthenticated: true,
          user: MOCK_USER,
          loading: false,
          error: null
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `u${Math.random().toString(36).substr(2, 9)}`,
        email: userData.email!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        avatar: userData.avatar,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        createdAt: new Date().toISOString()
      };

      setAuthState({
        isAuthenticated: true,
        user: newUser,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
  }, []);

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        user: prev.user ? { ...prev.user, ...userData } : null
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};