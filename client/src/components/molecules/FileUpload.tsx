import React from 'react';

export const FileUpload: React.FC = () => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p className="mt-1 text-sm text-gray-600">Browse or drag and drop the file.</p>
      <input type="file" className="hidden" />
    </div>
  </div>
);