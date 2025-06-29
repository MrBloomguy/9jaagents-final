import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  TrendingUp,
  Users,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    sales_count: number;
    image_url: string;
    category: string;
    tags: string[];
    creator?: {
      full_name: string;
      avatar_url: string;
    };
    demo_url?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showCreator?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  variant = 'default',
  showCreator = true 
}) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group"
      >
        <Link to={`/agent/${agent.id}`}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700">
            {/* Header Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={agent.image_url}
                alt={agent.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Top Actions */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex gap-2">
                  {agent.tags.slice(0, 2).map((tag, index) => (
                    <Badge 
                      key={index}
                      variant={tag === 'Popular' ? 'primary' : tag === 'New' ? 'success' : 'warning'}
                      size="sm"
                      className="backdrop-blur-sm bg-white/90 dark:bg-slate-800/90"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <button
                  onClick={handleWishlist}
                  className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-slate-600 dark:text-slate-400'}`} />
                </button>
              </div>

              {/* Demo Button */}
              {agent.demo_url && (
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Creator Info */}
              {showCreator && agent.creator && (
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={agent.creator.avatar_url}
                    alt={agent.creator.full_name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {agent.creator.full_name}
                  </span>
                </div>
              )}

              {/* Title & Category */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {agent.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {agent.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                    <Users className="w-3 h-3" />
                    <span className="text-xs">
                      {agent.sales_count.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Badge variant="neutral" size="sm" className="bg-slate-100 dark:bg-slate-700">
                  {agent.category}
                </Badge>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ₦{agent.price}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                    one-time
                  </span>
                </div>
                
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group"
      >
        <Link to={`/agent/${agent.id}`}>
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-slate-100 dark:border-slate-700 relative">
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="primary" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>

            {/* Header Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={agent.image_url}
                alt={agent.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-white'}`} />
              </button>

              {/* Bottom Stats */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{agent.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{agent.sales_count}</span>
                    </div>
                  </div>
                  
                  {agent.demo_url && (
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900">
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Creator */}
              {showCreator && agent.creator && (
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={agent.creator.avatar_url}
                    alt={agent.creator.full_name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {agent.creator.full_name}
                    </span>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Verified Creator
                    </div>
                  </div>
                </div>
              )}

              {/* Title & Description */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {agent.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, index) => (
                  <Badge key={index} variant="neutral" size="sm" className="bg-slate-100 dark:bg-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₦{agent.price}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                    one-time purchase
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant - Mobile Optimized
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/agent/${agent.id}`}>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
          {/* Image */}
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={agent.image_url}
              alt={agent.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Tags */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
              {agent.tags.slice(0, 2).map((tag, index) => (
                <Badge 
                  key={index}
                  variant={tag === 'Popular' ? 'primary' : tag === 'New' ? 'success' : 'warning'}
                  size="sm"
                  className="backdrop-blur-sm bg-white/90 dark:bg-slate-800/90 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-slate-600 dark:text-slate-400'}`} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white line-clamp-1 flex-1 mr-2">
                {agent.name}
              </h3>
              <Badge variant="neutral" size="sm" className="text-xs flex-shrink-0">
                {agent.category}
              </Badge>
            </div>
            
            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
              {agent.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white ml-1">
                    {agent.rating}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {agent.sales_count.toLocaleString()} sales
                </span>
              </div>
            </div>
            
            {/* Price & Action */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                  ₦{agent.price}
                </span>
              </div>
              <div className="flex space-x-1 sm:space-x-2">
                <Button size="sm" variant="outline" className="text-xs px-2 sm:px-3">
                  View
                </Button>
                <Button size="sm" className="text-xs px-2 sm:px-3">
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AgentCard;