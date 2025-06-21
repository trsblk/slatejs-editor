import { useEffect, useState } from 'react';

import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './components/Toolbar';

import { renderElement, renderLeaf } from './rendering';
import { handleKeyDownWithEditor } from './handlers';
import { getDocument } from './api/utils';

import './App.css';

const initialDocumentValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Start editing...' }],
  },
];

function App() {
  // Creating editor object that containt all content, selections, marks, etc.
  const [editor] = useState(() => withReact(createEditor()));
  const [initialValue, setInitialValue] = useState<Descendant[]>();
  const [savedAt, setSavedAt] = useState('');

  const handleKeyDown = handleKeyDownWithEditor(editor);
  const handleChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );

    if (isAstChange) {
      const content = JSON.stringify(value);
      localStorage.setItem('content', content);
    }
  };

  useEffect(() => {
    getDocument()
      .then(({ data }) => {
        setInitialValue(data.content);
        setSavedAt(data.savedAt);
      })
      .catch((err) => {
        console.log('Could not fetch data:', err.message);
        setInitialValue(initialDocumentValue);
      });
  }, []);

  // Imitate loading state while initial value is not available
  if (!initialValue) return <div>Loading...</div>;

  return (
    <main>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}
      >
        <Toolbar />
        {savedAt && <p>Document last updated at: {savedAt}</p>}

        <Editable
          onKeyDown={handleKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className='main-editable'
        />
      </Slate>
    </main>
  );
}

export default App;
