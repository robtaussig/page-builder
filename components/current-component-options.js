import React, { useMemo, useContext } from 'react';
import { COMPONENT_OPTIONS } from '../lib/constants';
import { PageBuilderContext } from '../';
import { selectCurrentComponent } from '../actions';

export const CurrentComponentOptions = React.memo(({ classes, currentComponent, selectedRanges }) => {
  const dispatch = useContext(PageBuilderContext);
  const canAdd = selectedRanges.length > 0;

  const handleButtonClick = type => event => {
    dispatch(selectCurrentComponent(type));
  };

  const options = useMemo(() => {
    return COMPONENT_OPTIONS.map((component, idx) => {
      const style ={};
      if (!canAdd) style.color = 'gainsboro';
      return (
        <li
          key={`${idx}-component-options`}
          className={classes.componentOption}
          style={style}
        >
          <button
            className={classes.componentOptionButton}
            disabled={!canAdd}
            onClick={handleButtonClick(component.type)} 
          >
              {component.text}
          </button>
        </li>
      );
    });
  }, [selectedRanges]);

  return (
    <ul className={classes.currentComponentList}>
      {options}
    </ul>
  );
});

export default CurrentComponentOptions;