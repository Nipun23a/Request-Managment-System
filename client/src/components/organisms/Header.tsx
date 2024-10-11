import React from 'react';
import { Text } from '../atoms/Text';
import { Navigation } from './Navigation';
import { IconButton } from '../molecules/IconButton';
import { UserInfo } from '../molecules/UserInfo';
import AdminImage from '../../assets/profile-image/admin.jpg';
import { Icon } from '../atoms/Icon';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-[#830823] dark:bg-gray-800 text-white p-4 border-b transition-all duration-500 ease-in-out">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center sm:mb-0">
          <Text className="text-[20px] mr-8 title transition-colors duration-500 ease-in-out">e-hospital</Text>
        </div>
        <div className='gap-4'>
          <Navigation />
        </div>
        <div className="flex items-center mt-4 sm:mt-0 space-x-4">
          <IconButton
            icon={isDarkMode ? "sun" : "moon"}
            onClick={toggleDarkMode}
            className="transition-all duration-500 ease-in-out transform hover:rotate-12"
          />
          <Icon name='bell' className="transition-colors duration-500 ease-in-out" />
          <hr className="w-px h-6 bg-white opacity-40 transition-opacity duration-500 ease-in-out" />
          <div className='ml-3 space-x-2'>
            <UserInfo name="Admin" avatarSrc={AdminImage} />
          </div>
        </div>
      </div>
    </header>
  );
};