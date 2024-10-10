import React from 'react';
import { Text } from '../atoms/Text';
import { Navigation } from './Navigation';
import { IconButton } from '../molecules/IconButton';
import { UserInfo } from '../molecules/UserInfo';
import AdminImage from '../../assets/profile-image/admin.jpg';

export const Header: React.FC = () => (
  <header className="bg-[#830823] text-white p-4 border-b">
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center sm:mb-0">
        <Text className="text-[20px] mr-8 title">e-hospital</Text>
      </div>
      <div className='gap-4'>
        <Navigation />
      </div>
      <div className="flex items-center mt-4 sm:mt-0 space-x-4">
        <IconButton icon="moon" />
        <IconButton icon="bell" />
        <hr className="w-px h-6 bg-white opacity-40" />
        <div className='ml-3 space-x-2'>
            <UserInfo name="Admin" avatarSrc={AdminImage}/>
        </div>
      </div>
    </div>
  </header>
);