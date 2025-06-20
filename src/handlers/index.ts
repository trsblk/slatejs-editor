import { Editor } from 'slate';
import { CustomEditor } from '../commands';

export const handleKeyDownWithEditor = (editor: Editor) => {
  // higher order function to memoize editor object
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
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
