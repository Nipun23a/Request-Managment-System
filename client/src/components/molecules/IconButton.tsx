import React from 'react';
import { Icon } from '../atoms/Icon';

interface IconButtonProps {
    icon: string;
    className?: string;  // Make className optional
    onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, className }) => (
    <button onClick={onClick} className={className}>
        <Icon name={icon} />
    </button>
);