import React, { useMemo, useContext, useState } from 'react';
import Content from './content';
import { PageBuilderContext } from '../';
import ElementBuilderModal from './element-builder-modal';
import DeleteButton from './delete-button';
import { setContent, deleteComponent } from '../actions';

export const GeneratedComponent = React.memo(({ selectedRange, type, content }) => {
  const dispatch = useContext(PageBuilderContext);
  const [ elementBuilderOpen, setElementBuilderOpen ] = useState(false);

  const style = useMemo(() => {
    const [ row1, col1, row2, col2 ] = selectedRange;
    const [ rowStart, rowEnd ] = row1 > row2 ? [ row2, row1 ] : [ row1, row2 ];
    const [ colStart, colEnd ] = col1 > col2 ? [ col2, col1 ] : [ col1, col2 ];

    return {
      backgroundColor: 'red',
      gridRow: `${rowStart + 1} / ${rowEnd + 2}`,
      gridColumn: `${colStart + 1} / ${colEnd + 2}`,
      position: 'relative',
    };
  }, [type, selectedRange]);

  const handleSetContent = content => {
    dispatch(setContent(content, selectedRange));
  };

  const handleDelete = event => {
    event.preventDefault();
    dispatch(deleteComponent(selectedRange));
  };

  return (
    <React.Fragment>
      <div style={style}>
        <Content content={content} onClick={() => setElementBuilderOpen(true)}/>
        <DeleteButton onClick={handleDelete}/>
      </div>
      {elementBuilderOpen && (
        <ElementBuilderModal
          onClose={() => setElementBuilderOpen(false)}
          onSetContent={handleSetContent}
        />
      )}
    </React.Fragment>
  );
});

export default GeneratedComponent;
