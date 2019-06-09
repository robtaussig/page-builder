import React from 'react';
import Dimensions from './dimensions';
import CurrentComponentOptions from './current-component-options';

export const SideToolbar = React.memo(({
  classes,
  currentComponent,
  buildingBlockRows,
  buildingBlockColumns,
  selectedRanges,
}) => {

  return (
    <div className={classes.sideToolbar}>
      <Dimensions classes={classes} buildingBlockRows={buildingBlockRows} buildingBlockColumns={buildingBlockColumns}/>
      <CurrentComponentOptions classes={classes} currentComponent={currentComponent} selectedRanges={selectedRanges}/>
    </div>
  );
});

export default SideToolbar;
