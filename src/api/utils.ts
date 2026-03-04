import axios from 'axios';

import { Descendant } from 'slate';

const API_URL = 'http://localhost:3000';

export type Document = {
  content: Descendant[];
  uuid: string;
};

export const getDocument = (url: string) => {
  return axios.get<Document>(`${API_URL}${url}`).then((res) => res.data);
};

export const saveDocument = (
  url: string,
  { arg }: { arg: Pick<Document, 'content'> },
) => {
  return axios.put(`${API_URL}${url}`, {
    content: JSON.stringify(arg.content),
  });
};

export const getDocuments = (url: string) => {
  return axios.get<Document[]>(`${API_URL}${url}`).then((res) => res.data);
};
