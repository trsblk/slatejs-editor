import { Editor } from 'slate';

const withLists = (editor: Editor) => {
  const { insertBreak } = editor;

  return editor;
};

export default withLists;
