import { Document } from '../api/utils';

interface DocumentsListProps {
  documents: Document[] | undefined;
  selectedDocument: string;
  onSelectDoc: (uuid: string) => void;
}

const DocumentsList = ({
  documents,
  selectedDocument,
  onSelectDoc,
}: DocumentsListProps) => {
  return (
    <>
      <p>Documents list:</p>
      <ul>
        {documents &&
          documents.map(({ uuid }) => (
            <li key={uuid}>
              <button onClick={() => onSelectDoc(uuid)}>{uuid}</button>
              {uuid === selectedDocument && <span> ACTIVE</span>}
            </li>
          ))}
      </ul>
    </>
  );
};

export default DocumentsList;
