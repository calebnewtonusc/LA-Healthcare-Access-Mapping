'use client';

import React from 'react';
import CountUp from 'react-countup';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = ''
}: AnimatedNumberProps) {
  return (
    <CountUp
      end={value}
      duration={duration}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      separator={separator}
      className={className}
      enableScrollSpy
      scrollSpyOnce
    />
  );
}
