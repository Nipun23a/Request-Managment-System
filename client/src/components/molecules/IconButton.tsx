import React from  'react';
import {Icon} from '../atoms/Icon';

interface IconButtonProps {
    icon : string,
    onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({icon,onClick}) => (
    <button onClick={onClick} className='hover:text-gray-300'>
        <Icon name={icon}/>
    </button>
);