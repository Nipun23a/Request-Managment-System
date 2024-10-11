import React from 'react';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { RequestData } from '../../types/RequestTpes';

interface TableRowProps {
  data: RequestData;
  index: number;
  onViewEdit: (request: RequestData) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ data, index, onViewEdit }) => (
    <tr className="border-b hover:bg-gray-50 navigation">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{data.requestId}</td>
      <td className="px-4 py-2">{new Date(data.createdOn).toLocaleDateString()}</td>
      <td className="px-4 py-2">{`${data.block} - ${data.floor} - ${data.roomUnit}`}</td>
      <td className="px-4 py-2">{data.service}</td>
      <td className="px-4 py-2">
        <Badge text={data.status} color={getStatusColor(data.status)} />
      </td>
      <td className="px-4 py-2">{data.department}</td>
      <td className="px-4 py-2">{data.requestedBy}</td>
      <td className="px-4 py-2">{data.assignedTo}</td>
      <td className="px-4 py-2">
        <Badge text={data.priority} color={getPriorityColor(data.priority)} />
      </td>
      <td className="px-4 py-2">
        <button onClick={() => onViewEdit(data)} className="text-gray-300 hover:text-blue-800">
          <Icon name="eye" className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );

const getStatusColor = (status: string) => {
  const colors: {[key: string]: string} = {
    'NEW': 'bg-yellow-200 text-yellow-800',
    'IN_PROGRESS': 'bg-green-200 text-green-800',
    'COMPLETED': 'bg-blue-200 text-blue-800',
    'ON_HOLD': 'bg-purple-200 text-purple-800',
    'ESCALATED': 'bg-red-200 text-red-800',
    'DELAYED': 'bg-orange-200 text-orange-800',
  };
  return colors[status] || 'bg-gray-200 text-gray-800';
};

const getPriorityColor = (priority: string) => {
  const colors: {[key: string]: string} = {
    'HIGH': 'bg-red-200 text-red-800',
    'MEDIUM': 'bg-yellow-200 text-yellow-800',
    'LOW': 'bg-green-200 text-green-800',
    'NORMAL': 'bg-blue-200 text-blue-800',
    'EMERGENCY': 'bg-purple-200 text-purple-800',
  };
  return colors[priority] || 'bg-gray-200 text-gray-800';
};