import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Trash2,
  Save,
  Camera,
  Globe,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import toast from 'react-hot-toast';

interface ProfileForm {
  full_name: string;
  email: string;
  bio: string;
  website: string;
  location: string;
  avatar_url: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'danger'>('profile');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue,
    watch
  } = useForm<ProfileForm>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch: watchPassword
  } = useForm<PasswordForm>();

  const watchNewPassword = watchPassword('newPassword');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
        setValue('full_name', data.full_name || '');
        setValue('email', data.email || '');
        setValue('bio', data.bio || '');
        setValue('website', data.website || '');
        setValue('location', data.location || '');
        setValue('avatar_url', data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          bio: data.bio,
          website: data.website,
          location: data.location,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      await updateProfile({
        full_name: data.full_name,
        bio: data.bio,
        avatar_url: data.avatar_url
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully!');
      resetPassword();
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'danger', label: 'Danger Zone', icon: <Trash2 className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Account Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.icon}
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <img
                        src={watch('avatar_url') || user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                          Profile Picture
                        </h3>
                        <Input
                          placeholder="Avatar URL"
                          {...registerProfile('avatar_url')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        icon={<User className="w-4 h-4" />}
                        error={profileErrors.full_name?.message}
                        {...registerProfile('full_name', { required: 'Full name is required' })}
                      />
                      
                      <Input
                        label="Email"
                        type="email"
                        icon={<Mail className="w-4 h-4" />}
                        disabled
                        {...registerProfile('email')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        {...registerProfile('bio')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Website"
                        icon={<LinkIcon className="w-4 h-4" />}
                        placeholder="https://yourwebsite.com"
                        {...registerProfile('website')}
                      />
                      
                      <Input
                        label="Location"
                        icon={<MapPin className="w-4 h-4" />}
                        placeholder="Lagos, Nigeria"
                        {...registerProfile('location')}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" loading={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Security Settings
                  </h2>
                  
                  <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                    <Input
                      label="Current Password"
                      type="password"
                      icon={<Lock className="w-4 h-4" />}
                      error={passwordErrors.currentPassword?.message}
                      {...registerPassword('currentPassword', { required: 'Current password is required' })}
                    />
                    
                    <Input
                      label="New Password"
                      type="password"
                      icon={<Lock className="w-4 h-4" />}
                      error={passwordErrors.newPassword?.message}
                      {...registerPassword('newPassword', { 
                        required: 'New password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                      })}
                    />
                    
                    <Input
                      label="Confirm New Password"
                      type="password"
                      icon={<Lock className="w-4 h-4" />}
                      error={passwordErrors.confirmPassword?.message}
                      {...registerPassword('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: (value) => value === watchNewPassword || 'Passwords do not match'
                      })}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" loading={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive notifications about your agents and purchases
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Marketing Emails
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive updates about new features and promotions
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                          Push Notifications
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'danger' && (
                <Card className="p-6 border-red-200 dark:border-red-800">
                  <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6">
                    Danger Zone
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="danger" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;