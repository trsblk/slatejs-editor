import Leaf from './Leaf';
import CodeElement from './CodeElement';
import DefaultElement from './DefaultElement';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import HeadingElement from './HeadingElement';

// Define a leaf element rendering function
export const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />;
};

// Define a block element rendering function
export const renderElement = (props: RenderElementProps) => {
  const elementType = props.element.type;

  switch (elementType) {
    case 'code':
      return <CodeElement {...props} />;
    case 'h1':
    case 'h2':
    case 'h3':
      return <HeadingElement {...props} />;
    case 'paragraph':
      return <DefaultElement {...props} />;
  }
};
