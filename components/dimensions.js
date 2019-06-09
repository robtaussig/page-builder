import React, { useState, useContext } from 'react';
import Check from 'react-feather/dist/icons/check';
import { PageBuilderContext } from '../';
import { setDimensions } from '../actions';

export const Dimensions = React.memo(({
  classes,
  buildingBlockRows,
  buildingBlockColumns,
}) => {
  const [rowsInputValue, setRowsInputValue] = useState(buildingBlockRows);
  const [colsInputValue, setColsInputValue] = useState(buildingBlockColumns);
  const dispatch = useContext(PageBuilderContext);
  const canSubmit = Number(rowsInputValue) !== buildingBlockRows || Number(colsInputValue) !== buildingBlockColumns;

  const handleChangeRowsInput = event => {
    if (isNaN(event.target.value)) return;

    setRowsInputValue(event.target.value);
  };

  const handleChangeColsInput = event => {
    if (isNaN(event.target.value)) return;

    setColsInputValue(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(setDimensions(Number(rowsInputValue), Number(colsInputValue)));
  };

  const handleInputKeyUp = event => {
    if (event.key === 'Enter') {
      if (canSubmit) {
        handleSubmit();
      }
    }
  };
  
  return (
    <div className={classes.dimensionsInputForm}>
      <span className={classes.dimensionsFieldName}>Size</span>
      <input
        className={classes.dimensionsInputField}
        type={'text'}
        onChange={handleChangeRowsInput}
        onKeyDown={handleInputKeyUp}
        value={rowsInputValue}
      />
      <span className={classes.dimensionsX}>x</span>
      <input
        className={classes.dimensionsInputField}
        type={'text'}
        onChange={handleChangeColsInput}
        onKeyDown={handleInputKeyUp}
        value={colsInputValue}
      />
      <button className={classes.dimensionsSubmitButton} disabled={!canSubmit} onClick={handleSubmit}>
          {canSubmit &&
            <Check
              size={14}
              color={'#bada55'}
            />
          }
        </button>
    </div>
  );
});

export default Dimensions;