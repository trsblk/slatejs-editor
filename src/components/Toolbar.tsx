import { useSlate } from 'slate-react';
import { useEffect, useState } from 'react';
import { saveDocument } from '../api/utils';
import useSWRMutation from 'swr/mutation';
import { Flex } from 'antd';
import { setupToolbar } from '../plugins/setup/setupToolbar';
import { plugins } from '../plugins/setup/plugins';

interface ToolbarProps {
  documentId: string;
}

const Toolbar = ({ documentId }: ToolbarProps) => {
  const editor = useSlate();
  // const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    `/api/documents/${documentId}`,
    saveDocument,
  );

  const [showIsSaved, setShowIsSaved] = useState(false);

  const handleSave = async () => {
    const res = await trigger({ content: editor.children });

    if (res.status === 200) {
      setShowIsSaved(true);
    }

    // TODO: Handling throws
  };

  // Displaying message for 3 sec about saving to database
  useEffect(() => {
    if (showIsSaved) {
      setTimeout(() => {
        setShowIsSaved(false);
      }, 3000);
    }
  }, [showIsSaved]);

  // * DEV Purpose
  // const recursivelyGetEditorChildren = (children) => {
  //   // debugger;
  //   if (children.length === 1) {
  //     return;
  //   }

  //   for (const node of children) {
  //     console.log(node);
  //     recursivelyGetEditorChildren(node.children);
  //   }
  // };

  // // console.log(editor.children);

  // recursivelyGetEditorChildren(editor.children);

  return (
    <div className='editor-toolbar'>
      <Flex gap='small' justify='center'>
        {setupToolbar(plugins, editor)}

        <button onClick={handleSave}>Save</button>
        {isMutating && <p>saving...</p>}
        {showIsSaved && <p>Document was saved.</p>}
      </Flex>
    </div>
  );
};

export default Toolbar;
