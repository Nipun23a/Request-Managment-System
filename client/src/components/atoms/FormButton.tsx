import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-md navigation ${
      variant === 'primary' ? 'bg-[#830823] text-white' : 'bg-gray-200 text-gray-800'
    } hover:opacity-90 transition-opacity`}
  >
    {children}
  </button>
);