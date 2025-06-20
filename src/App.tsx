import { useMemo, useState } from 'react';

import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import Toolbar from './components/Toolbar';

import { renderElement, renderLeaf } from './rendering';
import { handleKeyDownWithEditor } from './handlers';

import './App.css';

// const initialValue: Descendant[] = [
//   {
//     type: 'paragraph',
//     children: [{ text: 'A line of text in a paragraph.' }],
//   },
// ];

function App() {
  // Creating editor object that containt all content, selections, marks, etc.
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content') || '') || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
      ],
    []
  );

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

  console.log(editor);
  return (
    <main>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={handleChange}
      >
        <Toolbar />
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
