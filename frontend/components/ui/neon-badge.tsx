import React from 'react';

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'pink' | 'green' | 'high' | 'medium' | 'low';
  glow?: boolean;
  className?: string;
}

export function NeonBadge({
  children,
  variant = 'cyan',
  glow = true,
  className = ''
}: NeonBadgeProps) {
  const variantClasses = {
    cyan: 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan',
    purple: 'bg-neon-purple/10 border-neon-purple text-neon-purple',
    pink: 'bg-neon-pink/10 border-neon-pink text-neon-pink',
    green: 'bg-neon-green/10 border-neon-green text-neon-green',
    high: 'bg-red-500/10 border-red-500 text-red-400',
    medium: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
    low: 'bg-green-500/10 border-green-500 text-green-400'
  };

  const glowClasses = {
    cyan: 'shadow-neon-cyan',
    purple: 'shadow-neon-purple',
    pink: 'shadow-neon-pink',
    green: 'shadow-[0_0_10px_rgba(57,255,20,0.5)]',
    high: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    medium: 'shadow-[0_0_10px_rgba(234,179,8,0.5)]',
    low: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]'
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-bold border
        ${variantClasses[variant]}
        ${glow ? glowClasses[variant] : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
