import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  Users, 
  DollarSign,
  Crown,
  Zap,
  Target,
  Calendar,
  Filter
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year' | 'all'>('month');
  const [category, setCategory] = useState<'all' | 'sales' | 'rating' | 'revenue'>('sales');

  const topAgents = [
    {
      id: 1,
      rank: 1,
      name: 'DataMiner Pro',
      creator: 'TechCorp Solutions',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      agentImage: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      category: 'Data Processing',
      sales: 2847,
      revenue: 85410,
      rating: 4.9,
      reviews: 1247,
      growth: '+23%',
      badge: 'Top Seller',
      isVerified: true
    },
    {
      id: 2,
      rank: 2,
      name: 'ChatBot Pro',
      creator: 'AI Innovations',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      agentImage: 'https://images.pexels.com/photos/4792715/pexels-photo-4792715.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      category: 'Customer Service',
      sales: 2156,
      revenue: 86240,
      rating: 4.9,
      reviews: 892,
      growth: '+18%',
      badge: 'Rising Star',
      isVerified: true
    },
    {
      id: 3,
      rank: 3,
      name: 'ContentCraft AI',
      creator: 'Creative Labs',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      agentImage: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      category: 'Content Creation',
      sales: 1923,
      revenue: 38460,
      rating: 4.8,
      reviews: 654,
      growth: '+15%',
      badge: 'Quality Choice',
      isVerified: true
    },
    {
      id: 4,
      rank: 4,
      name: 'TaskBot Assistant',
      creator: 'Productivity Plus',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      agentImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      category: 'Automation',
      sales: 1654,
      revenue: 26464,
      rating: 4.7,
      reviews: 432,
      growth: '+12%',
      badge: 'Trending',
      isVerified: false
    },
    {
      id: 5,
      rank: 5,
      name: 'AnalyticsBot',
      creator: 'Data Insights Co',
      avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      agentImage: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      category: 'Analytics',
      sales: 1432,
      revenue: 71600,
      rating: 4.8,
      reviews: 321,
      growth: '+8%',
      badge: 'Enterprise',
      isVerified: true
    }
  ];

  const topCreators = [
    {
      id: 1,
      rank: 1,
      name: 'TechCorp Solutions',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      totalSales: 8947,
      totalRevenue: 267410,
      agentsCount: 12,
      avgRating: 4.8,
      isVerified: true,
      badge: 'Top Creator'
    },
    {
      id: 2,
      rank: 2,
      name: 'AI Innovations',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      totalSales: 6234,
      totalRevenue: 198720,
      agentsCount: 8,
      avgRating: 4.7,
      isVerified: true,
      badge: 'Innovation Leader'
    },
    {
      id: 3,
      rank: 3,
      name: 'Creative Labs',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      totalSales: 5123,
      totalRevenue: 153690,
      agentsCount: 15,
      avgRating: 4.6,
      isVerified: true,
      badge: 'Creative Excellence'
    }
  ];

  const stats = [
    {
      label: 'Total Agents',
      value: '2,847',
      icon: <Target className="w-5 h-5" />,
      change: '+12%',
      color: 'text-blue-600'
    },
    {
      label: 'Total Revenue',
      value: '₦2.4M',
      icon: <DollarSign className="w-5 h-5" />,
      change: '+18%',
      color: 'text-green-600'
    },
    {
      label: 'Active Creators',
      value: '1,234',
      icon: <Users className="w-5 h-5" />,
      change: '+8%',
      color: 'text-purple-600'
    },
    {
      label: 'Avg Rating',
      value: '4.8',
      icon: <Star className="w-5 h-5" />,
      change: '+0.2',
      color: 'text-yellow-600'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-slate-600 dark:text-slate-400">#{rank}</span>;
    }
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'Top Seller':
      case 'Top Creator':
        return 'primary';
      case 'Rising Star':
      case 'Innovation Leader':
        return 'success';
      case 'Quality Choice':
      case 'Creative Excellence':
        return 'warning';
      case 'Trending':
        return 'secondary';
      case 'Enterprise':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

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
            <Badge variant="warning" className="mb-4 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Top Performing Agents
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Discover the highest-rated and best-selling AI agents on our platform. 
              See what's trending and find inspiration for your next purchase.
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
                  <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="font-medium text-slate-900 dark:text-white">Filters</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-slate-500" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Metrics</option>
                    <option value="sales">By Sales</option>
                    <option value="rating">By Rating</option>
                    <option value="revenue">By Revenue</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Agents */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Top Agents
              </h2>
              
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className={`p-6 ${agent.rank <= 3 ? 'ring-2 ring-yellow-200 dark:ring-yellow-800' : ''}`}>
                      <div className="flex items-center space-x-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {getRankIcon(agent.rank)}
                        </div>
                        
                        {/* Agent Image */}
                        <img
                          src={agent.agentImage}
                          alt={agent.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        
                        {/* Agent Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                              {agent.name}
                            </h3>
                            {agent.isVerified && (
                              <Badge variant="primary" size="sm">
                                Verified
                              </Badge>
                            )}
                            <Badge variant={getBadgeVariant(agent.badge)} size="sm">
                              {agent.badge}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <img
                              src={agent.avatar}
                              alt={agent.creator}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              by {agent.creator}
                            </span>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {agent.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium text-slate-900 dark:text-white">
                                {agent.rating}
                              </span>
                              <span className="text-slate-500">
                                ({agent.reviews})
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400 font-medium">
                                {agent.growth}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {agent.sales.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            sales
                          </div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            ₦{agent.revenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Top Creators Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Top Creators
              </h2>
              
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: -5 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                          {getRankIcon(creator.rank)}
                        </div>
                        
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                              {creator.name}
                            </h4>
                            {creator.isVerified && (
                              <Badge variant="primary" size="sm">
                                ✓
                              </Badge>
                            )}
                          </div>
                          
                          <Badge variant={getBadgeVariant(creator.badge)} size="sm" className="mb-2">
                            {creator.badge}
                          </Badge>
                          
                          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex justify-between">
                              <span>Agents:</span>
                              <span className="font-medium">{creator.agentsCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sales:</span>
                              <span className="font-medium">{creator.totalSales.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue:</span>
                              <span className="font-medium text-green-600">
                                ₦{creator.totalRevenue.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="font-medium">{creator.avgRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Achievement Badges */}
              <Card className="p-6 mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  Achievement Badges
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Top Seller</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">1000+ sales</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Quality Master</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">4.8+ rating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Rising Star</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Fast growth</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;