import React, { useMemo } from 'react';
import GeneratedComponent from './generated-component';

export const GeneratedComponents = React.memo(({ type, selectedRanges, content }) => {

  const components = useMemo(() => {
    return selectedRanges.map((selectedRange, idx) => {
      return (
        <GeneratedComponent
          key={`${idx}-generated-component`}
          selectedRange={selectedRange}
          type={type}
          content={content[selectedRange]}
        />
      );
    });
  }, [type, selectedRanges, content]);

  return (
    <React.Fragment>
      {components}
    </React.Fragment>
  );
});

export default GeneratedComponents;