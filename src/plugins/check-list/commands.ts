import { Editor, Transforms } from 'slate';
import { createCheckList } from './utils';

export const insertCheckList = (editor: Editor) => {
  Transforms.insertNodes(
    editor,
    createCheckList({ checkListTitle: 'My title' }),
  );
};
