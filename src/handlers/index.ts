import { Editor, Element, Node } from 'slate';
import { CustomEditor } from '../commands';
import { ElementTypes } from '../types/elements';
import { ListPluginCommands } from '../plugins/lists/commands';

export const handleKeyDownWithEditor = (editor: Editor) => {
  // higher order function to memoize editor object
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const [nodeEntry] = Editor.nodes(editor, {
        match: (n) => (n as Element).type === ElementTypes.LI,
      });

      if (!nodeEntry) {
        return;
      }

      const nodeText = Node.string(nodeEntry[0]);

      if (!nodeText) {
        event.preventDefault();
        ListPluginCommands.unwrapListBlock(editor);
      }
    }

    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case '+':
        // {
        //   // Prevent inserting key
        //   event.preventDefault();

        //   // Check if any currently selected block are code blocks
        //   const [match] = Editor.nodes(editor, {
        //     match: (n) => Element.isElement(n) && n.type === 'code',
        //   });

        //   console.log(match);

        //   // Set the currently selected blocks type to code
        //   Transforms.setNodes(
        //     editor,
        //     { type: match ? 'paragraph' : 'code' },
        //     { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
        //   );
        // }
        // break;

        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;

      // When "B" is pressed, bold the text in the selection.
      case 'b': {
        // event.preventDefault();

        // Editor.addMark(editor, 'bold', true);
        // break;

        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
    }
  };
};
