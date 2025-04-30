import { useState } from 'react';
import { Contribuable } from '../types/contribTypes';
import { getToken, getContribuableByIfu } from '../services/apiServices';

export const useContribuable = () => {
  const [data, setData] = useState<Contribuable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContribuable = async (ifu: string) => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const token = await getToken();
      const result = await getContribuableByIfu(ifu, token);
      setData(result);
    } catch (err) {
      setError("Erreur lors de la récupération des données",);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchContribuable
  };
};
