import React, { useState } from 'react';
import { Button } from '../atoms/TableButton';

interface DropdownProps {
  label: string;
  options: string[]; // Accepting an array of strings for dropdown options
  onSelect: (option: string) => void; // Callback when an option is selected
}

export const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option); 
    setIsOpen(false); 
  };

  return (
    <div className="relative navigation">
      <Button onClick={toggleDropdown} className="flex items-center">
        {label}
        <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer navigation"
              onClick={() => handleSelect(option)} // Handle option selection
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



