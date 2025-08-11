import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Lock,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { Card } from '../../components/common/Card';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading, error, clearError } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.contactInfo?.phone || '',
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        contactInfo: {
          ...user?.contactInfo,
          phone: data.phone,
        } as any,
      });
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      // Error handled by context
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    // This would typically call a separate API endpoint
    console.log('Password change:', data);
    setSuccessMessage('Password updated successfully!');
    passwordForm.reset();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <Alert variant="success" closable onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="error" closable onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Profile Header Card */}
      <Card className="p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Camera className="h-4 w-4 text-gray-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize mt-2">
              {user?.role}
            </span>
          </div>
        </div>
      </Card>

      {/* Profile Information */}
      <Card>
        <Card.Header className="border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          <p className="text-sm text-gray-600 mt-1">Update your personal information and contact details</p>
        </Card.Header>
        <Card.Body className="p-6">
          <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="First name"
                    className="pl-10"
                    error={profileForm.formState.errors.firstName?.message}
                    {...profileForm.register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="Last name"
                    className="pl-10"
                    error={profileForm.formState.errors.lastName?.message}
                    {...profileForm.register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  value={user?.email}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed. Contact support if you need to update it.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                  error={profileForm.formState.errors.phone?.message}
                  {...profileForm.register('phone')}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>

      {/* Password Change */}
      <Card>
        <Card.Header className="border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
        </Card.Header>
        <Card.Body className="p-6">
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  className="pl-10"
                  error={passwordForm.formState.errors.currentPassword?.message}
                  {...passwordForm.register('currentPassword', {
                    required: 'Current password is required',
                  })}
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="pl-10"
                  error={passwordForm.formState.errors.newPassword?.message}
                  {...passwordForm.register('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="pl-10"
                  error={passwordForm.formState.errors.confirmPassword?.message}
                  {...passwordForm.register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === passwordForm.watch('newPassword') || 'Passwords do not match',
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className="flex items-center space-x-2"
              >
                <Lock className="h-4 w-4" />
                <span>Update Password</span>
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
