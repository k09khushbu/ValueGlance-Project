// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { FinancialData } from '../types/types';
import { format } from 'date-fns';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface DataTableProps {
  data: FinancialData[];
  sortConfig: {
    key: keyof FinancialData | null;
    direction: 'asc' | 'desc' | null;
  };
  onSort: (key: keyof FinancialData) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, onSort }) => {
  const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };
  
    const columns = [
      { key: 'date', label: 'Date', format: (value: string) => format(new Date(value), 'yyyy-MM-dd') },
      { key: 'revenue', label: 'Revenue', format: formatCurrency },
      { key: 'netIncome', label: 'Net Income', format: formatCurrency },
      { key: 'grossProfit', label: 'Gross Profit', format: formatCurrency },
      { key: 'eps', label: 'EPS', format: (value: number) => value.toFixed(2) },
      { key: 'operatingIncome', label: 'Operating Income', format: formatCurrency }
    ];
  
    if (!data || data.length === 0) {
      return <div className="text-center py-4">No data available</div>;
    }
  
    return (
      <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => onSort(key as keyof FinancialData)}
                    >
                      <div className="flex items-center">
                        {label}
                        {sortConfig.key === key && (
                          sortConfig.direction === 'asc' ? 
                          <ChevronUpIcon className="w-4 h-4 ml-1" /> : 
                          <ChevronDownIcon className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map(({ key, format }) => (
                      <td key={key} className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {format(row[key as keyof FinancialData])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  


export default DataTable;