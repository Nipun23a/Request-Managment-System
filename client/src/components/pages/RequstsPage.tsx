import React, { useState, useEffect, useCallback } from 'react';
import { RequestTable } from '../organisms/RequestTable';
import { RequestData } from '../../types/RequestTpes';
import axios from 'axios';
import { SearchInput } from '../molecules/SearchInput';
import { DateRangePicker } from '../molecules/DateRangePicker';
import { Dropdown } from '../molecules/Dropdown';
import { Button } from '../atoms/TableButton';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../../utils/api';

export const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    priority: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  const statusOptions = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'ESCALATED', 'ON_HOLD'];
  const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'NORMAL', 'EMERGENCY'];

  const fetchRequests = useCallback(async () => {
    console.log('Fetching requests from:', getApiUrl('/api/requests'));
    try {
      const response = await axios.get(getApiUrl('/api/requests'), {
        withCredentials: true, // Include this if you're using cookies for authentication
      });
      console.log('Received response:', response.data);
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data, error.response?.status, error.response?.headers);
        setError(`Failed to fetch requests: ${error.response?.data?.message || error.message}`);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setLoading(false);
    }
  }, []);
  // Filtering logic
  const applyFilters = useCallback(() => {
    setIsSearching(true);
    let result = requests;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(request =>
        request.requestId.toLowerCase().includes(searchLower) ||
        request.service.toLowerCase().includes(searchLower) ||
        request.department.toLowerCase().includes(searchLower) ||
        request.requestedBy.toLowerCase().includes(searchLower) ||
        request.assignedTo.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      result = result.filter(request => request.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter(request => request.priority === filters.priority);
    }

    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      result = result.filter(request => {
        const requestDate = new Date(request.createdOn);
        return requestDate >= start && requestDate <= end;
      });
    }

    setFilteredRequests(result);
    setIsSearching(false);
  }, [requests, filters]);

  // Re-apply filters on filter change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleStatusSelect = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handlePrioritySelect = (priority: string) => {
    setFilters(prev => ({ ...prev, priority }));
  };

  const handleDateRangeChange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setFilters(prev => ({ ...prev, startDate, endDate }));
  };

  const handleUpdateRequest = async (updatedRequest: RequestData) => {
    console.log('Updating request:', updatedRequest);
    try {
      const response = await axios.put(getApiUrl(`/api/requests/${updatedRequest._id}`), updatedRequest, {
        withCredentials: true, // Include if you're using cookies for authentication
      });
      console.log('Update response:', response.data);
      const updatedRequests = requests.map(req => (req._id === updatedRequest._id ? response.data : req));
      setRequests(updatedRequests);
      applyFilters();
    } catch (error) {
      console.error('Error updating request:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data, error.response?.status, error.response?.headers);
        // You might want to show an error message to the user here
        // setError(`Failed to update request: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        // setError('An unexpected error occurred while updating the request.');
      }
    }
  };
   
  const handleDeleteRequest = async (deleteRequest: RequestData) => {
    console.log('Deleting request:', deleteRequest);
    try {
      const response = await axios.delete(getApiUrl(`/api/requests/${deleteRequest._id}`), {
        withCredentials: true, // Include if you're using cookies for authentication
      });
      console.log('Delete response:', response.data);
      await fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data, error.response?.status, error.response?.headers);
        // You might want to show an error message to the user here
        // setError(`Failed to delete request: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        // setError('An unexpected error occurred while deleting the request.');
      }
    }
  };

  // Fetch requests on initial load
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="loading-spinner" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex-grow min-w-[200px]">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="flex-grow min-w-[200px]">
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
        <div className="flex-grow min-w-[150px]">
          <Dropdown label="Status" options={statusOptions} onSelect={handleStatusSelect} />
        </div>
        <div className="flex-grow min-w-[150px]">
          <Dropdown label="Priority" options={priorityOptions} onSelect={handlePrioritySelect} />
        </div>
        <div className="flex space-x-2">
          <Button>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </Button>
          <Button>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-2 text-blue-500"
          >
            Searching...
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={false}
        animate={{ opacity: isSearching ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {filteredRequests.length > 0 ? (
          <RequestTable
            data={filteredRequests}
            onUpdateRequest={handleUpdateRequest}
            onDeleteRequest={handleDeleteRequest}
          />
        ) : (
          <div className="text-center py-4">No requests found.</div>
        )}
      </motion.div>
    </div>
  );
};
