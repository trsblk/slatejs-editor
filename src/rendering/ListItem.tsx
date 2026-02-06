import { RenderElementProps } from 'slate-react';

const ListItem = (props: RenderElementProps) => {
  return <li {...props}>{props.children}</li>;
};

export default ListItem;
