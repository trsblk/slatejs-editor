import { Editor } from 'slate';
import { Plugin } from './plugins';

export const setupToolbar = (plugins: Plugin[], editor: Editor) => {
  return plugins.map((plugin, index) => {
    return plugin.Toolbar ? (
      <plugin.Toolbar editor={editor} key={index} />
    ) : (
      <></>
    );
  });
};
