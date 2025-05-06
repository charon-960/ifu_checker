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
      if (!result) {
        setError("Aucun contribuable trouvé pour cet IFU.");
        return;
      }
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const responseError = (err as { response?: { status: number } }).response;
        if (responseError?.status === 401) {
        setError("Aucun contribuable trouvé pour cet IFU.",);
      } else {
        setError("Erreur lors de la récupération des données.");
      }  
    } else { 
        setError("Erreur inconnue."); 
      }
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
