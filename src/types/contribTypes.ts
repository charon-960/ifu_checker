export interface Contribuable {
    type: string;
    nom: string | null;
    telephone: string;
    ifu: string;
    rccm: string;
    raisonSociale: string;
    ville: string | null;
    statutCnf: string;
    identiteGestionnaire: string | null;
    prenom: string | null;
    email: string;
    codeServiceGestion: string;
    libelleServiceGestion: string;
    codeCentre: string;
    libelleCentre: string;
    emailGestionnaire: string | null;
    dateImmatriculation: string | null;
  }
  
  export interface MappedContribuable {
    contImmatr: string;
    contRais: string;
    contNom: string | null;
    contPren: string | null;
    contMail: string;
    contVille: string | null;
    contStatutCnf: string;
    contTel: string;
    contRccm: string;
  }