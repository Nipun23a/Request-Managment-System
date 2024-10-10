import React from 'react';
import { Text } from '../atoms/Text';
import { count } from 'console';

interface StatusCircleProps {
  count: number;
  label: string;
  color: string;
}

const padCount = (count: number): string => {
    return count.toString().padStart(2,'0');
};

export const StatusCircle: React.FC<StatusCircleProps> = ({ count, label, color }) => (
  <div className={`${color} rounded-full w-[130px] h-[130px] flex flex-col items-center justify-center p-4 text-center`}>
    <Text className="text-3xl font-bold title">{padCount(count)}</Text>
    <Text className="text- mt-1 px-1 navigation text-center circles-font">{label}</Text>
  </div>
);