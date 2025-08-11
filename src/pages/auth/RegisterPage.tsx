import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  Check,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import StepIndicator from '../../components/common/StepIndicator';
import { UserRole } from '../../types/user.types';

interface RegisterFormData {
  // Step 1: Account Info
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Info
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  
  // Step 3: Additional Info (optional)
  companyName?: string;
  acceptTerms: boolean;
}

const steps = [
  { id: '1', title: 'Account', description: 'Email & Password' },
  { id: '2', title: 'Personal', description: 'Your Information' },
  { id: '3', title: 'Complete', description: 'Review & Submit' },
];

const roleOptions = [
  { value: 'customer', label: 'Customer', description: 'Rent equipment and products' },
  { value: 'staff', label: 'Staff Member', description: 'Manage rentals and customers' },
];

const RegisterPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'customer',
      companyName: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when form changes
  useEffect(() => {
    const subscription = watch(() => clearError());
    return () => subscription.unsubscribe();
  }, [watch, clearError]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['email', 'password', 'confirmPassword'];
        break;
      case 2:
        fieldsToValidate = ['firstName', 'lastName', 'phone', 'role'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
        companyName: data.companyName,
        acceptTerms: data.acceptTerms,
      });
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Account</h3>
        <p className="text-sm text-gray-600">Enter your email and choose a secure password</p>
      </div>

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
            placeholder="Create a password"
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and number',
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

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative w-full">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className="w-full pr-10"
            leftIcon={Lock}
            error={errors.confirmPassword?.message}
            fullWidth
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
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
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-sm text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            className="w-full"
            leftIcon={User}
            error={errors.firstName?.message}
            fullWidth
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 2,
                message: 'First name must be at least 2 characters',
              },
            })}
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="w-full"
            leftIcon={User}
            error={errors.lastName?.message}
            fullWidth
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
              },
            })}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="w-full"
          leftIcon={Phone}
          error={errors.phone?.message}
          fullWidth
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[1-9][\d]{0,15}$/,
              message: 'Invalid phone number',
            },
          })}
        />
      </div>

      {/* Role Selection */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <div className="space-y-3">
          {roleOptions.map((option) => (
            <label
              key={option.value}
              className="relative flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              <input
                type="radio"
                value={option.value}
                className="sr-only"
                {...register('role', { required: 'Please select an account type' })}
              />
              <div className="flex items-center h-5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  watch('role') === option.value
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                }`}>
                  {watch('role') === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Company Name (conditional) */}
      {watch('role') === 'staff' && (
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name (Optional)
          </label>
          <Input
            id="companyName"
            type="text"
            placeholder="Your company name"
            className="w-full"
            leftIcon={Building2}
            fullWidth
            {...register('companyName')}
          />
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Complete</h3>
        <p className="text-sm text-gray-600">Review your information and complete registration</p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Email:</span>
          <span className="text-sm font-medium text-gray-900">{watch('email')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Name:</span>
          <span className="text-sm font-medium text-gray-900">
            {watch('firstName')} {watch('lastName')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Phone:</span>
          <span className="text-sm font-medium text-gray-900">{watch('phone')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Account Type:</span>
          <span className="text-sm font-medium text-gray-900 capitalize">{watch('role')}</span>
        </div>
        {watch('companyName') && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Company:</span>
            <span className="text-sm font-medium text-gray-900">{watch('companyName')}</span>
          </div>
        )}
      </div>

      {/* Terms and Conditions */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            {...register('acceptTerms', {
              required: 'You must accept the terms and conditions',
            })}
          />
          <div className="text-sm">
            <span className="text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Privacy Policy
              </Link>
            </span>
          </div>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-premium">
            <UserPlus className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join RentalPro and start managing rentals today
          </p>
        </div>

        {/* Step Indicator */}
        <div className="px-4">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
          />
        </div>

        {/* Registration Form */}
        <div className="bg-card py-8 px-6 shadow-premium rounded-2xl border border-border">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Error Alert */}
            {error && (
              <div className="mb-6">
                <Alert
                  variant="error"
                  title="Registration Failed"
                  onClose={clearError}
                  closable
                >
                  {error}
                </Alert>
              </div>
            )}

            {/* Step Content */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading || isSubmitting}
                  className="flex items-center justify-center"
                >
                  {isLoading || isSubmitting ? (
                    'Creating Account...'
                  ) : (
                    <span className="flex items-center">
                      Create Account
                      <Check className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in here
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

export default RegisterPage;
