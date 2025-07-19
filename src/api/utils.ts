import axios from 'axios';

import { Descendant } from 'slate';

const API_URL = 'http://localhost:3000/api/documents';

export type Document = {
  doc_content: Descendant[];
  uuid: string;
};

export const getDocument = (uuid: string): Promise<Document[]> => {
  return axios.get<Document[]>(`${API_URL}/${uuid}`).then((res) => res.data);
};

export const saveDocument = ({ doc_content, uuid }: Document) => {
  return axios.put(`${API_URL}/${uuid}`, {
    doc_content: JSON.stringify(doc_content),
  });
};

export const getDocuments = () => {
  return axios.get<Document[]>(API_URL).then((res) => res.data);
};
