import { Editor } from 'slate';

import { insertCheckList } from './commands';

export const Toolbar = (editor: Editor) => {
  const handleInsertChecklist = () => {
    // console.log(editor.selection);

    insertCheckList(editor);
  };

  return <button onClick={handleInsertChecklist}>Insert Checklist</button>;
};
