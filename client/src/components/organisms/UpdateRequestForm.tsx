import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/FormButton';
import { RequestData } from '../../types/RequestTpes';
import { toast } from 'react-toastify'; // Import toast
import { API_BASE_URL } from '../../utils/api';


interface UpdateRequestFormProps {
  request: RequestData;
  onClose: () => void;
  onUpdate: (updatedRequest: RequestData) => void;
  onDelete: (deleteRequest: RequestData) => void;
}

export const UpdateRequestForm: React.FC<UpdateRequestFormProps> = ({ request, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState<RequestData>(request);
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
      const response = await axios.put(`${API_BASE_URL}/api/requests/${request._id}`, formData);
      onUpdate(response.data);
      toast.success('Request updated successfully');
      onClose();
    } catch (error) {
      // ... error handling ...
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setIsLoading(true);
      setError(null);
      try {
        await axios.delete(`${API_BASE_URL}/api/requests/${request._id}`);
        onDelete(request);
        toast.success('Request deleted successfully');
        onClose();
      } catch (error) {
        // ... error handling ...
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Update Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Floor" name="floor" type="text" required value={formData.floor} onChange={handleChange} />
            <Input label="Room / Unit" name="roomUnit" type="text" required value={formData.roomUnit} onChange={handleChange} />
          </div>
          <Input label="Block" name="block" type="text" required value={formData.block} onChange={handleChange} />
          <Input label="Requested By" name="requestedBy" type="text" required value={formData.requestedBy} onChange={handleChange} />
          <Input label="Phone Number" name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleChange} />
          <Input label="Location" name="location" type="text" required value={formData.location} onChange={handleChange} />
          <Select label="Service" name="service" options={['Cleaning', 'Maintenance', 'Room Service']} required value={formData.service} onChange={handleChange} />
          <Select label="Department" name="department" options={['Housekeeping', 'Engineering', 'Food & Beverage']} required value={formData.department} onChange={handleChange} />
          <Select label="Status" name="status" options={['NEW', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'ESCALATED', 'DELAYED']} required value={formData.status} onChange={handleChange} />
          <Select label="Priority" name="priority" options={['HIGH', 'MEDIUM', 'LOW']} required value={formData.priority} onChange={handleChange} />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={handleDelete} disabled={isLoading}>Delete</Button>
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};