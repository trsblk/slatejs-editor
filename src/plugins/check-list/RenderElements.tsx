import { RenderElementProps } from 'slate-react';

export const CheckList = (props: RenderElementProps) => {
  return <div {...props.attributes}>{props.children}</div>;
};

export const CheckListTitle = (props: RenderElementProps) => {
  return <h3 {...props.attributes}>{props.children}</h3>;
};

export const CheckListItem = (props: RenderElementProps) => {
  return (
    <div {...props.attributes}>
      <div>
        <span contentEditable='false'>
          <input type='checkbox' checked={props.element.checked} />
        </span>
        {props.children}
      </div>
    </div>
  );
};
