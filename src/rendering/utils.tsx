import Leaf from './Leaf';
import CodeElement from './CodeElement';
import DefaultElement from './DefaultElement';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import HeadingElement from './HeadingElement';
import ListElement from './ListElement';
import ListItem from './ListItem';
import { checkListPlugin } from '../plugins/check-list';
import { ElementTypes } from '../types/elements';

// Define a leaf element rendering function
export const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />;
};

// Define a block element rendering function
export const renderElement = (props: RenderElementProps) => {
  const elementType = props.element.type;

  // console.log(props);
  switch (elementType) {
    case ElementTypes.CODE:
      return <CodeElement {...props} />;
    case ElementTypes.H1:
    case ElementTypes.H2:
    case ElementTypes.H3:
      return <HeadingElement {...props} />;
    case ElementTypes.PARAGRAPH:
      return <DefaultElement {...props} />;
    case ElementTypes.UL:
    case ElementTypes.OL:
      return <ListElement {...props} />;
    case ElementTypes.LI:
      return <ListItem {...props} />;
    case ElementTypes.CHECK_LIST:
      return checkListPlugin.renderElement(props, ElementTypes.CHECK_LIST);
    case ElementTypes.CHECK_LIST_ITEM:
      return checkListPlugin.renderElement(props, ElementTypes.CHECK_LIST_ITEM);
    case ElementTypes.CHECK_LIST_TITLE:
      return checkListPlugin.renderElement(
        props,
        ElementTypes.CHECK_LIST_TITLE,
      );
    default:
      return <div {...props.attributes}>{props.children}</div>;
  }
};
