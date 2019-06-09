import { COMPONENT_TYPES } from '../lib/constants';
import { ACTIONS } from './';

const mouseDown = (state, action) => {
  return {
    ...state,
    selectionStart: [action.row, action.col],
    selectionEnd: [action.row, action.col],
    selectedRanges: state.metaKeyDown ? state.selectedRanges : [],
  };
};

const mouseUp = (state, action) => {
  const selectedRange = [...state.selectionStart, ...state.selectionEnd];
  const selectedRanges = state.selectedRanges.concat([selectedRange]);

  return {
    ...state,
    selectionStart: [],
    selectionEnd: [],
    selectedRanges,
  };
};

const mouseEnter = (state, action) => {
  if (state.selectionStart.length === 0) return state;

  return {
    ...state,
    selectionEnd: [action.row, action.col],
  };
};

const mouseLeave = (state, action) => {
  return state;
};

const metaKeyDown = (state, action) => {
  if (state.metaKeyDown !== action.payload) {
    return {
      ...state,
      metaKeyDown: action.payload,
    };
  }
  return state;
};

const setDimensions = (state, action) => {
  return {
    ...state,
    buildingBlockRows: action.rows,
    buildingBlockColumns: action.cols,
  };
};

const resetSelections = (state, action) => {
  return {
    ...state,
    selectionStart: [],
    selectionEnd: [],
    selectedRanges: [],
  };
};

const selectCurrentComponent = (state, action) => {
  return {
    ...state,
    currentComponent: action.componentType,
    selectionStart: [],
    selectionEnd: [],
    selectedRanges: [],
    components: state.components.concat({
      type: action.componentType,
      selectedRanges: [...state.selectedRanges],
    }),
  };
};

const setContent = (state, action) => {

  return {
    ...state,
    content: {
      ...state.content,
      [action.selectedRange]: action.content,
    },
  };
};

const deleteComponent = (state, action) => {
  const sameRange = ([l1, l2, l3, l4], [r1, r2, r3, r4]) => {
    return l1 === r1 && l2 === r2 && l3 === r3 && l4 === r4;
  };


  return {
    ...state,
    components: state.components.reduce((components, component) => {
      const filteredRanges = component.selectedRanges.filter(selectedRange => {
        return !sameRange(selectedRange, action.selectedRange);
      });
      if (filteredRanges.length > 0) {
        components = components.concat(Object.assign({}, component, {
          selectedRanges: filteredRanges,
        }));
      }
      return components;
    }, []),
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MOUSE_DOWN:
      return mouseDown(state, action);
    case ACTIONS.MOUSE_UP:
      return mouseUp(state, action);
    case ACTIONS.MOUSE_ENTER:
      return mouseEnter(state, action);
    case ACTIONS.MOUSE_LEAVE:
      return mouseLeave(state, action);
    case ACTIONS.META_KEY_DOWN:
      return metaKeyDown(state, action);
    case ACTIONS.SET_DIMENSIONS:
      return setDimensions(state, action);
    case ACTIONS.RESET_SELECTIONS:
      return resetSelections(state, action);
    case ACTIONS.SELECT_CURRENT_COMPONENT:
      return selectCurrentComponent(state, action);
    case ACTIONS.SET_CONTENT:
      return setContent(state, action);
    case ACTIONS.DELETE_COMPONENT:
      return deleteComponent(state, action);
    default:
      return state;
  }
};

export const INITIAL_STATE = {
  currentComponent: COMPONENT_TYPES.NONE,
  buildingBlockRows: 36,
  buildingBlockColumns: 36,
  selectionStart: [],
  selectionEnd: [],
  selectedRanges: [],
  metaKeyDown: false,
  components: [],
  content: {},
};
