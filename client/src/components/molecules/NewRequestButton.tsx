import React from 'react';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon'; // Assuming you have an Icon component

export const NewRequestButton: React.FC = () => (
  <Button className="bg-[#830823] text-white hover:bg-[#9a0a2a]">
    <span className="flex items-center navigation">
      <Icon name="plus" className="mr-2" />
      New Request
    </span>
  </Button>
);