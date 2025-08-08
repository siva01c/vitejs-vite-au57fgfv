import { useState, useEffect } from 'react';

interface UseApiSearchOptions<T> {
  apiFunction: (query?: string) => Promise<T>;
  debounceMs?: number;
}

interface UseApiSearchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function useApiSearch<T>({ 
  apiFunction, 
  debounceMs = 300 
}: UseApiSearchOptions<T>): UseApiSearchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Search-triggered fetch with debouncing
  useEffect(() => {
    if (!searchQuery) return;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(searchQuery);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, apiFunction, debounceMs]);

  // Initial data fetch on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction();
        setData(result);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
    searchQuery,
    setSearchQuery
  };
}