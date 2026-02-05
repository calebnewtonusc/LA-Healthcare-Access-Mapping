import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover-glow' | 'gradient-border';
  className?: string;
  animate?: boolean;
}

export function GlassCard({
  children,
  variant = 'default',
  className = '',
  animate = true
}: GlassCardProps) {
  const baseClasses = 'bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass';

  const variantClasses = {
    'default': '',
    'hover-glow': 'hover:bg-white/10 hover:border-neon-cyan/50 transition-all duration-300',
    'gradient-border': 'relative group'
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...(animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      } : {})}
    >
      {variant === 'gradient-border' && (
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-2xl blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
      )}
      {children}
    </Component>
  );
}
