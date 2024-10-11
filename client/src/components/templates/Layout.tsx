import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../organisms/Header';
import { RequestSummary } from '../organisms/RequestSummary';
import { RequestData } from '../../types/RequestTpes'; // Assuming you have a type for request data

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch request data when the component mounts
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