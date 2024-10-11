import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { NewRequestModal } from './NewRequestModal';

interface NewRequestButtonProps {
  onRequestAdded: () => void;
}

export const NewRequestButton: React.FC<NewRequestButtonProps> = ({ onRequestAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-[#830823] text-white hover:bg-[#9a0a2a]"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="flex items-center navigation">
          <Icon name="plus" className="mr-2" />
          New Request
        </span>
      </Button>
      <NewRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onRequestAdded={() => {
          onRequestAdded();
          setIsModalOpen(false);
        }}
      />
    </>
  );
};