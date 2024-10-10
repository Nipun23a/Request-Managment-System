import React from 'react';
import { Text } from '../atoms/Text';
import { StatusCircle } from '../molecules/StatusCircle';
import { NewRequestButton } from '../molecules/NewRequestButton';

export const RequestSummary: React.FC = () => (
  <div className='flex flex-col lg:flex-row justify-between items-center p-4 space-y-6 lg:space-y-0 lg:space-x-8'>
    <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:w-auto">
      <Text className="text-2xl font-bold navigation whitespace-nowrap">Requests</Text>
      <NewRequestButton />
    </div>
    <div className='circle-section flex flex-wrap justify-center lg:justify-end gap-4'>
      <StatusCircle count={10} label="New Requests" color="bg-pink-200" />
      <StatusCircle count={5} label="Delayed Requests" color="bg-green-200" />
      <StatusCircle count={2} label="Escalated Requests" color="bg-blue-200" />
      <StatusCircle count={0} label="On Hold Requests" color="bg-purple-200" />
    </div>
  </div>
);