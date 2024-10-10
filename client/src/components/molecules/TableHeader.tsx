import React from 'react';

export const TableHeader: React.FC = () => (
  <thead className="bg-yellow-600 text-white rounded-lg navigation">
    <tr>
      <th className="px-4 py-2">SL No</th>
      <th className="px-4 py-2">Request ID</th>
      <th className="px-4 py-2">Created on</th>
      <th className="px-4 py-2">Location</th>
      <th className="px-4 py-2">Service</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Department</th>
      <th className="px-4 py-2">Requested by</th>
      <th className="px-4 py-2">Assigned to</th>
      <th className="px-4 py-2">Priority</th>
      <th className="px-4 py-2"></th>
    </tr>
  </thead>
);