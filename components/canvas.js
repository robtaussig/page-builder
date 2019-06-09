import React, { useMemo, useEffect, useRef, useContext } from 'react';
import BuildingBlock from './building-block';
import GeneratedComponents from './generated-components';
import { PageBuilderContext } from '../';
import { handleCanvasOutsideClick } from '../actions';

export const Canvas = React.memo(({
  classes,
  buildingBlockRows,
  buildingBlockColumns,
  selectionStart,
  selectionEnd,
  selectedRanges,
  components,
  content,
}) => {
  const containerRef = useRef(null);
  const dispatch = useContext(PageBuilderContext);

  useEffect(() => {
    const handleKeyDown = event => {
      if (containerRef.current.contains(event.target) === false) {
        if (event.target.tagName !== 'BUTTON') {
          dispatch(handleCanvasOutsideClick());
        }
      }
    };

    document.addEventListener('mousedown', handleKeyDown);

    return () => document.removeEventListener('mousedown', handleKeyDown);
  }, []);

  const builtComponents = generateComponents(
    components,
    content,
  );

  const buildingBlocks = generateBuildingBlocks(
    buildingBlockRows,
    buildingBlockColumns,
    selectionStart,
    selectionEnd,
    selectedRanges,
    components,
    classes,
  );

  const style = useMemo(() => {
    return {
      display: 'grid',
      gridTemplateRows: `repeat(${buildingBlockRows}, 1fr)`,
      gridTemplateColumns: `repeat(${buildingBlockColumns}, 1fr)`,
      gridGap: '1px',
    };
  }, [buildingBlockRows, buildingBlockColumns]);

  return (
    <div className={classes.canvas} ref={containerRef} style={style}>
      {builtComponents}
      {buildingBlocks}
    </div>
  );
});

export default Canvas;

const generateBuildingBlocks = (
  buildingBlockRows,
  buildingBlockColumns,
  selectionStart,
  selectionEnd,
  selectedRanges,
  components,
  classes,
) => {

  const [ selectionStartRow, selectionStartCol ] = selectionStart;
  const [ selectionEndRow, selectionEndCol ] = selectionEnd;
  const minSelectionRow = Math.min(selectionStartRow, selectionEndRow);
  const minSelectionCol = Math.min(selectionStartCol, selectionEndCol);
  const maxSelectionRow = Math.max(selectionStartRow, selectionEndRow);
  const maxSelectionCol = Math.max(selectionStartCol, selectionEndCol);

  return new Array(buildingBlockRows).fill(null).reduce((blocks, _, rowIdx) => {
    blocks = blocks.concat(new Array(buildingBlockColumns).fill(null).map((_, colIdx) => {
      const isSelectionStart = rowIdx === selectionStartRow && colIdx === selectionStartCol;
      const isSelectionEnd = rowIdx === selectionEndRow && colIdx === selectionEndCol;
      const isBeingSelected = rowIdx >= minSelectionRow &&
        rowIdx <= maxSelectionRow &&
        colIdx >= minSelectionCol &&
        colIdx <= maxSelectionCol;
      const isSelected = selectedRanges.some(isWithinSelectedRange(rowIdx, colIdx));
      const isBuiltOn = isBuildingBlockBuiltOn(rowIdx, colIdx, components);

      return (
        <BuildingBlock
          key={`${rowIdx},${colIdx}-building-block`}
          classes={classes}
          row={rowIdx}
          col={colIdx}
          isBuiltOn={isBuiltOn}
          isSelectionStart={isSelectionStart}
          isSelectionEnd={isSelectionEnd}
          isBeingSelected={isBeingSelected}
          isSelected={isSelected}
        />
      );
    }));

    return blocks;
  }, []);
};

const isWithinSelectedRange = (rowIdx, colIdx) => selectedRange => {
  const [ selectedStartRow, selectedStartCol, selectedEndRow, selectedEndCol ] = selectedRange;
  const minSelectedRow = Math.min(selectedStartRow, selectedEndRow);
  const minSelectedCol = Math.min(selectedStartCol, selectedEndCol);
  const maxSelectedRow = Math.max(selectedStartRow, selectedEndRow);
  const maxSelectedCol = Math.max(selectedStartCol, selectedEndCol);

  return rowIdx >= minSelectedRow &&
    rowIdx <= maxSelectedRow &&
    colIdx >= minSelectedCol &&
    colIdx <= maxSelectedCol;
};

const generateComponents = (components, content) => {

  return components.map(({ type, selectedRanges }, idx) => {
    return (
      <GeneratedComponents
        key={`${idx}-generated-components`}
        type={type}
        selectedRanges={selectedRanges}
        content={content}
      />
    );
  });
};

const isBuildingBlockBuiltOn = (row, col, components) => {
  return components.some(({ selectedRanges }) => {
    return selectedRanges.some(isWithinSelectedRange(row, col));
  });
};