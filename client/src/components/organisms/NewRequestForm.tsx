import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/FormButton';
import { toast } from 'react-toastify'; // Import toast

interface FormData {
  floor: string;
  roomUnit: string;
  block: string;
  requestedBy: string;
  phoneNumber: string;
  location: string;
  service: string;
  department: string;
}

interface NewRequestFormProps {
  onClose: () => void;
  onRequestAdded: () => void; // New prop for handling refresh
}

export const NewRequestForm: React.FC<NewRequestFormProps> = ({ onClose, onRequestAdded }) => {
  const [formData, setFormData] = useState<FormData>({
    floor: '',
    roomUnit: '',
    block: '',
    requestedBy: '',
    phoneNumber: '',
    location: '',
    service: '',
    department: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/requests', formData);
      console.log('Request created:', response.data);
      onRequestAdded(); // Call the refresh function
      toast.success('Request created successfully');  // Show success toast
      onClose();
    } catch (error) {
      console.error('Error creating request:', error);
      setError('Failed to create request. Please try again.');
      toast.error('Failed to create request');  // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select label="Floor" name="floor" options={['1st Floor', '2nd Floor']} required value={formData.floor} onChange={handleChange} />
        <Input label="Room / Unit" name="roomUnit" type="text" required value={formData.roomUnit} onChange={handleChange} />
      </div>
      <Select label="Block" name="block" options={['Block A', 'Block B']} required value={formData.block} onChange={handleChange} />
      <Input label="Requested By" name="requestedBy" type="text" required value={formData.requestedBy} onChange={handleChange} />
      <Input label="Phone Number" name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleChange} />
      <Input label="Location" name="location" type="text" required value={formData.location} onChange={handleChange} />
      <Select label="Service" name="service" options={['Cleaning', 'Maintenance', 'Room Service']} required value={formData.service} onChange={handleChange} />
      <Select label="Department" name="department" options={['Housekeeping', 'Engineering', 'Food & Beverage']} required value={formData.department} onChange={handleChange} />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
