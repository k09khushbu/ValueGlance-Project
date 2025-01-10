// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { FilterState } from '../types/types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>


      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Revenue Range</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            name="minRevenue"
            placeholder="Min"
            value={filters.minRevenue}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="number"
            name="maxRevenue"
            placeholder="Max"
            value={filters.maxRevenue}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Net Income Range</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            name="minNetIncome"
            placeholder="Min"
            value={filters.minNetIncome}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="number"
            name="maxNetIncome"
            placeholder="Max"
            value={filters.maxNetIncome}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
    </div>
  );
};


export default Filters;