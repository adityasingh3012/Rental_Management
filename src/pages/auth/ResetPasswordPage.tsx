import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff, CheckCircle, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import Alert from '../../components/common/Alert';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Clear error when form changes
  React.useEffect(() => {
    clearError();
  }, [watch('password'), watch('confirmPassword'), clearError]);

  // Redirect to forgot password if no token
  React.useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    
    try {
      await resetPassword(token, data.password);
      setIsPasswordReset(true);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  if (isPasswordReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Success State */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Password Reset Successful!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Sign In Now
              </Button>
              
              <p className="text-sm text-gray-500">
                The login page will remember this device for easier access.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return null; // Will redirect to forgot password
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Key className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Error Alert */}
            {error && (
              <Alert
                variant="error"
                title="Reset Failed"
                onClose={clearError}
                closable
              >
                {error}
              </Alert>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Your new password must be at least 6 characters long and contain uppercase, lowercase, and a number.
              </p>
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number',
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('password') || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Password requirements:</p>
              <ul className="space-y-1 text-xs">
                <li className={`flex items-center ${
                  watch('password')?.length >= 6 ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <CheckCircle className={`h-3 w-3 mr-2 ${
                    watch('password')?.length >= 6 ? 'text-green-600' : 'text-gray-300'
                  }`} />
                  At least 6 characters
                </li>
                <li className={`flex items-center ${
                  /[A-Z]/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <CheckCircle className={`h-3 w-3 mr-2 ${
                    /[A-Z]/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-300'
                  }`} />
                  One uppercase letter
                </li>
                <li className={`flex items-center ${
                  /[a-z]/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <CheckCircle className={`h-3 w-3 mr-2 ${
                    /[a-z]/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-300'
                  }`} />
                  One lowercase letter
                </li>
                <li className={`flex items-center ${
                  /\d/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <CheckCircle className={`h-3 w-3 mr-2 ${
                    /\d/.test(watch('password') || '') ? 'text-green-600' : 'text-gray-300'
                  }`} />
                  One number
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading || isSubmitting}
              className="w-full"
            >
              {isLoading || isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Back to login
            </Link>
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

export default ResetPasswordPage;
