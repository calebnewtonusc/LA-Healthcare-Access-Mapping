import React from 'react';

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'pink' | 'green' | 'high' | 'medium' | 'low';
  className?: string;
}

export function NeonBadge({
  children,
  variant = 'cyan',
  className = ''
}: NeonBadgeProps) {
  const variantClasses = {
    cyan: 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-neon-cyan/20 dark:border-neon-cyan/50 dark:text-neon-cyan',
    purple: 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-neon-purple/20 dark:border-neon-purple/50 dark:text-neon-purple',
    pink: 'bg-pink-100 border-pink-300 text-pink-700 dark:bg-neon-pink/20 dark:border-neon-pink/50 dark:text-neon-pink',
    green: 'bg-green-100 border-green-300 text-green-700 dark:bg-neon-green/20 dark:border-neon-green/50 dark:text-neon-green',
    high: 'bg-red-100 border-red-300 text-red-700 dark:bg-neon-pink/20 dark:border-neon-pink/50 dark:text-neon-pink',
    medium: 'bg-orange-100 border-orange-300 text-orange-700 dark:bg-neon-purple/20 dark:border-neon-purple/50 dark:text-neon-purple',
    low: 'bg-green-100 border-green-300 text-green-700 dark:bg-neon-green/20 dark:border-neon-green/50 dark:text-neon-green'
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-bold border transition-colors duration-300
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
