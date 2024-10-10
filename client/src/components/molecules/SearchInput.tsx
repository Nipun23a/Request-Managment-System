import React, { useState, useCallback } from 'react';
import { InputWithIcon } from '../atoms/TableInput';
import debounce from 'lodash/debounce';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="relative">
      <InputWithIcon
        iconName="search"
        placeholder="Search by ID, location, service, or requester"
        className="w-full"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};