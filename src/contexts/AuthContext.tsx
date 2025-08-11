import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/user.types';

// Auth State Interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// Auth Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };

// Auth Context Interface
interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

// Registration Data Interface
interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  acceptTerms: boolean;
}

// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage utilities
const TOKEN_KEY = 'rental_auth_token';
const USER_KEY = 'rental_user_data';

const storage = {
  setToken: (token: string, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },
  setUser: (user: User, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage
  useEffect(() => {
    const token = storage.getToken();
    const user = storage.getUser();

    if (token && user) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    }
  }, []);

  // API calls - These will be endpoints for backend integration
  const authAPI = {
    // POST /api/auth/login
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      // Simulate API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock successful login
          if (email === 'admin@rental.com' && password === 'admin123') {
            resolve({
              user: {
                id: '1',
                email: 'admin@rental.com',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
                status: 'active',
                contactInfo: {
                  email: 'admin@rental.com',
                  phone: '+1234567890',
                },
                emailVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token-admin',
            });
          } else if (email === 'customer@rental.com' && password === 'customer123') {
            resolve({
              user: {
                id: '2',
                email: 'customer@rental.com',
                firstName: 'John',
                lastName: 'Doe',
                role: 'customer',
                status: 'active',
                contactInfo: {
                  email: 'customer@rental.com',
                  phone: '+1234567890',
                },
                emailVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token-customer',
            });
          } else if (email === 'staff@rental.com' && password === 'staff123') {
            resolve({
              user: {
                id: '3',
                email: 'staff@rental.com',
                firstName: 'Jane',
                lastName: 'Smith',
                role: 'staff',
                status: 'active',
                contactInfo: {
                  email: 'staff@rental.com',
                  phone: '+1234567890',
                },
                emailVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              token: 'mock-jwt-token-staff',
            });
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 1000);
      });
    },

    // POST /api/auth/register
    register: async (userData: RegisterFormData): Promise<{ user: User; token: string }> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock successful registration
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            status: 'active',
            contactInfo: {
              email: userData.email,
              phone: userData.phone,
            },
            emailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          resolve({
            user,
            token: `mock-jwt-token-${user.id}`,
          });
        }, 1500);
      });
    },

    // POST /api/auth/forgot-password
    forgotPassword: async (email: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Password reset email sent to: ${email}`);
          resolve();
        }, 1000);
      });
    },

    // POST /api/auth/reset-password
    resetPassword: async (token: string, password: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Password reset successful for token: ${token}`);
          resolve();
        }, 1000);
      });
    },

    // PUT /api/auth/profile
    updateProfile: async (userData: Partial<User>): Promise<User> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedUser = { ...state.user!, ...userData, updatedAt: new Date().toISOString() };
          resolve(updatedUser);
        }, 1000);
      });
    },
  };

  // Auth methods
  const login = async (email: string, password: string, rememberMe = false) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const { user, token } = await authAPI.login(email, password);
      storage.setToken(token, rememberMe);
      storage.setUser(user, rememberMe);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  const register = async (userData: RegisterFormData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const { user, token } = await authAPI.register(userData);
      storage.setToken(token, true); // Remember user after registration
      storage.setUser(user, true);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Registration failed' });
    }
  };

  const logout = () => {
    storage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  const forgotPassword = async (email: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      await authAPI.forgotPassword(email);
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Password reset failed' });
    }
  };

  const resetPassword = async (token: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      await authAPI.resetPassword(token, password);
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Password reset failed' });
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const updatedUser = await authAPI.updateProfile(userData);
      storage.setUser(updatedUser, true);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'Profile update failed' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
