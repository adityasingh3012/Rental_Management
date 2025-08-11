import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import Alert from '../../components/common/Alert';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, isAuthenticated, clearError, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Debug logging
  console.log('LoginPage - isAuthenticated:', isAuthenticated);

  // Development helper - add to window for console access
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).clearAuth = () => {
        localStorage.removeItem('rental_auth_token');
        localStorage.removeItem('rental_user_data');
        sessionStorage.removeItem('rental_auth_token');
        sessionStorage.removeItem('rental_user_data');
        logout();
        console.log('Auth data cleared - refresh the page');
      };
    }
  }, [logout]);

  // Redirect if already authenticated (with small delay to allow page rendering)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('LoginPage - Redirecting to dashboard');
      // Small timeout to ensure page loads first for debugging
      const timer = setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, location]);

  // Clear error when component unmounts or form changes
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  useEffect(() => {
    const subscription = watch(() => clearError());
    return () => subscription.unsubscribe();
  }, [watch, clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-premium">
            <LogIn className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Demo Credentials Card */}
        <div className="bg-gradient-to-r from-info/10 to-primary/10 rounded-xl p-4 border border-info/20">
          <h3 className="text-sm font-semibold text-info mb-2">Demo Credentials</h3>
          <div className="space-y-1 text-xs text-info/80">
            <div><strong>Admin:</strong> admin@rental.com / admin123</div>
            <div><strong>Staff:</strong> staff@rental.com / staff123</div>
            <div><strong>Customer:</strong> customer@rental.com / customer123</div>
          </div>
          {/* Debug section */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-3 pt-2 border-t border-info/20">
              <div className="text-xs text-info/80 mb-2">
                Auth Status: {isAuthenticated ? 'Logged In' : 'Not Logged In'}
              </div>
              {isAuthenticated && (
                <button 
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }} 
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Clear Auth & Reload
                </button>
              )}
            </div>
          )}
        </div>

        {/* Login Form */}
        <div className="bg-card py-8 px-6 shadow-premium rounded-2xl border border-border">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Error Alert */}
            {error && (
              <Alert
                variant="error"
                title="Login Failed"
                onClose={clearError}
                closable
              >
                {error}
              </Alert>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
                leftIcon={Mail}
                error={errors.email?.message}
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative w-full">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                  leftIcon={Lock}
                  error={errors.password?.message}
                  fullWidth
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading || isSubmitting}
              className="w-full group flex items-center justify-center"
            >
              {isLoading || isSubmitting ? (
                'Signing in...'
              ) : (
                <span className="flex items-center">
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2025 RentalPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
