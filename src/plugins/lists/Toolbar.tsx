import { ListPluginCommands } from './commands';
import { Editor } from 'slate';

const Toolbar = ({ editor }: { editor: Editor }) => {
  // const editor = useSlate();
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
