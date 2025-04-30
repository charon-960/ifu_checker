import { useState } from 'react';
import { Contribuable, MappedContribuable } from '@/types/contribTypes';
import { getKeycloackToken, updateContribuable } from '@/services/apiServices';

export const useUpdateContribuable = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [success, setSuccess] = useState(false);

  const sendUpdate = async (contribuable: Contribuable) => {
    setUpdateLoading(true);
    setUpdateError('');
    setSuccess(false);

    try {
      const mapped: MappedContribuable = {
        contImmatr: contribuable.ifu,
        contRais: contribuable.raisonSociale,
        contNom: contribuable.nom ?? '',
        contPren: contribuable.prenom ?? '',
        contMail: contribuable.email ?? '',
        contVille: contribuable.ville ?? '',
        contStatutCnf: contribuable.statutCnf ?? '',
        contTel: contribuable.telephone ?? '',
        contRccm: contribuable.rccm ?? '',
      };
      const tokenKeycloak = await getKeycloackToken();
      await updateContribuable([mapped], tokenKeycloak);
      setSuccess(true);
    } catch (e) {
      setUpdateError("Échec de la mise à jour.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    sendUpdate,
    updateLoading,
    updateError,
    success,
  };
};
