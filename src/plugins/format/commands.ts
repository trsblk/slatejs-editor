import { Editor, Transforms, Element, NodeEntry } from 'slate';

import { Utils } from './utils';
import { ElementTypes } from '../../types/elements';
import { HeadingType } from '../../types/types';

export const Commands = {
  toggleBoldMark(editor: Editor) {
    const isActive = Utils.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  toggleItalicMark(editor: Editor) {
    const isActive = Utils.isItalicMarkActive(editor);

    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = Utils.isCodeBlockActive(editor);
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

  toggleParagraphBlock(editor: Editor) {
    const isParagraphBlock = Utils.isParagraphBlockActive(editor);

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

      Commands.moveParagraphToNewPathAfterList(editor, listNodeEntry);
    }
  },

  moveParagraphToNewPathAfterList(editor: Editor, listNodeEntry: NodeEntry) {
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
  },
};
