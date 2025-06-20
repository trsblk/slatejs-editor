import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomTypes = 'paragraph' | 'code' | HeadingType;
type CustomElement = { type: CustomTypes; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean };
type HeadingType = 'h1' | 'h2' | 'h3';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
