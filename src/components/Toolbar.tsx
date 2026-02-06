import { useSlate } from 'slate-react';
import { useSWRConfig } from 'swr';

import { CustomEditor } from '../commands';

import { HeadingType } from '../types/types';
import { Editor, Element } from 'slate';
import { useEffect, useState } from 'react';
import { saveDocument } from '../api/utils';
import { listsPlugin } from '../plugins/lists';

const HEADINGS = [
  { type: 'h1', label: 'Heading 1' },
  { type: 'h2', label: 'Heading 2' },
  { type: 'h3', label: 'Heading 3' },
];

const isHeadingType = (value: string): value is HeadingType => {
  //* Construct new array only with types to check if the value is of type
  const headingTypes = HEADINGS.map((heading) => heading.type);
  return headingTypes.includes(value);

  // return HEADINGS.map((heading) => heading.type).includes(value);
};

interface ToolbarProps {
  documentId: string;
}

const Toolbar = ({ documentId }: ToolbarProps) => {
  const editor = useSlate();
  const { mutate } = useSWRConfig();

  const [showIsSaved, setShowIsSaved] = useState(false);

  const [selectedBlockType, setSelectedBlockType] = useState('');

  // TODO: Consolidate into one function
  const toggleBoldMark = () => {
    CustomEditor.toggleBoldMark(editor);
  };

  const toggleItalicMark = () => {
    CustomEditor.toggleItalicMark(editor);
  };

  const toggleBlockType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBlockType = e.target.value;

    if (isHeadingType(selectedBlockType)) {
      const selectedHeadingType = selectedBlockType;
      CustomEditor.toggleHeadingType({
        editor,
        headingType: selectedHeadingType,
      });
    } else if (selectedBlockType === 'p') {
      CustomEditor.toggleParagraphBlock(editor);
    }
  };

  // * Preselect a block type in select tag
  // * Maybe add as helper function to CustomEditor object
  const selectedBlock = Editor.above(editor, {
    match: (n) => Element.isElement(n),
  });

  // * Preselect a block type in select tag
  useEffect(() => {
    if (!selectedBlock) {
      return;
    }

    const blockType = selectedBlock[0].type;

    if (blockType === 'paragraph') {
      setSelectedBlockType('p');
    } else {
      setSelectedBlockType(blockType);
    }
  }, [selectedBlock]);

  const handleSave = async () => {
    // TODO: send document to backend route
    console.log(documentId);
    const res = await saveDocument({
      doc_content: editor.children,
      uuid: documentId,
    });

    if (res.status === 200) {
      setShowIsSaved(true);
      // Refetch documents -> could also implement optimistic
      mutate('/');
    }
  };

  // Displaying message for 3 sec about saving to database
  useEffect(() => {
    if (showIsSaved) {
      setTimeout(() => {
        setShowIsSaved(false);
      }, 3000);
    }
  }, [showIsSaved]);

  const selectOptions = HEADINGS.map(({ type, label }) => (
    <option value={type} key={type} selected={type === selectedBlockType}>
      {label}
    </option>
  ));

  return (
    <div>
      <select onChange={toggleBlockType}>
        {selectOptions}
        <option value='p' selected={selectedBlockType === 'p'}>
          Paragraph
        </option>
      </select>
      <button
        onClick={toggleBoldMark}
        style={{
          fontWeight: CustomEditor.isBoldMarkActive(editor) ? 'bold' : 'normal',
        }}
      >
        Bold
      </button>
      <button
        onClick={toggleItalicMark}
        style={{
          fontStyle: CustomEditor.isItalicMarkActive(editor)
            ? 'italic'
            : 'normal',
        }}
      >
        Italic
      </button>
      <button onClick={handleSave}>Save</button>

      {listsPlugin.toolbar()}
      {showIsSaved && <p>Document was saved.</p>}
    </div>
  );
};

export default Toolbar;
