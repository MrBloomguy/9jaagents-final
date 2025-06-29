import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Database, 
  PenTool, 
  Zap, 
  MessageSquare, 
  Target, 
  BarChart3,
  Bot,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Categories: React.FC = () => {
  const categories = [
    {
      id: 'data-processing',
      name: 'Data Processing',
      description: 'Extract, analyze, and process data with intelligent automation',
      icon: <Database className="w-8 h-8" />,
      agentCount: 45,
      topAgents: ['DataMiner Pro', 'WebScraper AI', 'Analytics Bot'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      growth: '+12%',
      image: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      description: 'Generate high-quality content, copy, and creative materials',
      icon: <PenTool className="w-8 h-8" />,
      agentCount: 32,
      topAgents: ['ContentCraft AI', 'CopyWriter Pro', 'Blog Generator'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      growth: '+18%',
      image: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    },
    {
      id: 'automation',
      name: 'Workflow Automation',
      description: 'Automate repetitive tasks and streamline business processes',
      icon: <Zap className="w-8 h-8" />,
      agentCount: 28,
      topAgents: ['TaskBot Assistant', 'FlowMaster', 'AutoPilot'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      growth: '+15%',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      description: 'Enhance customer support with intelligent chatbots and assistants',
      icon: <MessageSquare className="w-8 h-8" />,
      agentCount: 19,
      topAgents: ['ChatBot Pro', 'Support AI', 'HelpDesk Bot'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      growth: '+22%',
      image: 'https://images.pexels.com/photos/4792715/pexels-photo-4792715.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      description: 'Boost your marketing efforts with AI-powered tools and insights',
      icon: <Target className="w-8 h-8" />,
      agentCount: 24,
      topAgents: ['MarketBot', 'SEO Assistant', 'Ad Optimizer'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      growth: '+20%',
      image: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    },
    {
      id: 'analytics',
      name: 'Business Analytics',
      description: 'Gain insights and make data-driven decisions with advanced analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      agentCount: 16,
      topAgents: ['Analytics Pro', 'Insight Engine', 'Report Builder'],
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      growth: '+8%',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
    }
  ];

  const stats = [
    { label: 'Total Categories', value: '6', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Total Agents', value: '164', icon: <Bot className="w-5 h-5" /> },
    { label: 'Active Users', value: '12.5K', icon: <Users className="w-5 h-5" /> },
    { label: 'Growth Rate', value: '+16%', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const trendingCategories = categories
    .sort((a, b) => parseFloat(b.growth) - parseFloat(a.growth))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="primary" className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Categories
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Find the Perfect AI Agent
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Browse our comprehensive collection of AI agents organized by category. 
              From data processing to customer service, find the right solution for your needs.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-center mb-2 text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trending Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Trending Categories
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                The fastest-growing categories this month
              </p>
            </div>
            <Badge variant="success" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <TrendingUp className="w-4 h-4 mr-1" />
              Hot
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card hover className="overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="success" size="sm" className="bg-green-500 text-white">
                        {category.growth}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                      {category.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {category.agentCount} agents
                      </span>
                      <Link to={`/marketplace?category=${category.id}`}>
                        <Button size="sm">
                          Explore
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              All Categories
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Explore our complete collection of AI agent categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card hover className="h-full">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {category.agentCount}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          agents
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {category.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Popular Agents:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.topAgents.map((agent, agentIndex) => (
                          <Badge key={agentIndex} variant="neutral" size="sm">
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {category.growth} growth
                        </span>
                      </div>
                      <Link to={`/marketplace?category=${category.id}`}>
                        <Button variant="outline">
                          Browse
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <div className="p-8 sm:p-12 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our community of developers and create your own AI agent. 
                Share your innovation with thousands of users worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create-agent">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-slate-100"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Create Your Agent
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Browse All Agents
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;