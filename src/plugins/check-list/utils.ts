import { ElementTypes } from '../../types/elements';

export const createCheckList = ({
  checkListTitle = 'Check list title',
  checkListItemText = 'Check list item',
}) => {
  return {
    type: ElementTypes.CHECK_LIST,
    children: [
      {
        type: ElementTypes.CHECK_LIST_TITLE,
        children: [
          {
            text: checkListTitle,
          },
        ],
      },
      {
        type: ElementTypes.CHECK_LIST_ITEM,
        checked: false,
        children: [
          {
            text: checkListItemText,
          },
        ],
      },
    ],
  };
};
