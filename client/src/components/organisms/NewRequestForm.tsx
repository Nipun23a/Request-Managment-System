import React from 'react';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/FormButton';
import { FileUpload } from '../molecules/FileUpload';

export const NewRequestForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select label="Floor" options={['1st Floor', '2nd Floor']} required />
        <Select label="Room / Unit" options={['Room 101', 'Room 102']} required />
      </div>
      <Select label="Block" options={['Block A', 'Block B']} required />
      <Select label="Guest Name" options={['John Doe', 'Jane Smith']} />
      <Input label="Phone Number" type="tel" placeholder="Enter Phone Number" />
      <Select label="Service" options={['Cleaning', 'Maintenance']} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Department" options={['Housekeeping', 'Engineering']} />
        <Select label="Priority" options={['Low', 'Medium', 'High']} />
      </div>
      <FileUpload />
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </div>
    </form>
  );
};