import { useState } from 'react';

import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { renderElement, renderLeaf } from '../rendering';
import Toolbar from './Toolbar';
import { handleKeyDownWithEditor } from '../handlers';
import { listsPlugin } from '../plugins/lists';

interface EditorProps {
  initialValue: Descendant[];
  documentId: string;
}

const Editor = ({ initialValue, documentId }: EditorProps) => {
  // Creating editor object that containt all content, selections, marks, etc.
  const [editor] = useState(() =>
    listsPlugin.withLists(withReact(createEditor()))
  );

  const handleKeyDown = handleKeyDownWithEditor(editor);
  // const handleChange = (value: Descendant[]) => {
  //   const isAstChange = editor.operations.some(
  //     (op) => 'set_selection' !== op.type
  //   );

  //   if (isAstChange) {
  //     const content = JSON.stringify(value);
  //     localStorage.setItem('content', content);
  //   }
  // };

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={() => {}}>
      <Toolbar documentId={documentId} />
      <Editable
        onKeyDown={handleKeyDown}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className='main-editable'
      />
    </Slate>
  );
};

export default Editor;
