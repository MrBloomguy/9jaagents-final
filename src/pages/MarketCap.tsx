import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Activity,
  Users,
  Bot,
  Star,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Cell, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const MarketCap: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d' | '1y'>('30d');
  const [category, setCategory] = useState<'all' | 'data' | 'content' | 'automation'>('all');

  const marketStats = [
    {
      label: 'Total Market Cap',
      value: '₦2.4B',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-5 h-5" />,
      description: 'Total value of all AI agents'
    },
    {
      label: 'Total Volume (24h)',
      value: '₦45.2M',
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: <Activity className="w-5 h-5" />,
      description: 'Trading volume in last 24 hours'
    },
    {
      label: 'Active Agents',
      value: '2,847',
      change: '+156',
      changeType: 'positive' as const,
      icon: <Bot className="w-5 h-5" />,
      description: 'Currently active AI agents'
    },
    {
      label: 'Market Growth',
      value: '+23.4%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Month over month growth'
    }
  ];

  const topPerformers = [
    {
      id: 1,
      name: 'DataMiner Pro',
      category: 'Data Processing',
      price: 29.99,
      marketCap: 37485000,
      change24h: 15.2,
      volume24h: 2340000,
      holders: 1247,
      image: 'https://images.pexels.com/photos/5083491/pexels-photo-5083491.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 2,
      name: 'ChatBot Pro',
      category: 'Customer Service',
      price: 39.99,
      marketCap: 86240000,
      change24h: 12.8,
      volume24h: 4560000,
      holders: 2156,
      image: 'https://images.pexels.com/photos/4792715/pexels-photo-4792715.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 3,
      name: 'ContentCraft AI',
      category: 'Content Creation',
      price: 19.99,
      marketCap: 17840000,
      change24h: -3.2,
      volume24h: 890000,
      holders: 892,
      image: 'https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 4,
      name: 'TaskBot Assistant',
      category: 'Automation',
      price: 15.99,
      marketCap: 10460000,
      change24h: 8.7,
      volume24h: 654000,
      holders: 654,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      id: 5,
      name: 'AnalyticsBot',
      category: 'Analytics',
      price: 49.99,
      marketCap: 54450000,
      change24h: 6.1,
      volume24h: 1890000,
      holders: 1089,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  const chartData = [
    { name: 'Jan', value: 1200, volume: 450 },
    { name: 'Feb', value: 1350, volume: 520 },
    { name: 'Mar', value: 1180, volume: 480 },
    { name: 'Apr', value: 1580, volume: 680 },
    { name: 'May', value: 1750, volume: 720 },
    { name: 'Jun', value: 1920, volume: 850 },
    { name: 'Jul', value: 2100, volume: 920 },
    { name: 'Aug', value: 2280, volume: 1050 },
    { name: 'Sep', value: 2150, volume: 980 },
    { name: 'Oct', value: 2350, volume: 1120 },
    { name: 'Nov', value: 2280, volume: 1080 },
    { name: 'Dec', value: 2400, volume: 1200 }
  ];

  const categoryData = [
    { name: 'Data Processing', value: 35, color: '#3B82F6' },
    { name: 'Content Creation', value: 25, color: '#8B5CF6' },
    { name: 'Automation', value: 20, color: '#10B981' },
    { name: 'Customer Service', value: 12, color: '#F59E0B' },
    { name: 'Analytics', value: 8, color: '#EF4444' }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `₦${(value / 1000).toFixed(1)}K`;
    }
    return `₦${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
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
            <Badge variant="primary" className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Market Analytics
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              AI Agent Market Cap
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Track the performance and market capitalization of AI agents. 
              Discover trending agents and market insights in real-time.
            </p>
            
            {/* Market Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {marketStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {stat.label}
                  </div>
                  <div className={`text-sm font-medium flex items-center justify-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
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
                <span className="font-medium text-slate-900 dark:text-white">Market Filters</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                    <option value="90d">90 Days</option>
                    <option value="1y">1 Year</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-slate-500" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="data">Data Processing</option>
                    <option value="content">Content Creation</option>
                    <option value="automation">Automation</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Market Cap Trend
                  </h3>
                  <Badge variant="success" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +23.4%
                  </Badge>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" />
                      <YAxis className="text-slate-600 dark:text-slate-400" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgb(30 41 59)', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>

            {/* Top Performers Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Top Performing Agents
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Agent</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Price</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Market Cap</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600 dark:text-slate-400">24h Change</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Volume</th>
                        <th className="text-right py-3 text-sm font-medium text-slate-600 dark:text-slate-400">Holders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPerformers.map((agent, index) => (
                        <tr key={agent.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-slate-500 w-6">#{index + 1}</span>
                              <img
                                src={agent.image}
                                alt={agent.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <div className="font-medium text-slate-900 dark:text-white">{agent.name}</div>
                                <div className="text-sm text-slate-500">{agent.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-4 font-medium text-slate-900 dark:text-white">
                            ₦{agent.price}
                          </td>
                          <td className="text-right py-4 font-medium text-slate-900 dark:text-white">
                            {formatCurrency(agent.marketCap)}
                          </td>
                          <td className="text-right py-4">
                            <div className={`flex items-center justify-end ${
                              agent.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {agent.change24h >= 0 ? (
                                <ArrowUpRight className="w-4 h-4 mr-1" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4 mr-1" />
                              )}
                              {Math.abs(agent.change24h)}%
                            </div>
                          </td>
                          <td className="text-right py-4 text-slate-600 dark:text-slate-400">
                            {formatCurrency(agent.volume24h)}
                          </td>
                          <td className="text-right py-4 text-slate-600 dark:text-slate-400">
                            {formatNumber(agent.holders)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  Market Distribution
                </h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {category.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Market Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6"
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                  Market Insights
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        Bullish Trend
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      AI agent market showing strong growth with 23% increase this month.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        High Activity
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Data processing agents leading in both volume and market cap.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        Global Expansion
                      </span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      Nigerian AI agents gaining international recognition and adoption.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6"
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Button className="w-full" variant="primary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Analytics
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Trading Community
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Create Watchlist
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCap;