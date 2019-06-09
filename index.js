import React, { useReducer, createContext, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { reducer, INITIAL_STATE } from './actions/reducer';
import { handleKeyDown, handleKeyUp } from './actions';
import SideToolbar from './components/side-toolbar';
import Canvas from './components/canvas';

export const PageBuilderContext = createContext();

export const PageBuilder = React.memo(({ classes }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const onKeyDown = event => {
      handleKeyDown(event, dispatch);
    };

    const onKeyUp = event => {
      handleKeyUp(event, dispatch);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  },[]);

  const {
    currentComponent,
    buildingBlockRows,
    buildingBlockColumns,
    selectionStart,
    selectionEnd,
    selectedRanges,
    components,
    content,
  } = state;

  return (
    <PageBuilderContext.Provider value={dispatch}>
      <div className={classes.root}>
        <SideToolbar
          classes={classes}
          currentComponent={currentComponent}
          buildingBlockRows={buildingBlockRows}
          buildingBlockColumns={buildingBlockColumns}
          selectedRanges={selectedRanges}
        />
        <Canvas
          classes={classes}
          buildingBlockRows={buildingBlockRows}
          buildingBlockColumns={buildingBlockColumns}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          selectedRanges={selectedRanges}
          components={components}
          content={content}
        />
      </div>
    </PageBuilderContext.Provider>
  );
});

export default withStyles(styles)(PageBuilder);
