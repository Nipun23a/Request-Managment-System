import React from 'react';

interface CircleProps {
  color: string;
  children: React.ReactNode;
}

export const Circle: React.FC<CircleProps> = ({ color, children }) => (
  <div className={`rounded-full w-40 h-40 flex items-center justify-center ${color}`}>
    {children}
  </div>
);