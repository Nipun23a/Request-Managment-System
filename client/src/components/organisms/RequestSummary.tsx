import React from 'react';
import { Text } from '../atoms/Text';
import { StatusCircle } from '../molecules/StatusCircle';
import { NewRequestButton } from '../molecules/NewRequestButton';

interface RequestSummaryProps {
  newRequestsCount: number;
  delayedRequestsCount: number;
  escalatedRequestsCount: number;
  onHoldRequestsCount: number;
}

export const RequestSummary: React.FC<RequestSummaryProps> = ({
  newRequestsCount,
  delayedRequestsCount,
  escalatedRequestsCount,
  onHoldRequestsCount,
}) => (
  <div className='flex flex-col lg:flex-row justify-between items-center p-4 space-y-6 lg:space-y-0 lg:space-x-8'>
    <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:w-auto">
      <Text className="text-2xl font-bold navigation whitespace-nowrap text-gray-900 dark:text-white transition-colors duration-500 ease-in-out">Requests</Text>
      <NewRequestButton />
    </div>
    <div className='circle-section flex flex-wrap justify-center lg:justify-end gap-4'>
      <StatusCircle count={newRequestsCount} label="New Requests" color="bg-pink-300 dark:bg-pink-700 transition-colors duration-500 ease-in-out " />
      <StatusCircle count={delayedRequestsCount} label="Delayed Requests" color="bg-green-300 dark:bg-green-700 transition-colors duration-500 ease-in-out" />
      <StatusCircle count={escalatedRequestsCount} label="Escalated Requests" color="bg-blue-300 dark:bg-blue-700 transition-colors duration-500 ease-in-out" />
      <StatusCircle count={onHoldRequestsCount} label="On Hold Requests" color="bg-purple-300 dark:bg-purple-700 transition-colors duration-500 ease-in-out" />
    </div>
  </div>
);