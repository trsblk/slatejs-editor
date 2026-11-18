import { Editor } from 'slate';
import { checkListPlugin } from '../check-list';
import { formatPlugin } from '../format';
import { listsPlugin } from '../lists';
import { ComponentType, JSX } from 'react';
import { RenderElementProps } from 'slate-react';

interface ToolbarProps {
  editor: Editor;
}

export interface Plugin {
  createEditor?: (editor: Editor) => Editor;
  Toolbar?: ComponentType<ToolbarProps>;
  renderElement?: (props: RenderElementProps, element: string) => JSX.Element;
}

export const plugins: Plugin[] = [formatPlugin, listsPlugin, checkListPlugin];
