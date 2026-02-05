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
    cyan: 'bg-blue-100 border-blue-300 text-blue-700',
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    pink: 'bg-pink-100 border-pink-300 text-pink-700',
    green: 'bg-green-100 border-green-300 text-green-700',
    high: 'bg-red-100 border-red-300 text-red-700',
    medium: 'bg-orange-100 border-orange-300 text-orange-700',
    low: 'bg-green-100 border-green-300 text-green-700'
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-bold border
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
