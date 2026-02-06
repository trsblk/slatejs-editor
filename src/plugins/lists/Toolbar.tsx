import { useSlate } from 'slate-react';

import { ListPluginCommands } from './commands';

const Toolbar = () => {
  const editor = useSlate();
  const handleList = () => {
    const selection = editor.selection;
    if (!selection) {
      return;
    }

    ListPluginCommands.toggleListBlock(editor);
  };

  return <button onClick={handleList}>List</button>;
};

export default Toolbar;
