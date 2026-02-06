import { RenderElementProps } from 'slate-react';

const ListElement = (props: RenderElementProps) => {
  const type = props.element.type;

  if (type === 'ul') {
    return <ul {...props.attributes}>{props.children}</ul>;
  }

  if (type === 'ol') {
    return <ol {...props.attributes}>{props.children}</ol>;
  }
};

export default ListElement;
