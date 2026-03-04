import useSWR from 'swr';
import { getDocuments } from '../api/utils';
import { Link, NavLink } from 'react-router';

const DocumentsList = () => {
  // Load documents
  const { data, error, isLoading } = useSWR('/api/documents', getDocuments);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <div>loading documents...</div>;

  return (
    <div>
      <p>Documents:</p>
      <ul>
        {data &&
          data.map(({ uuid }) => (
            <li key={uuid}>
              <NavLink to={uuid}>{uuid}</NavLink>
            </li>
          ))}
      </ul>
      <Link to={'..'}>Back to home</Link>
    </div>
  );
};

export default DocumentsList;
