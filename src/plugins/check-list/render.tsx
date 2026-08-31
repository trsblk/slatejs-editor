import { RenderElementProps } from 'slate-react';
import { CheckList, CheckListItem, CheckListTitle } from './RenderElements';

export const renderElement = (props: RenderElementProps, element: string) => {
  if (element === 'check-list') {
    return <CheckList {...props} />;
  }

  if (element === 'check-list-title') {
    return <CheckListTitle {...props} />;
  }

  if (element === 'check-list-item') {
    return <CheckListItem {...props} />;
  }

  return <></>;
};
