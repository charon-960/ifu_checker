import axios from 'axios';
import { Contribuable, MappedContribuable } from '../types/contribTypes';

const authUrl = 'https://cfisc-backend.impots.bj:443/api/auth/signin';
const dataUrl = '/restapi';
const keycloackUrl = 'https://keycloak-cwb.webbfontaine.am/auth/realms/cwb/protocol/openid-connect/token';
const updateUrl = 'http://localhost:9050/bj-company-service/taxpayers/process';


export const getToken = async (): Promise<string> => {
  const response = await axios.post(authUrl, {
    usernameOrEmail: "api-dgd-maj",
    password: "@O#3345Dgd"
  });
  return response.data.accessToken;
};

export const getContribuableByIfu = async (ifu: string, token: string): Promise<Contribuable | null> => {
  const response = await axios.get(`${dataUrl}?ifu=${ifu}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Uxp-Service': 'BJ/GOV/DGI/CFISC/CNF/1.0',
      'Uxp-Client': 'BJ/GOV/DGD/SYDONIA'
    },
  });

  return response.data.object;
};

export const getKeycloackToken = async (): Promise<string> => {

  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('client_id', 'cwb');
  formData.append('username', 'wf-ccompanydaemon');
  formData.append('password', '1234');
  formData.append('provider', 'daemon');
  formData.append('client_name', 'Daemon Client');

  const response = await axios.post(keycloackUrl, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.accessToken;
};

export const updateContribuable = async (
  payload: MappedContribuable[], tokenKeycloak: string
): Promise<void> => {
  await axios.post(updateUrl, payload, {
    headers: {
      'Authorization': `Bearer ${tokenKeycloak}`
    },
  });
};