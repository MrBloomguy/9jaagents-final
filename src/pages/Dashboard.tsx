import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star,
  ShoppingCart,
  Eye,
  Plus,
  Calendar,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface Agent {
  id: string;
  name: string;
  status: string;
  sales_count: number;
  price: number;
  rating: number;
  image_url: string;
  created_at: string;
}

interface Purchase {
  id: string;
  amount: number;
  created_at: string;
  status: string;
  agents: {
    name: string;
    image_url: string;
  };
}

interface DashboardStats {
  totalAgents: number;
  totalSales: number;
  totalRevenue: number;
  avgRating: number;
  totalViews: number;
  recentAgents: Agent[];
  recentPurchases: Purchase[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 0,
    totalSales: 0,
    totalRevenue: 0,
    avgRating: 0,
    totalViews: 0,
    recentAgents: [],
    recentPurchases: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch user's agents
      const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (agentsError) {
        console.error('Error fetching agents:', agentsError);
      }

      // Fetch user's purchases
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select(`
          *,
          agents (
            name,
            image_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (purchasesError) {
        console.error('Error fetching purchases:', purchasesError);
      }

      // Calculate stats
      const userAgents = agents || [];
      const userPurchases = purchases || [];
      
      const totalSales = userAgents.reduce((sum, agent) => sum + (agent.sales_count || 0), 0);
      const totalRevenue = userAgents.reduce((sum, agent) => sum + ((agent.sales_count || 0) * agent.price), 0);
      const avgRating = userAgents.length > 0 
        ? userAgents.reduce((sum, agent) => sum + (agent.rating || 0), 0) / userAgents.length 
        : 0;

      setStats({
        totalAgents: userAgents.length,
        totalSales,
        totalRevenue,
        avgRating: Math.round(avgRating * 10) / 10,
        totalViews: userAgents.reduce((sum, agent) => sum + (agent.sales_count || 0) * 10, 0), // Estimate views
        recentAgents: userAgents.slice(0, 5),
        recentPurchases: userPurchases
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: 'Total Agents',
      value: stats.totalAgents.toString(),
      change: '+0 this month',
      icon: <Bot className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toString(),
      change: '+0 this month',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Revenue',
      value: `₦${stats.totalRevenue.toFixed(2)}`,
      change: '+₦0 this month',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating > 0 ? stats.avgRating.toString() : '0.0',
      change: '+0 this month',
      icon: <Star className="w-5 h-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Here's what's happening with your AI agents today.
                </p>
              </div>
              <Link to="/create-agent">
                <Button className="mt-4 sm:mt-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Agent
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`p-6 ${stat.bgColor} border-0`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Agents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  My Agents
                </h3>
                <Link to="/create-agent">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    New Agent
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {stats.recentAgents.length > 0 ? (
                  stats.recentAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={agent.image_url}
                          alt={agent.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {agent.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={agent.status === 'active' ? 'success' : agent.status === 'pending' ? 'warning' : 'error'}
                              size="sm"
                            >
                              {agent.status}
                            </Badge>
                            {agent.rating > 0 && (
                              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                                {agent.rating}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          ₦{((agent.sales_count || 0) * agent.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {agent.sales_count || 0} sales
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bot className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      No agents yet
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Create your first AI agent to get started.
                    </p>
                    <Link to="/create-agent">
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Agent
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Purchases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recent Purchases
                </h3>
                <Link to="/marketplace">
                  <Button variant="ghost" size="sm">
                    Browse More
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {stats.recentPurchases.length > 0 ? (
                  stats.recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={purchase.agents.image_url}
                          alt={purchase.agents.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {purchase.agents.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          ₦{purchase.amount}
                        </p>
                        <Badge variant="success" size="sm">
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      No purchases yet
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Explore our marketplace to find amazing AI agents.
                    </p>
                    <Link to="/marketplace">
                      <Button>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Browse Marketplace
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/create-agent">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Plus className="w-6 h-6 mb-2" />
                  Create Agent
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <ShoppingCart className="w-6 h-6 mb-2" />
                  Browse Marketplace
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  View Leaderboard
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  Account Settings
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;