import { Editor, Element } from 'slate';
import { HeadingType } from '../../types/types';
import { Commands } from './commands';
import { ElementTypes } from '../../types/elements';

export const SELECT_OPTIONS = [
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'p', label: 'Paragraph' },
];

export const Utils = {
  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isParagraphBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'paragraph',
    });

    return !!match;
  },

  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'code',
    });

    return !!match;
  },

  isHeadingType(value: HeadingType | string): value is HeadingType {
    return [ElementTypes.H1, ElementTypes.H2, ElementTypes.H3].includes(
      value as HeadingType,
    );
  },

  toggleBlockType(editor: Editor, blockType: string) {
    const selectedBlockType = blockType;

    if (Utils.isHeadingType(selectedBlockType)) {
      const selectedHeadingType = selectedBlockType;
      Commands.toggleHeadingType({
        editor,
        headingType: selectedHeadingType,
      });
    } else if (selectedBlockType === 'p') {
      Commands.toggleParagraphBlock(editor);
    }
  },
};
