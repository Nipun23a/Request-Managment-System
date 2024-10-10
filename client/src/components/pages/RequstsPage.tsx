import React, { useState, useEffect, useCallback } from 'react';
import { RequestTable } from '../organisms/RequestTable';
import { RequestData } from '../../types/RequestTpes';
import axios from 'axios';
import { SearchInput } from '../molecules/SearchInput';
import { DateRangePicker } from '../molecules/DateRangePicker';
import { Dropdown } from '../molecules/Dropdown';
import { Button } from '../atoms/TableButton';
import { motion, AnimatePresence } from 'framer-motion';

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
    endDate: undefined as Date | undefined
  });

  const statusOptions = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'ESCALATED', 'ON_HOLD'];
  const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'NORMAL', 'EMERGENCY'];

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
    try {
      const response = await axios.put(`http://localhost:5000/api/requests/${updatedRequest._id}`, updatedRequest);
      const updatedRequests = requests.map(req => req._id === updatedRequest._id ? response.data : req);
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get<RequestData[]>('http://localhost:5000/api/requests');
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch requests. Please try again later.');
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
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
          <RequestTable data={filteredRequests} onUpdateRequest={handleUpdateRequest} />
        ) : (
          <div className="text-center py-4">No requests found.</div>
        )}
      </motion.div>
    </div>
  );
};