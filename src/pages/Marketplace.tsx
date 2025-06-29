import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Bot,
  X,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAgents, useCategories, useMarketplaceStats } from '../hooks/useSupabase';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import AgentCard from '../components/ui/AgentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filters = useMemo(() => ({
    search: debouncedSearch,
    category: selectedCategory,
    priceRange: priceRange as [number, number],
    sortBy
  }), [debouncedSearch, selectedCategory, priceRange, sortBy]);

  const { agents, loading: agentsLoading } = useAgents(filters);
  const { categories, loading: categoriesLoading } = useCategories();
  const { stats, loading: statsLoading } = useMarketplaceStats();

  // Mock data fallback for when Supabase is not available
  const mockAgents = [
    {
      id: '1',
      name: 'DataMiner Pro',
      description: 'Advanced web scraping and data extraction agent with AI-powered insights and automated reporting capabilities.',
      price: 29.99,
      category: 'Data Processing',
      image_url: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user1',
      rating: 4.9,
      sales_count: 1247,
      tags: ['Popular', 'AI-Powered', 'Automation'],
      features: ['Real-time scraping', 'Data visualization', 'API integration', 'Custom filters'],
      demo_url: 'https://demo.dataminer.com',
      documentation_url: 'https://docs.dataminer.com',
      status: 'active' as const,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      profiles: {
        full_name: 'TechCorp Solutions',
        avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    },
    {
      id: '2',
      name: 'ContentCraft AI',
      description: 'Generate high-quality content and copy instantly with advanced AI models and customizable templates.',
      price: 19.99,
      category: 'Content Creation',
      image_url: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user2',
      rating: 4.8,
      sales_count: 892,
      tags: ['New', 'Content', 'AI'],
      features: ['Multiple AI models', 'Custom templates', 'Bulk generation', 'SEO optimization'],
      demo_url: 'https://demo.contentcraft.com',
      documentation_url: 'https://docs.contentcraft.com',
      status: 'active' as const,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
      profiles: {
        full_name: 'Creative Labs',
        avatar_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    },
    {
      id: '3',
      name: 'TaskBot Assistant',
      description: 'Automate repetitive tasks and workflows with intelligent decision making and seamless integrations.',
      price: 15.99,
      category: 'Automation',
      image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user3',
      rating: 4.7,
      sales_count: 654,
      tags: ['Bestseller', 'Productivity'],
      features: ['Workflow automation', 'Smart scheduling', 'Team collaboration', 'Custom triggers'],
      demo_url: 'https://demo.taskbot.com',
      documentation_url: 'https://docs.taskbot.com',
      status: 'active' as const,
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z',
      profiles: {
        full_name: 'Productivity Plus',
        avatar_url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    },
    {
      id: '4',
      name: 'ChatBot Pro',
      description: 'Advanced conversational AI for customer service with natural language processing and multi-language support.',
      price: 39.99,
      category: 'Customer Service',
      image_url: 'https://images.pexels.com/photos/4792715/pexels-photo-4792715.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user4',
      rating: 4.9,
      sales_count: 2156,
      tags: ['Premium', 'AI', 'Customer Service'],
      features: ['NLP processing', 'Multi-language', 'Analytics dashboard', 'Custom training'],
      demo_url: 'https://demo.chatbotpro.com',
      documentation_url: 'https://docs.chatbotpro.com',
      status: 'active' as const,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      profiles: {
        full_name: 'AI Innovations',
        avatar_url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    },
    {
      id: '5',
      name: 'EmailCraft',
      description: 'Intelligent email marketing automation with personalization and advanced analytics.',
      price: 24.99,
      category: 'Marketing',
      image_url: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user5',
      rating: 4.6,
      sales_count: 743,
      tags: ['Marketing', 'Email', 'Analytics'],
      features: ['A/B testing', 'Personalization', 'Campaign analytics', 'Automation workflows'],
      demo_url: 'https://demo.emailcraft.com',
      documentation_url: 'https://docs.emailcraft.com',
      status: 'active' as const,
      created_at: '2023-12-28T00:00:00Z',
      updated_at: '2023-12-28T00:00:00Z',
      profiles: {
        full_name: 'Marketing Masters',
        avatar_url: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    },
    {
      id: '6',
      name: 'AnalyticsBot',
      description: 'Business intelligence and data analytics agent with real-time reporting and predictive insights.',
      price: 49.99,
      category: 'Analytics',
      image_url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      creator_id: 'user6',
      rating: 4.8,
      sales_count: 1089,
      tags: ['Enterprise', 'Analytics', 'BI'],
      features: ['Real-time dashboards', 'Predictive analytics', 'Custom reports', 'Data visualization'],
      demo_url: 'https://demo.analyticsbot.com',
      documentation_url: 'https://docs.analyticsbot.com',
      status: 'active' as const,
      created_at: '2023-12-25T00:00:00Z',
      updated_at: '2023-12-25T00:00:00Z',
      profiles: {
        full_name: 'Data Insights Co',
        avatar_url: 'https://images.pexels.com/photos/2379007/pexels-photo-2379007.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      }
    }
  ];

  const mockCategories = [
    { id: 'all', name: 'All Categories', description: 'Browse all available agents', icon: 'Grid3X3', agent_count: mockAgents.length, created_at: '' },
    { id: 'data-processing', name: 'Data Processing', description: 'Data extraction and analysis', icon: 'Database', agent_count: 45, created_at: '' },
    { id: 'content-creation', name: 'Content Creation', description: 'AI-powered content generation', icon: 'PenTool', agent_count: 32, created_at: '' },
    { id: 'automation', name: 'Automation', description: 'Workflow and task automation', icon: 'Zap', agent_count: 28, created_at: '' },
    { id: 'customer-service', name: 'Customer Service', description: 'Customer support and chat', icon: 'MessageSquare', agent_count: 19, created_at: '' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing and advertising tools', icon: 'Target', agent_count: 24, created_at: '' },
    { id: 'analytics', name: 'Analytics', description: 'Business intelligence and reporting', icon: 'BarChart3', agent_count: 16, created_at: '' }
  ];

  // Use real data if available, otherwise fallback to mock data
  const displayAgents = agents.length > 0 ? agents : mockAgents;
  const displayCategories = categories.length > 0 ? 
    [{ id: 'all', name: 'All Categories', description: 'Browse all available agents', icon: 'Grid3X3', agent_count: displayAgents.length, created_at: '' }, ...categories] : 
    mockCategories;

  // Apply client-side filtering for mock data
  const filteredAgents = useMemo(() => {
    if (agents.length > 0) {
      // Real data is already filtered by the hook
      return agents;
    }

    // Apply filters to mock data
    return mockAgents.filter(agent => {
      const matchesSearch = !debouncedSearch || 
        agent.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        agent.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
                             agent.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
      
      const matchesPrice = agent.price >= priceRange[0] && agent.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'popular':
        default:
          return b.sales_count - a.sales_count;
      }
    });
  }, [agents, debouncedSearch, selectedCategory, priceRange, sortBy]);

  const displayStats = [
    { label: 'Total Agents', value: stats.totalAgents || displayAgents.length, icon: <Bot className="w-4 h-4" /> },
    { label: 'Categories', value: stats.totalCategories || (displayCategories.length - 1), icon: <Grid3X3 className="w-4 h-4" /> },
    { label: 'Avg Rating', value: stats.avgRating || 4.8, icon: <Star className="w-4 h-4" /> },
    { label: 'Total Sales', value: stats.totalSales || 6800, icon: <TrendingUp className="w-4 h-4" /> }
  ];

  // Featured agents (top 3 by sales)
  const featuredAgents = displayAgents
    .sort((a, b) => b.sales_count - a.sales_count)
    .slice(0, 3);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('popular');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 1000 || sortBy !== 'popular';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              AI Agent Marketplace
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Discover and deploy powerful AI agents to automate your workflows and boost productivity.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {displayStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                  <div className="text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Featured Agents
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Top-performing agents handpicked by our team
              </p>
            </div>
            <Badge variant="primary" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Editor's Choice
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AgentCard 
                  agent={{
                    ...agent,
                    creator: agent.profiles ? {
                      full_name: agent.profiles.full_name,
                      avatar_url: agent.profiles.avatar_url
                    } : undefined
                  }} 
                  variant="featured" 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="sticky top-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Filters
                  </h3>
                  <div className="flex items-center space-x-2">
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search agents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                      />
                      {debouncedSearch !== searchTerm && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Categories
                    </label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {displayCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{category.name}</span>
                            <span className="text-xs bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded-full">
                              {category.agent_count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Price Range
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="text-sm"
                        />
                        <span className="text-slate-500">-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="text-sm"
                        />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        ₦{priceRange[0]} - ₦{priceRange[1]}
                      </div>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {filteredAgents.length} of {displayAgents.length} agents
                </div>
                {hasActiveFilters && (
                  <Badge variant="primary" size="sm">
                    Filtered
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Agents Grid/List */}
            {agentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" text="Loading agents..." />
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <AgentCard 
                      agent={{
                        ...agent,
                        creator: agent.profiles ? {
                          full_name: agent.profiles.full_name,
                          avatar_url: agent.profiles.avatar_url
                        } : undefined
                      }} 
                      variant={viewMode === 'list' ? 'default' : 'compact'} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {filteredAgents.length === 0 && !agentsLoading && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No agents found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Try adjusting your filters or search terms.
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;