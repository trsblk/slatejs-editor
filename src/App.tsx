import { useState } from 'react';
import useSWR from 'swr';

import Editor from './components/Editor';

import { getDocuments } from './api/utils';

import './App.css';
import DocumentsList from './components/DocumentsList';

function App() {
  // const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState('');

  const { data: documents, error, isLoading } = useSWR('/', getDocuments);

  // Handle selected document and display editor
  const handleSelectDoc = (documentUuid: string) => {
    setSelectedDocument(documentUuid);
  };

  if (error) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return <p>Loading documents</p>;
  }

  return (
    <main>
      <DocumentsList
        documents={documents}
        onSelectDoc={handleSelectDoc}
        selectedDocument={selectedDocument}
      />

      {documents?.map(({ doc_content, uuid }) =>
        uuid === selectedDocument ? (
          <Editor initialValue={doc_content} key={uuid} documentId={uuid} />
        ) : null,
      )}
    </main>
  );
}

export default App;
