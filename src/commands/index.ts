import { Editor, Element, NodeEntry, Transforms } from 'slate';
import { HeadingType } from '../types/types';
import { ElementTypes } from '../types/elements';

export const CustomEditor = {
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

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);

    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : ElementTypes.CODE },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },

  toggleHeadingType({
    editor,
    headingType,
  }: {
    editor: Editor;
    headingType: HeadingType;
  }) {
    Transforms.setNodes(
      editor,
      { type: headingType },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },

  isParagraphBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.type === 'paragraph',
    });

    return !!match;
  },

  toggleParagraphBlock(editor: Editor) {
    const isParagraphBlock = CustomEditor.isParagraphBlockActive(editor);

    if (!isParagraphBlock) {
      // Sets node to paragraph
      Transforms.setNodes(
        editor,
        { type: ElementTypes.PARAGRAPH },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );

      // In case we are inside list
      // Get parent list block to move paragraph element after list path
      const listNodeEntry = Editor.above(editor, {
        match: (n) => Element.isElement(n) && n.type === ElementTypes.UL,
      }) as NodeEntry<Element>;

      if (!listNodeEntry) {
        return;
      }

      moveParagraphToNewPathAfterList(editor, listNodeEntry);
    }
  },
};

const moveParagraphToNewPathAfterList = (
  editor: Editor,
  listNodeEntry: NodeEntry,
) => {
  const [, listPath] = listNodeEntry;
  const newPath = [...listPath];
  newPath[newPath.length - 1] += 1;

  const [paragraphNodeEntry] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === ElementTypes.PARAGRAPH,
  });

  const [, paragraphPath] = paragraphNodeEntry;

  Transforms.moveNodes(editor, {
    at: paragraphPath,
    to: newPath,
  });
};
