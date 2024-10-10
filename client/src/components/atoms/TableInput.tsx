import React from 'react';
import { Icon } from '../atoms/Icon'; // Adjust the path based on your project structure

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconName: string; // Name of the icon to be displayed
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({ iconName, className, ...props }) => (
  <div className="relative">
    <Icon name={iconName} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      {...props}
      className={`border rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} navigation`}
    />
  </div>
);