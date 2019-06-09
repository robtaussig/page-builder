import React, { useContext, useMemo } from 'react';
import { PageBuilderContext } from '../';
import {
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
} from '../actions';

export const BuildingBlock = React.memo(({
  classes,
  row,
  col,
  isSelectionStart,
  isSelectionEnd,
  isBeingSelected,
  isSelected,
  isBuiltOn,
}) => {
  const dispatch = useContext(PageBuilderContext);

  const handleMouseDown = () => dispatch(onMouseDown(row, col));
  const handleMouseUp = () => dispatch(onMouseUp(row, col));
  const handleMouseEnter = () => dispatch(onMouseEnter(row, col));
  const handleMouseLeave = () => dispatch(onMouseLeave(row, col));

  const style = useMemo(() => {
    const emptyStyle = {};
  
    if (isSelectionStart) {
      emptyStyle.backgroundColor = 'limegreen';
    } else if (isSelectionEnd) {
      emptyStyle.backgroundColor = 'red';
    } else if (isBeingSelected) {
      emptyStyle.backgroundColor = 'gold';
    } else if (isSelected) {
      emptyStyle.backgroundColor = 'orange';
    }

    return emptyStyle;
  }, [isSelectionStart, isSelectionEnd, isBeingSelected, isSelected]);

  if (isBuiltOn) return null;

  return (
    <div
      className={classes.buildingBlock}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    />
  );
});

export default BuildingBlock;
