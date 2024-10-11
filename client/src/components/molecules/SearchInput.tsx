import React, { useState, useEffect } from 'react';
import { InputWithIcon } from '../atoms/TableInput';
import debounce from 'lodash/debounce';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

// Define a type for the debounced function
type DebouncedFunction = {
  (term: string): void;
  cancel: () => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Create a ref to hold the debounced function
  const debouncedSearch = React.useRef<DebouncedFunction | null>(null);

  useEffect(() => {
    // Create the debounced function and assign it to the ref
    debouncedSearch.current = debounce((term: string) => {
      onSearch(term);
    }, 300) as DebouncedFunction; // Cast to DebouncedFunction

    // Cleanup on unmount
    return () => {
      debouncedSearch.current?.cancel(); // Safely call cancel if defined
    };
  }, [onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Call the debounced function
    debouncedSearch.current?.(term);
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
