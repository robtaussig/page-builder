export const ACTIONS = {
  MOUSE_ENTER: 'MOUSE_ENTER',
  MOUSE_LEAVE: 'MOUSE_LEAVE',
  MOUSE_DOWN: 'MOUSE_DOWN',
  MOUSE_UP: 'MOUSE_UP',
  META_KEY_DOWN: 'META_KEY_DOWN',
  SET_DIMENSIONS: 'SET_DIMENSIONS',
  RESET_SELECTIONS: 'RESET_SELECTIONS',
  SELECT_CURRENT_COMPONENT: 'SELECT_CURRENT_COMPONENT',
  SET_CONTENT: 'SET_CONTENT',
  DELETE_COMPONENT: 'DELETE_COMPONENT',
};

export const onMouseEnter = (row, col) => ({
  type: ACTIONS.MOUSE_ENTER,
  row, col,
});

export const onMouseLeave = (row, col) => ({
  type: ACTIONS.MOUSE_LEAVE,
  row, col,
});

export const onMouseDown = (row, col) => ({
  type: ACTIONS.MOUSE_DOWN,
  row, col,
});

export const onMouseUp = (row, col) => ({
  type: ACTIONS.MOUSE_UP,
  row, col,
});

const onMetaKeyDown = () => ({
  type: ACTIONS.META_KEY_DOWN,
  payload: true,
});

const onMetaKeyUp = () => ({
  type: ACTIONS.META_KEY_DOWN,
  payload: false,
});

export const handleKeyDown = (event, dispatch) => {
  switch (event.key) {
    case 'Meta':
      dispatch(onMetaKeyDown());
      break;
  
    default:
      break;
  }
};

export const handleKeyUp = (event, dispatch) => {
  switch (event.key) {
    case 'Meta':
      dispatch(onMetaKeyUp());
      break;
  
    default:
      break;
  }
};

export const setDimensions = (rows, cols) => ({
  type: ACTIONS.SET_DIMENSIONS,
  rows, cols,
});

export const handleCanvasOutsideClick = () => ({
  type: ACTIONS.RESET_SELECTIONS,
});

export const selectCurrentComponent = componentType => ({
  type: ACTIONS.SELECT_CURRENT_COMPONENT,
  componentType,
});

export const setContent = (content, selectedRange) => ({
  type: ACTIONS.SET_CONTENT,
  content, selectedRange,
});

export const deleteComponent = (selectedRange) => ({
  type: ACTIONS.DELETE_COMPONENT,
  selectedRange,
});