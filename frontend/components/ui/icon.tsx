import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  className?: string;
  animate?: 'float' | 'pulse' | 'none';
  gradient?: boolean;
}

export function Icon({
  icon: IconComponent,
  className = '',
  animate = 'none',
  gradient = false
}: IconProps) {
  const animationClasses = {
    float: 'animate-float',
    pulse: 'animate-pulse',
    none: ''
  };

  const gradientClass = gradient
    ? 'bg-gradient-to-br from-neon-cyan to-neon-purple p-3 rounded-full'
    : '';

  return (
    <div className={`${gradientClass} ${animationClasses[animate]} ${className}`}>
      <IconComponent className={gradient ? 'text-white' : ''} />
    </div>
  );
}
