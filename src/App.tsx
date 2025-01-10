// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FinancialData, FilterState } from './types/types';
import DataTable from './components/DataTable';
import Filters from './components/Filters';

const App: React.FC = () => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [filteredData, setFilteredData] = useState<FinancialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FinancialData | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<APIResponse[]>('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=sWe8tuML64nyoAj7TdlM0vcRzewSmEn4');
        
        const mappedData: FinancialData[] = response.data.map(item => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome
        }));

        setData(mappedData);
        setFilteredData(mappedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=sWe8tuML64nyoAj7TdlM0vcRzewSmEn4');
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    let result = [...data];

    if (filters.startDate) {
      result = result.filter(item => item.date >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(item => item.date <= filters.endDate);
    }
    if (filters.minRevenue) {
      result = result.filter(item => item.revenue >= Number(filters.minRevenue));
    }
    if (filters.maxRevenue) {
      result = result.filter(item => item.revenue <= Number(filters.maxRevenue));
    }
    if (filters.minNetIncome) {
      result = result.filter(item => item.netIncome >= Number(filters.minNetIncome));
    }
    if (filters.maxNetIncome) {
      result = result.filter(item => item.netIncome <= Number(filters.maxNetIncome));
    }

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(result);
  }, [data, filters, sortConfig]);

  const handleSort = (key: keyof FinancialData) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Financial Dashboard</h1>
          <div className="w-full max-w-7xl">
            <Filters filters={filters} onFilterChange={setFilters} />
            <div className="bg-white rounded-lg shadow">
              <DataTable 
                data={filteredData} 
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-white shadow-lg mt-8 py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          Made with <span className="text-red-500">♥</span> by Khushbu Kumari
        </p>
        <a 
          href="https://github.com/k09khushbu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          GitHub Profile
        </a>
      </div>
    </footer>
    </div>
  );
};

export default App;
