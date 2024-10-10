import React from 'react';
import { Header } from '../organisms/Header';
import { RequestSummary } from '../organisms/RequestSummary';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col">
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto">
              <RequestSummary/>
            </div>
          </div>
        </div>
        <main className="flex-grow bg-gray-100">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}