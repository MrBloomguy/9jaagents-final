import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Eye, 
  Download, 
  ExternalLink,
  User,
  Calendar,
  Tag,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  Globe,
  Code,
  Bookmark,
  Target
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useAgent, useAgentReviews, useCreateReview } from '../hooks/useSupabase';
import { usePayment } from '../hooks/usePayment';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import PaystackPayment from '../components/payment/PaystackPayment';

interface ReviewForm {
  rating: number;
  comment: string;
}

const AgentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { agent, loading: agentLoading } = useAgent(id || '');
  const { reviews, loading: reviewsLoading, refetch: refetchReviews } = useAgentReviews(id || '');
  const { createReview, loading: reviewSubmitting } = useCreateReview();
  const { createPurchase, checkPurchaseStatus, loading: paymentLoading } = usePayment();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'documentation'>('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ReviewForm>();

  const watchRating = watch('rating', 0);

  // Check if user has already purchased this agent
  useEffect(() => {
    if (user && id) {
      checkPurchaseStatus(id).then(setIsPurchased);
    }
  }, [user, id, checkPurchaseStatus]);

  // Mock data for demonstration - in real app this would come from Supabase
  const mockAgent = {
    id: id || '1',
    name: 'DataMiner Pro',
    description: 'Advanced web scraping and data extraction agent with AI-powered insights and automated reporting capabilities. This powerful tool can extract data from any website, process it intelligently, and generate comprehensive reports automatically.',
    price: 29.99,
    category: 'Data Processing',
    image_url: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    creator_id: 'user1',
    rating: 4.9,
    sales_count: 1247,
    tags: ['Popular', 'AI-Powered', 'Automation', 'Data Processing', 'Web Scraping'],
    features: [
      'Real-time web scraping',
      'AI-powered data analysis',
      'Automated report generation',
      'API integration support',
      'Custom filtering options',
      'Export to multiple formats',
      'Scheduled data collection',
      'Advanced error handling'
    ],
    demo_url: 'https://demo.dataminer.com',
    documentation_url: 'https://docs.dataminer.com',
    status: 'active' as const,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    creator: {
      full_name: 'TechCorp Solutions',
      avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      bio: 'Leading AI development company specializing in automation solutions for businesses.'
    },
    images: [
      'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
    ],
    specifications: {
      'API Version': '2.0',
      'Response Time': '< 100ms',
      'Uptime': '99.9%',
      'Data Formats': 'JSON, CSV, XML',
      'Rate Limit': '1000 requests/hour',
      'Support': '24/7 Email & Chat'
    }
  };

  const mockReviews = [
    {
      id: '1',
      user_id: 'user1',
      agent_id: id || '1',
      rating: 5,
      comment: 'Absolutely fantastic! This agent has saved me hours of manual work. The AI-powered insights are incredibly accurate and the automated reporting feature is a game-changer.',
      created_at: '2024-01-20T00:00:00Z',
      profiles: {
        full_name: 'Sarah Johnson',
        avatar_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      helpful_count: 12,
      verified_purchase: true
    },
    {
      id: '2',
      user_id: 'user2',
      agent_id: id || '1',
      rating: 5,
      comment: 'Best investment I\'ve made for my business. The data extraction is lightning fast and the quality is top-notch. Customer support is also excellent.',
      created_at: '2024-01-18T00:00:00Z',
      profiles: {
        full_name: 'Michael Chen',
        avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      helpful_count: 8,
      verified_purchase: true
    },
    {
      id: '3',
      user_id: 'user3',
      agent_id: id || '1',
      rating: 4,
      comment: 'Great tool overall. Setup was easy and it works as advertised. Would love to see more customization options in future updates.',
      created_at: '2024-01-16T00:00:00Z',
      profiles: {
        full_name: 'Emily Rodriguez',
        avatar_url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      helpful_count: 5,
      verified_purchase: true
    }
  ];

  // Use real data if available, otherwise use mock data
  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  const displayAgent = (id && isValidUUID(id) && agent) ? agent : mockAgent;
  const displayReviews = reviews.length > 0 ? reviews : mockReviews;

  const handlePaymentSuccess = async (reference: string) => {
    try {
      await createPurchase({
        agent_id: displayAgent.id,
        amount: displayAgent.price,
        reference,
        status: 'completed',
        payment_method: 'paystack'
      });
      
      setIsPurchased(true);
      setShowPayment(false);
      toast.success('Agent purchased successfully! You now have access.');
    } catch (error) {
      toast.error('Purchase failed. Please contact support if payment was deducted.');
    }
  };

  const handlePurchase = () => {
    if (!user) {
      toast.error('Please login to purchase this agent');
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  const handleReviewSubmit = async (data: ReviewForm) => {
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }

    try {
      await createReview({
        user_id: user.id,
        agent_id: displayAgent.id,
        rating: data.rating,
        comment: data.comment
      });
      
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      reset();
      refetchReviews();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBreakdown = () => {
    const ratingCounts = [
      { stars: 5, count: 892, percentage: 72 },
      { stars: 4, count: 234, percentage: 19 },
      { stars: 3, count: 89, percentage: 7 },
      { stars: 2, count: 23, percentage: 2 },
      { stars: 1, count: 9, percentage: 1 }
    ];

    return (
      <div className="space-y-3">
        {ratingCounts.map((rating) => (
          <div key={rating.stars} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-sm text-slate-600 dark:text-slate-400">{rating.stars}</span>
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
            </div>
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${rating.percentage}%` }}
              />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400 w-12 text-right">
              {rating.count}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (agentLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="spinner w-8 h-8" />
      </div>
    );
  }

  if (!displayAgent) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Agent Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The agent you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/marketplace')}>
            Browse Marketplace
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/marketplace" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
              Marketplace
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 dark:text-white font-medium">
              {displayAgent.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agent Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Images */}
                  <div>
                    <div className="relative mb-4">
                      <img
                        src={displayAgent.images?.[selectedImage] || displayAgent.image_url}
                        alt={displayAgent.name}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                      {displayAgent.demo_url && (
                        <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-slate-900 ml-1" />
                          </div>
                        </button>
                      )}
                    </div>
                    
                    {displayAgent.images && displayAgent.images.length > 1 && (
                      <div className="flex space-x-2">
                        {displayAgent.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                              selectedImage === index
                                ? 'border-blue-500'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${displayAgent.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Agent Info */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                          {displayAgent.name}
                        </h1>
                        <Badge variant="neutral" className="mb-4">
                          {displayAgent.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleWishlist}
                          className={isWishlisted ? 'text-red-500' : ''}
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleShare}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center space-x-2">
                        {renderStars(displayAgent.rating)}
                        <span className="font-medium text-slate-900 dark:text-white">
                          {displayAgent.rating}
                        </span>
                        <span className="text-slate-500">
                          ({displayReviews.length} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-500">
                        <Download className="w-4 h-4" />
                        <span>{displayAgent.sales_count.toLocaleString()} sales</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {displayAgent.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {displayAgent.tags.map((tag, index) => (
                        <Badge key={index} variant="neutral" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <img
                        src={displayAgent.creator?.avatar_url}
                        alt={displayAgent.creator?.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          {displayAgent.creator?.full_name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {displayAgent.creator?.bio}
                        </p>
                      </div>
                      <Badge variant="primary" size="sm">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <div className="border-b border-slate-200 dark:border-slate-700">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
                      { id: 'reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4" /> },
                      { id: 'documentation', label: 'Documentation', icon: <FileText className="w-4 h-4" /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* Features */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                          Key Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {displayAgent.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specifications */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                          Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(displayAgent.specifications || {}).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <span className="font-medium text-slate-700 dark:text-slate-300">{key}</span>
                              <span className="text-slate-900 dark:text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Demo & Links */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                          Try It Out
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {displayAgent.demo_url && (
                            <Button variant="outline" className="flex-1">
                              <Play className="w-4 h-4 mr-2" />
                              Live Demo
                            </Button>
                          )}
                          {displayAgent.documentation_url && (
                            <Button variant="outline" className="flex-1">
                              <FileText className="w-4 h-4 mr-2" />
                              Documentation
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-8">
                      {/* Review Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                              {displayAgent.rating}
                            </div>
                            {renderStars(displayAgent.rating, 'lg')}
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                              Based on {displayReviews.length} reviews
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                            Rating Breakdown
                          </h4>
                          {renderRatingBreakdown()}
                        </div>
                      </div>

                      {/* Write Review */}
                      {user && !showReviewForm && isPurchased && (
                        <div className="text-center">
                          <Button onClick={() => setShowReviewForm(true)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Write a Review
                          </Button>
                        </div>
                      )}

                      {/* Review Form */}
                      {showReviewForm && (
                        <Card className="p-6 bg-slate-50 dark:bg-slate-800">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                            Write Your Review
                          </h4>
                          <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Rating
                              </label>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setValue('rating', star)}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`w-6 h-6 ${
                                        star <= watchRating
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              {errors.rating && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                  Please select a rating
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Your Review
                              </label>
                              <textarea
                                rows={4}
                                placeholder="Share your experience with this agent..."
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('comment', { 
                                  required: 'Please write a review',
                                  minLength: { value: 10, message: 'Review must be at least 10 characters' }
                                })}
                              />
                              {errors.comment && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                  {errors.comment.message}
                                </p>
                              )}
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                type="submit"
                                loading={reviewSubmitting}
                              >
                                Submit Review
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowReviewForm(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Card>
                      )}

                      {/* Reviews List */}
                      <div className="space-y-6">
                        {displayReviews.map((review) => (
                          <Card key={review.id} className="p-6">
                            <div className="flex items-start space-x-4">
                              <img
                                src={review.profiles?.avatar_url}
                                alt={review.profiles?.full_name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <h5 className="font-medium text-slate-900 dark:text-white">
                                      {review.profiles?.full_name}
                                    </h5>
                                    {review.verified_purchase && (
                                      <Badge variant="success" size="sm">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Verified Purchase
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-slate-500">
                                    {new Date(review.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-2 mb-3">
                                  {renderStars(review.rating)}
                                </div>
                                
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                  {review.comment}
                                </p>
                                
                                <div className="flex items-center space-x-4 text-sm">
                                  <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Helpful ({review.helpful_count || 0})</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                                    <Flag className="w-4 h-4" />
                                    <span>Report</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'documentation' && (
                    <div className="space-y-6">
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          Documentation
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                          Comprehensive guides and API documentation for this agent.
                        </p>
                        {displayAgent.documentation_url && (
                          <Button>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Full Documentation
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    ₦{displayAgent.price.toLocaleString()}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    One-time purchase
                  </p>
                </div>

                <div className="space-y-4">
                  {isPurchased ? (
                    <Button className="w-full" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Purchased
                    </Button>
                  ) : showPayment ? (
                    <PaystackPayment
                      amount={displayAgent.price}
                      agentId={displayAgent.id}
                      agentName={displayAgent.name}
                      onSuccess={handlePaymentSuccess}
                      onClose={() => setShowPayment(false)}
                      disabled={paymentLoading}
                    />
                  ) : (
                    <Button
                      className="w-full"
                      onClick={handlePurchase}
                      loading={paymentLoading}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase Agent
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-slate-600 dark:text-slate-400">30-day money back guarantee</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-600 dark:text-slate-400">Instant access after purchase</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-slate-600 dark:text-slate-400">24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Agent Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Total Sales</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {displayAgent.sales_count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Average Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {displayAgent.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Reviews</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {displayReviews.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {new Date(displayAgent.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Related Agents
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'ContentCraft AI',
                      price: 19.99,
                      rating: 4.8,
                      image: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
                    },
                    {
                      name: 'TaskBot Assistant',
                      price: 15.99,
                      rating: 4.7,
                      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
                    }
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                          {agent.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-slate-600 dark:text-slate-400">
                              {agent.rating}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-slate-900 dark:text-white">
                            ₦{agent.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;