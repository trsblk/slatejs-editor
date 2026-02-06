// check if already list
import { Editor, Element, Transforms } from 'slate';
import { CustomElement } from '../../types/types';
import { ElementTypes } from '../../types/elements';

export const ListPluginCommands = {
  isListBlock(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        (!Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as Element).type === ElementTypes.UL) ||
        (n as Element).type === ElementTypes.OL,
    });

    return !!match;
  },

  unwrapListBlock(editor: Editor) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        (Element.isElement(n) &&
          !Editor.isEditor(n) &&
          (n as Element).type === ElementTypes.UL) ||
        (n as Element).type === ElementTypes.OL,
    });

    // Transform into paragraphs
    Transforms.setNodes(
      editor,
      { type: ElementTypes.PARAGRAPH },
      {
        match: (n) =>
          Element.isElement(n) &&
          !Editor.isEditor(n) &&
          (n as Element).type === 'li',
      },
    );
  },

  wrapListBlock(editor: Editor) {
    Transforms.wrapNodes(editor, { type: ElementTypes.UL } as CustomElement, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type !== ElementTypes.UL,
    });

    Transforms.setNodes(editor, { type: ElementTypes.LI });
  },

  toggleListBlock(editor: Editor) {
    const isBlockList = this.isListBlock(editor);

    if (isBlockList) {
      this.unwrapListBlock(editor);
      return;
    }

    this.wrapListBlock(editor);
  },
};
