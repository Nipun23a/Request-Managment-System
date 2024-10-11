import React from 'react';
import { Icon } from '../atoms/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { NewRequestForm } from '../organisms/NewRequestForm';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestAdded: () => void; // New prop for handling refresh
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({ isOpen, onClose, onRequestAdded }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold navigation">Create New Request</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <Icon name="close" />
                </button>
              </div>
              <div className="p-6">
                <NewRequestForm 
                  onClose={onClose} 
                  onRequestAdded={onRequestAdded} // Pass the onRequestAdded prop to NewRequestForm
                />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);