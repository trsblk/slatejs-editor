import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { ElementTypes } from './elements';

type CustomTypes =
  | ElementTypes.PARAGRAPH
  | ElementTypes.CODE
  | HeadingType
  | ElementTypes.UL
  | ElementTypes.OL
  | ElementTypes.LI;

type CustomElement = { type: CustomTypes; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean };
type HeadingType = ElementTypes.H1 | ElementTypes.H2 | ElementTypes.H3;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
