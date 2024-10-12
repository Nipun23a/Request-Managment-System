import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Header } from '../organisms/Header';
import { RequestSummary } from '../organisms/RequestSummary';
import { RequestData } from '../../types/RequestTpes'; // Assuming you have a type for request data
import { getApiUrl } from '../../utils/api';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  // Calculate request counts for different statuses
  const newRequestsCount = requests.filter(req => req.status === 'NEW').length;
  const delayedRequestsCount = requests.filter(req => req.status === 'DELAYED').length;
  const escalatedRequestsCount = requests.filter(req => req.status === 'ESCALATED').length;
  const onHoldRequestsCount = requests.filter(req => req.status === 'ON_HOLD').length;

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-grow flex flex-col">
        <div className="bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto">
              <RequestSummary
                newRequestsCount={newRequestsCount}
                delayedRequestsCount={delayedRequestsCount}
                escalatedRequestsCount={escalatedRequestsCount}
                onHoldRequestsCount={onHoldRequestsCount}
                onRequestAdded={fetchRequests}
              />
            </div>
          </div>
        </div>
        <main className="flex-grow bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};