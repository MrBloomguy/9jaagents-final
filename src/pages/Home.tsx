import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Star, TrendingUp, Users, Zap, Shield, ArrowRight, Play, CheckCircle, Sparkles, Globe, Code, Rocket, Award, Target, BarChart3, Search, ShoppingCart, MessageSquare, Calendar, FileText, Mail, Phone, Camera, Music, Video, Settings, Database, Briefcase, Heart, Lock, Wifi, Cloud, Cpu, Monitor, Headphones, Gamepad2, PenTool, Layers, DollarSign, Activity, TrendingUp as Trending } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AgentCard from '../components/ui/AgentCard';

const Home: React.FC = () => {
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI-Powered Agents',
      description: 'Discover thousands of intelligent agents built for every use case imaginable.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Reliable',
      description: 'All agents are vetted and verified. Your data and transactions are always protected.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Easy Integration',
      description: 'Deploy agents in minutes with our simple API and no-code builder tools.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Driven',
      description: 'Join thousands of developers and businesses building the future of AI automation.',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { 
      label: 'AI Agents', 
      value: '500+', 
      icon: <Bot className="w-3 h-3" />, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconBg: 'bg-blue-500',
      description: 'Active AI agents ready to deploy',
      trend: '+12%'
    },
    { 
      label: 'Active Users', 
      value: '10K+', 
      icon: <Users className="w-3 h-3" />, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconBg: 'bg-green-500',
      description: 'Developers and businesses',
      trend: '+18%'
    },
    { 
      label: 'Revenue', 
      value: '₦2M+', 
      icon: <DollarSign className="w-3 h-3" />, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconBg: 'bg-purple-500',
      description: 'Total marketplace volume',
      trend: '+25%'
    },
    { 
      label: 'Success Rate', 
      value: '99.9%', 
      icon: <Activity className="w-3 h-3" />, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconBg: 'bg-orange-500',
      description: 'Agent deployment success',
      trend: '+0.1%'
    }
  ];

  const agentIcons = [
    { icon: <Bot className="w-4 h-4" />, bg: 'bg-blue-500', name: 'ChatBot Pro', users: '2.4K', growth: '+12%', category: 'Customer Service' },
    { icon: <Briefcase className="w-4 h-4" />, bg: 'bg-green-600', name: 'Business AI', users: '1.8K', growth: '+8%', category: 'Business Analytics' },
    { icon: <Zap className="w-4 h-4" />, bg: 'bg-purple-500', name: 'AutoFlow', users: '3.1K', growth: '+15%', category: 'Workflow Automation' },
    { icon: <Database className="w-4 h-4" />, bg: 'bg-orange-500', name: 'DataMiner', users: '1.2K', growth: '+6%', category: 'Data Processing' },
    { icon: <ShoppingCart className="w-4 h-4" />, bg: 'bg-pink-500', name: 'ShopBot', users: '2.7K', growth: '+18%', category: 'E-commerce' },
    
    { icon: <BarChart3 className="w-4 h-4" />, bg: 'bg-blue-600', name: 'Analytics Pro', users: '1.9K', growth: '+10%', category: 'Business Intelligence' },
    { icon: <Phone className="w-4 h-4" />, bg: 'bg-red-500', name: 'CallCenter AI', users: '1.5K', growth: '+7%', category: 'Customer Support' },
    { icon: <Target className="w-4 h-4" />, bg: 'bg-teal-500', name: 'MarketBot', users: '2.2K', growth: '+14%', category: 'Digital Marketing' },
    { icon: <Mail className="w-4 h-4" />, bg: 'bg-indigo-500', name: 'EmailCraft', users: '3.4K', growth: '+22%', category: 'Email Marketing' },
    { icon: <Settings className="w-4 h-4" />, bg: 'bg-cyan-500', name: 'ConfigBot', users: '987', growth: '+5%', category: 'System Management' },
    
    { icon: <Rocket className="w-4 h-4" />, bg: 'bg-green-500', name: 'LaunchPad', users: '1.6K', growth: '+9%', category: 'Product Launch' },
    { icon: <Globe className="w-4 h-4" />, bg: 'bg-purple-600', name: 'GlobalSync', users: '2.8K', growth: '+16%', category: 'International Business' },
    { icon: <FileText className="w-4 h-4" />, bg: 'bg-yellow-500', name: 'DocuBot', users: '2.1K', growth: '+11%', category: 'Document Processing' },
    { icon: <Calendar className="w-4 h-4" />, bg: 'bg-rose-500', name: 'ScheduleAI', users: '1.7K', growth: '+8%', category: 'Time Management' },
    { icon: <Camera className="w-4 h-4" />, bg: 'bg-emerald-500', name: 'VisionBot', users: '1.3K', growth: '+13%', category: 'Image Recognition' },
    
    { icon: <Music className="w-4 h-4" />, bg: 'bg-violet-500', name: 'AudioCraft', users: '892', growth: '+4%', category: 'Audio Processing' },
    { icon: <Video className="w-4 h-4" />, bg: 'bg-amber-500', name: 'VideoBot', users: '1.4K', growth: '+17%', category: 'Video Editing' },
    { icon: <Heart className="w-4 h-4" />, bg: 'bg-red-400', name: 'HealthAI', users: '2.3K', growth: '+19%', category: 'Healthcare' },
    { icon: <Lock className="w-4 h-4" />, bg: 'bg-slate-600', name: 'SecureBot', users: '1.1K', growth: '+6%', category: 'Security' },
    { icon: <Wifi className="w-4 h-4" />, bg: 'bg-blue-400', name: 'NetworkAI', users: '756', growth: '+3%', category: 'Network Management' },
    
    { icon: <Cloud className="w-4 h-4" />, bg: 'bg-sky-500', name: 'CloudSync', users: '2.9K', growth: '+21%', category: 'Cloud Services' },
    { icon: <Cpu className="w-4 h-4" />, bg: 'bg-orange-600', name: 'ProcessorBot', users: '1.8K', growth: '+12%', category: 'System Optimization' },
    { icon: <Monitor className="w-4 h-4" />, bg: 'bg-gray-600', name: 'DisplayAI', users: '1.2K', growth: '+7%', category: 'UI/UX Design' },
    { icon: <Headphones className="w-4 h-4" />, bg: 'bg-purple-400', name: 'AudioSupport', users: '1.5K', growth: '+9%', category: 'Audio Support' },
    { icon: <Gamepad2 className="w-4 h-4" />, bg: 'bg-green-400', name: 'GameBot', users: '2.6K', growth: '+25%', category: 'Gaming' },
    
    { icon: <PenTool className="w-4 h-4" />, bg: 'bg-pink-400', name: 'DesignAI', users: '3.2K', growth: '+28%', category: 'Graphic Design' },
    { icon: <Layers className="w-4 h-4" />, bg: 'bg-indigo-400', name: 'LayerBot', users: '1.9K', growth: '+11%', category: 'Design Systems' },
    { icon: <MessageSquare className="w-4 h-4" />, bg: 'bg-teal-400', name: 'ChatFlow', users: '4.1K', growth: '+32%', category: 'Communication' }
  ];

  const topAgents = [
    {
      id: '1',
      name: 'DataMiner Pro',
      description: 'Advanced web scraping and data extraction agent with AI-powered insights',
      price: 29.99,
      rating: 4.9,
      sales_count: 1247,
      category: 'Data Processing',
      image_url: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['Popular', 'Trending'],
      creator: {
        full_name: 'TechCorp Solutions',
        avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      demo_url: 'https://demo.dataminer.com'
    },
    {
      id: '2',
      name: 'ContentCraft AI',
      description: 'Generate high-quality content and copy instantly with advanced AI models',
      price: 19.99,
      rating: 4.8,
      sales_count: 892,
      category: 'Content Creation',
      image_url: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['New', 'AI-Powered'],
      creator: {
        full_name: 'Creative Labs',
        avatar_url: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      demo_url: 'https://demo.contentcraft.com'
    },
    {
      id: '3',
      name: 'TaskBot Assistant',
      description: 'Automate repetitive tasks and workflows with intelligent decision making',
      price: 15.99,
      rating: 4.7,
      sales_count: 654,
      category: 'Automation',
      image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['Bestseller'],
      creator: {
        full_name: 'Productivity Plus',
        avatar_url: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
      },
      demo_url: 'https://demo.taskbot.com'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      content: 'The AI agents from 9jaAgents have transformed our workflow. We\'ve automated 80% of our repetitive tasks.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Startup Founder',
      content: 'Building our own AI agents would have taken months. With 9jaAgents, we deployed in days.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'The content generation agents have increased our productivity by 300%. Absolutely game-changing.',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section - Ultra Compact */}
      <section className="relative py-4 sm:py-6 lg:py-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 lg:space-y-4 text-center lg:text-left"
            >
              <Badge 
                variant="success" 
                className="inline-flex bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2.5 py-1 rounded-full font-medium text-xs"
              >
                ₦6 Built for Nigeria
              </Badge>
              
              <div className="space-y-2 lg:space-y-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    AI agents for every business. At every level.
                  </span>
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Discover, hire, and deploy AI agents tailored for Nigerian businesses. 
                  From customer service to sales automation.
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex max-w-md mx-auto lg:mx-0">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for AI agents..."
                    className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs"
                  />
                </div>
                <Button 
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-r-lg rounded-l-none border-l-0 text-xs whitespace-nowrap"
                >
                  Search
                </Button>
              </div>

              {/* Ultra Compact Stats Section */}
              <div className="pt-2">
                {/* Desktop: Ultra compact horizontal layout */}
                <div className="hidden lg:flex items-center justify-center lg:justify-start space-x-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-1 group cursor-pointer"
                    >
                      <div className={`w-5 h-5 ${stat.iconBg} rounded-md flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-none">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile: Horizontal pill-shaped stats */}
                <div className="lg:hidden">
                  <div className="flex space-x-1.5 overflow-x-auto scrollbar-hide pb-1">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex-shrink-0"
                      >
                        <div className={`w-4 h-4 ${stat.iconBg} rounded-full flex items-center justify-center text-white shadow-sm`}>
                          {stat.icon}
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {stat.value}
                          </span>
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {stat.label}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Agent Icons Grid with Mobile Optimization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center relative mt-4 lg:mt-0"
            >
              <div className="grid grid-cols-6 sm:grid-cols-7 gap-1 sm:gap-1.5 max-w-xs sm:max-w-md">
                {agentIcons.map((agent, index) => (
                  <div key={index} className="relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.02 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      onMouseEnter={() => setHoveredAgent(index)}
                      onMouseLeave={() => setHoveredAgent(null)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${agent.bg} rounded-lg flex items-center justify-center text-white transition-all duration-300 cursor-pointer relative`}
                    >
                      {agent.icon}
                    </motion.div>

                    {/* Tooltip - Hidden on mobile, shown on larger screens */}
                    <AnimatePresence>
                      {hoveredAgent === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 hidden sm:block"
                        >
                          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 min-w-[200px]">
                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                              {agent.name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                              {agent.category}
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3 text-blue-500" />
                                <span className="text-slate-700 dark:text-slate-300">{agent.users} users</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                <span className="text-green-600 dark:text-green-400 font-medium">{agent.growth}</span>
                              </div>
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-slate-800"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 sm:mb-6 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <Target className="w-4 h-4 mr-2" />
                Why Choose 9jaAgents
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Built for the Future
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                We're not just another marketplace. We're the platform that's defining how AI agents 
                are discovered, deployed, and monetized in the modern world.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card hover className="text-center h-full p-6 sm:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 sm:mb-16 text-center lg:text-left">
            <div className="mb-6 lg:mb-0">
              <Badge variant="primary" className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                <Award className="w-4 h-4 mr-2" />
                Featured Agents
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Top Performing Agents
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
                Discover the most popular and highly-rated AI agents trusted by thousands of users worldwide.
              </p>
            </div>
            <Link to="/marketplace" className="hidden lg:block">
              <Button variant="outline" className="border-2 border-slate-300 dark:border-slate-600">
                View All Agents
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AgentCard agent={agent} variant="featured" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 lg:hidden">
            <Link to="/marketplace">
              <Button variant="outline" className="border-2 border-slate-300 dark:border-slate-600">
                View All Agents
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="success" className="mb-4 sm:mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <Users className="w-4 h-4 mr-2" />
              Trusted by Thousands
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their workflows with our AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full p-6 sm:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic text-sm sm:text-base">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="neutral" className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30">
              <Globe className="w-4 h-4 mr-2" />
              Join the AI Revolution
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
              Ready to Transform
              <span className="block">Your Business?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of forward-thinking businesses and developers who are already using 
              9jaAgents to automate workflows, boost productivity, and drive unprecedented growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link to="/register">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-slate-100 shadow-2xl hover:shadow-white/25 transition-all duration-300"
                >
                  <Rocket className="mr-3 w-5 h-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/create-agent">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <Code className="mr-3 w-5 h-5" />
                  Create Your Agent
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;