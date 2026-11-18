import { Commands } from './commands';
import { Editor, Element } from 'slate';
import { SELECT_OPTIONS, Utils } from './utils';
import { Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { BoldOutlined, ItalicOutlined } from '@ant-design/icons';

import './styles.scss';

interface ToolbarProps {
  editor: Editor;
}

// Formatting toolbar
export const Toolbar = ({ editor }: ToolbarProps) => {
  const [selectedSelectType, setSelectedSelectType] = useState('p');

  const toggleBoldMark = () => {
    Commands.toggleBoldMark(editor);
  };

  const toggleItalicMark = () => {
    Commands.toggleItalicMark(editor);
  };

  const handleChange = (value: string) => {
    Utils.toggleBlockType(editor, value);
    setSelectedSelectType(value);
  };

  useEffect(() => {
    const selectedBlock = Editor.above(editor, {
      match: (n) => Element.isElement(n),
    });

    const selectTypes = ['h1', 'h2', 'h3', 'paragraph'];

    if (!selectedBlock) {
      return;
    }

    const blockTypeInSelection = selectedBlock[0].type;

    if (selectTypes.includes(blockTypeInSelection)) {
      // Mapping from 'paragraph' to 'p' option for option
      setSelectedSelectType(
        blockTypeInSelection === 'paragraph' ? 'p' : selectedBlock[0].type,
      );
    }
  }, [editor.selection, editor]);

  const hasBoldMarkActive = Utils.isBoldMarkActive(editor);
  const hasItalicMarkActive = Utils.isItalicMarkActive(editor);

  return (
    <>
      <Select
        onChange={handleChange}
        options={SELECT_OPTIONS}
        style={{ width: 120 }}
        value={selectedSelectType}
      />

      <Button
        icon={<BoldOutlined />}
        onClick={toggleBoldMark}
        className={hasBoldMarkActive ? 'has-bold-mark' : ''}
      />
      <Button
        icon={<ItalicOutlined />}
        onClick={toggleItalicMark}
        className={hasItalicMarkActive ? 'has-italic-mark' : ''}
      />
    </>
  );
};
