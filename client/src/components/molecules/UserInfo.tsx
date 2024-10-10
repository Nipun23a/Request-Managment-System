import React from 'react';
import { Text } from '../atoms/Text';
import { Avatar } from '../atoms/Avatar';

interface UserInfoProps {
    name : string;
    avatarSrc: string;
}

export const UserInfo : React.FC<UserInfoProps> = ({name,avatarSrc}) => (
    <div className='flex items-center'>
        <Text className='mr-4 navigation'> <span >Welcome</span><br/><span className='font-bold'>{name}</span> </Text>
        <div className='ml-4'></div>
        <Avatar src={avatarSrc} alt={name}/>
    </div>
)