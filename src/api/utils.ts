import axios, { AxiosResponse } from 'axios';

import { Descendant } from 'slate';

const DATABASE_URL =
  'https://editor-6893b-default-rtdb.europe-west1.firebasedatabase.app/document';

type Document = {
  content: Descendant[];
  savedAt: string;
};

export const getDocument = (): Promise<AxiosResponse<Document>> => {
  return axios.get<Document>(`${DATABASE_URL}.json`);
};

export const saveDocument = (documentContent: Descendant[]) => {
  return axios.put(`${DATABASE_URL}.json`, {
    content: documentContent,
    savedAt: new Date().toLocaleString(),
  });
};
