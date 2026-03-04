import { Link, Routes } from 'react-router';
import { Route } from 'react-router';

import DocumentsList from './components/DocumentsList';
import Editor from './components/Editor';

import './App.scss';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <h3>home page</h3>
            <Link to={'/documents'}>Documents</Link>
          </>
        }
      />

      <Route path='documents'>
        <Route index element={<DocumentsList />} />
        <Route path=':id' element={<Editor />} />
        <Route path=':id/edit' element={<p>Edit doc</p>} />
      </Route>
    </Routes>
  );
}

export default App;
