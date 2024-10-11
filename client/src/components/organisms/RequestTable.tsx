import React, { useState } from 'react';
import { TableHeader } from '../molecules/TableHeader';
import { TableRow } from '../molecules/TableRow';
import { UpdateRequestForm } from '../organisms/UpdateRequestForm';
import { RequestData } from '../../types/RequestTpes';

interface RequestTableProps {
  data: RequestData[];
  onUpdateRequest: (updatedRequest: RequestData) => void;
  onDeleteRequest : (delteRequest: RequestData) => void;
}

export const RequestTable: React.FC<RequestTableProps> = ({ data, onUpdateRequest, onDeleteRequest }) => {
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  const handleViewEdit = (request: RequestData) => {
    setSelectedRequest(request);
  };

  const handleCloseForm = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {data.map((row, index) => (
              <TableRow key={row._id} data={row} index={index} onViewEdit={handleViewEdit} />
            ))}
          </tbody>
        </table>
      </div>
      {selectedRequest && (
        <UpdateRequestForm
          request={selectedRequest}
          onClose={handleCloseForm}
          onUpdate={onUpdateRequest}
          onDelete={onDeleteRequest}
        />
      )}
    </div>
  );
};