import React from 'react';

interface CircleProps {
  color: string;
  children: React.ReactNode;
}

export const Circle: React.FC<CircleProps> = ({ color, children }) => (
  <div className={`rounded-full w-20 h-20 flex items-center justify-center ${color}`}>
    {children}
  </div>
);