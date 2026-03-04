import { useState } from 'react';

import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { renderElement, renderLeaf } from '../rendering';
import Toolbar from './Toolbar';
import { handleKeyDownWithEditor } from '../handlers';
import { listsPlugin } from '../plugins/lists';
import { Link, useParams } from 'react-router';
import { getDocument } from '../api/utils';
import useSWR from 'swr';

const Editor = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/documents/${id}`,
    getDocument,
  );

  // Creating editor object that containt all content, selections, marks, etc.
  const [editor] = useState(() =>
    listsPlugin.withLists(withReact(createEditor())),
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

  // if (isLoading) return <p>loading</p>;

  if (error) return <p>Error occured.</p>;
  if (isLoading || !data?.content) return <p>Loading content...</p>;

  return (
    <>
      <Slate editor={editor} initialValue={data.content} onChange={() => {}}>
        <Toolbar documentId={id ?? ''} />
        <Editable
          onKeyDown={handleKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className='main-editable'
        />
      </Slate>
      <p>
        <Link to='/'>Back to Home</Link>
      </p>
      <p>
        <Link to='..'>Documents</Link>
      </p>
    </>
  );
};

export default Editor;
