import { Editor } from 'slate';

import { insertCheckList } from './commands';
import { Button } from 'antd';

export const Toolbar = ({ editor }: { editor: Editor }) => {
  const handleInsertChecklist = () => {
    // console.log(editor.selection);

    insertCheckList(editor);
  };

  return (
    <Button type='primary' onClick={handleInsertChecklist}>
      Insert Checklist
    </Button>
  );
};
