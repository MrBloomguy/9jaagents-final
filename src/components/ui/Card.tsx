import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  glass = false
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const cardClasses = glass
    ? 'glass-effect glass-border'
    : 'bg-white dark:bg-dark-100 border border-neutral-200 dark:border-neutral-700 shadow-sm';

  return (
    <motion.div
      className={clsx(
        baseClasses,
        cardClasses,
        paddingClasses[padding],
        hover && 'hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-400/10',
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;