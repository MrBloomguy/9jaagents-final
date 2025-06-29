import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Upload, 
  Image as ImageIcon, 
  DollarSign, 
  Tag, 
  FileText, 
  Link as LinkIcon,
  Zap,
  Eye,
  Save,
  ArrowRight,
  Plus,
  X,
  CheckCircle
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useCategories, useCreateAgent } from '../hooks/useSupabase';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

interface CreateAgentForm {
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string;
  tags: { value: string }[];
  features: { value: string }[];
  demo_url?: string;
  documentation_url?: string;
}

const CreateAgent: React.FC = () => {
  const { user } = useAuth();
  const { categories } = useCategories();
  const { createAgent, loading } = useCreateAgent();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues
  } = useForm<CreateAgentForm>({
    defaultValues: {
      tags: [{ value: '' }],
      features: [{ value: '' }]
    }
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: 'tags'
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features'
  });

  const watchedValues = watch();

  const onSubmit = async (data: CreateAgentForm) => {
    if (!user) {
      toast.error('You must be logged in to create an agent');
      return;
    }

    try {
      const agentData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        image_url: data.image_url,
        creator_id: user.id,
        tags: data.tags.map(tag => tag.value).filter(Boolean),
        features: data.features.map(feature => feature.value).filter(Boolean),
        demo_url: data.demo_url || undefined,
        documentation_url: data.documentation_url || undefined,
        status: 'pending' as const
      };

      await createAgent(agentData);
      toast.success('Agent created successfully! It will be reviewed before going live.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create agent. Please try again.');
    }
  };

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Name, description, and category' },
    { id: 2, title: 'Pricing & Media', description: 'Set price and upload images' },
    { id: 3, title: 'Features & Tags', description: 'Add features and tags' },
    { id: 4, title: 'Links & Review', description: 'Demo links and final review' }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Agent Name"
              placeholder="Enter a catchy name for your AI agent"
              error={errors.name?.message}
              {...register('name', { required: 'Agent name is required' })}
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe what your AI agent does and how it helps users..."
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 50, message: 'Description must be at least 50 characters' }
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('category_id', { required: 'Category is required' })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Input
              label="Price (₦)"
              type="number"
              step="0.01"
              placeholder="29.99"
              icon={<DollarSign className="w-4 h-4" />}
              error={errors.price?.message}
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' }
              })}
            />

            <Input
              label="Agent Image URL"
              placeholder="https://example.com/agent-image.jpg"
              icon={<ImageIcon className="w-4 h-4" />}
              error={errors.image_url?.message}
              {...register('image_url', { required: 'Image URL is required' })}
            />

            {watchedValues.image_url && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Image Preview
                </label>
                <img
                  src={watchedValues.image_url}
                  alt="Agent preview"
                  className="w-full h-48 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2';
                  }}
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Tags
              </label>
              <div className="space-y-3">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., AI-Powered, Popular, Automation"
                      {...register(`tags.${index}.value`)}
                    />
                    {tagFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendTag({ value: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Key Features
              </label>
              <div className="space-y-3">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Real-time processing, API integration"
                      {...register(`features.${index}.value`)}
                    />
                    {featureFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendFeature({ value: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Input
              label="Demo URL (Optional)"
              placeholder="https://demo.youragent.com"
              icon={<LinkIcon className="w-4 h-4" />}
              {...register('demo_url')}
            />

            <Input
              label="Documentation URL (Optional)"
              placeholder="https://docs.youragent.com"
              icon={<FileText className="w-4 h-4" />}
              {...register('documentation_url')}
            />

            {/* Preview Card */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Agent Preview
              </label>
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={watchedValues.image_url || 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2'}
                    alt={watchedValues.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="warning" size="sm">
                      Pending Review
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {watchedValues.name || 'Agent Name'}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                    {watchedValues.description || 'Agent description will appear here...'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {watchedValues.tags?.filter(tag => tag.value).map((tag, index) => (
                      <Badge key={index} variant="neutral" size="sm">
                        {tag.value}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ₦{watchedValues.price || '0.00'}
                    </span>
                    <Button size="sm" disabled>
                      Preview Mode
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Bot className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Login Required
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You need to be logged in to create an AI agent.
          </p>
          <Button onClick={() => navigate('/login')}>
            Login to Continue
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Create AI Agent
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Share your AI agent with the community
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center space-x-4 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepItem.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {step > stepItem.id ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        stepItem.id
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-sm font-medium ${
                        step >= stepItem.id
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {stepItem.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {stepItem.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepItem.id
                        ? 'bg-blue-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {steps[step - 1].title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {steps[step - 1].description}
                </p>
              </div>

              {renderStepContent()}
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(Math.min(4, step + 1))}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Agent
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgent;