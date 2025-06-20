import { RenderElementProps } from 'slate-react';

const HeadingElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'h1':
      return <h1 {...props.attributes}>{props.children}</h1>;
    // return (
    //   <div {...props.attributes}>
    //     <h1>this is a main heading:</h1>
    //     <p>{props.children}</p>
    //   </div>
    // );
    case 'h2':
      return <h2 {...props.attributes}>{props.children}</h2>;
    case 'h3':
      return <h3 {...props.attributes}>{props.children}</h3>;
  }
};

export default HeadingElement;
