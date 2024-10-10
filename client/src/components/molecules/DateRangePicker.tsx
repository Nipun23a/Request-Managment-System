import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../atoms/TableButton';

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined); // Use undefined instead of null
  const [endDate, setEndDate] = useState<Date | undefined>(undefined); // Use undefined instead of null
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined); // Convert null to undefined
    setEndDate(end || undefined); // Convert null to undefined
    onDateRangeChange(start || undefined, end || undefined); // Convert null to undefined
    if (start && end) {
      setShowCalendar(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleCalendar}
        className="bg-white text-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : 'Select Date Range'}
        <svg
          className="w-4 h-4 ml-2 inline-block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </Button>
      {showCalendar && (
        <div className="absolute z-10 mt-2 bg-blue-100 p-4 border border-gray-300 rounded-lg shadow-lg navigation">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            shouldCloseOnSelect={false} // Keeps calendar open after selecting date
          />
        </div>
      )}
    </div>
  );
};
